import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { PlaywrightCrawler } from 'crawlee';
import { Navigation } from './entities/navigation.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import pLimit from 'p-limit';
@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  constructor(
    @InjectRepository(Navigation)
    private readonly navRepo: Repository<Navigation>,
    @InjectRepository(Category)
    private readonly catRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>,
  ) {}

  // -------------------------
  // 1️⃣ Scrape Navigations
  // -------------------------
  async scrapeNavigations() {
    const navLinks: { title: string; url: string }[] = [];

    const crawler = new PlaywrightCrawler({
      async requestHandler({ page, log }) {
        await page.goto('https://www.worldofbooks.com/en-gb', { waitUntil: 'domcontentloaded' });

        const links = await page.$$eval('nav a', (anchors) =>
          anchors
            .map((a) => {
              const title = a.textContent?.trim() || '';
              let url = a.getAttribute('href') || '';

              if (!title || !url || url === '#' || url.startsWith('javascript:')) return null;
              if (url.startsWith('/')) url = new URL(url, 'https://www.worldofbooks.com').href;

              return { title, url };
            })
            .filter((n): n is { title: string; url: string } => n !== null),
        );

        links.forEach((l) => navLinks.push(l));
        log.info(`Found ${links.length} nav links`);
      },
    });

    await crawler.run(['https://www.worldofbooks.com/en-gb']);

    let savedCount = 0;
    for (const nav of navLinks) {
      const slug = nav.title.toLowerCase().replace(/\s+/g, '-');
      const exists = await this.navRepo.findOne({ where: { slug } });

      if (!exists) {
        await this.navRepo.save({
          title: nav.title,
          slug,
          url: nav.url,
          last_scraped_at: new Date(),
        });
        savedCount++;
      } else {
        this.logger.warn(`Skipped duplicate navigation: ${nav.title}`);
      }
    }

    this.logger.log(`✅ Saved ${savedCount} new navigations`);
    return { message: 'Navigation scraping completed', count: savedCount };
  }

  // -------------------------
  // 2️⃣ Scrape Categories
  // -------------------------
  async scrapeCategories() {
    const navigations = await this.navRepo.find({ where: { url: Not(IsNull()) } });

    let savedCount = 0;

    for (const nav of navigations) {
      const catLinks: { title: string; url: string }[] = [];

      const crawler = new PlaywrightCrawler({
        async requestHandler({ page, log }) {
          await page.goto(nav.url, { waitUntil: 'domcontentloaded' });

          const categories = await page.$$eval('a', (anchors) =>
            anchors
              .map((a) => {
                const title = a.textContent?.trim() || '';
                let url = a.getAttribute('href') || '';

                if (!title || !url || url === '#' || url.startsWith('javascript:') || title.toLowerCase() === 'skip to content')
                  return null;

                if (url.startsWith('/')) url = new URL(url, 'https://www.worldofbooks.com').href;
                return { title, url };
              })
              .filter((c): c is { title: string; url: string } => c !== null),
          );

          categories.forEach((c) => catLinks.push(c));
          log.info(`Found ${categories.length} categories in ${nav.title}`);
        },
      });

      await crawler.run([nav.url]);

      for (const cat of catLinks) {
        let slug = cat.title.toLowerCase().replace(/\s+/g, '-');
        let counter = 1;

        // Ensure slug is unique per navigation
        while (
          await this.catRepo.findOne({
            where: { slug, navigation: { id: nav.id } },
            relations: ['navigation'],
          })
        ) {
          slug = `${cat.title.toLowerCase().replace(/\s+/g, '-')}-${counter++}`;
        }

        await this.catRepo.save({
          title: cat.title,
          slug,
          url: cat.url,
          navigation: nav,
          product_count: 0,
          last_scraped_at: new Date(),
        });
        savedCount++;
      }
    }

    this.logger.log(`✅ Saved ${savedCount} new categories`);
    return { message: 'Category scraping completed', count: savedCount };
  }

  // -------------------------
  // 3️⃣ Scrape Products
  // -------------------------
  

  async scrapeProducts() {
    const categories = await this.catRepo.find({ where: { url: Not(IsNull()) } });
  
    let savedCount = 0;
  
    const limit = pLimit(10); // Only 3 categories scraped in parallel
  
    await Promise.all(
      categories.map((cat) =>
        limit(async () => {
          const products: { title: string; price: string; image: string; link: string }[] = [];
  
          const crawler = new PlaywrightCrawler({
            async requestHandler({ page, log }) {
              await page.goto(cat.url, { waitUntil: 'domcontentloaded' });
  
              const items = await page.$$eval('.product-tile', (tiles) =>
                tiles.map((el) => {
                  const title = el.querySelector('.title')?.textContent?.trim() || '';
                  const price = el.querySelector('.price')?.textContent?.trim() || '';
                  const image = el.querySelector('img')?.getAttribute('src') || '';
                  const link = el.querySelector('a')?.getAttribute('href') || '';
                  return { title, price, image, link };
                }),
              );
  
              items.forEach((p) => products.push(p));
              log.info(`Found ${items.length} products for ${cat.title}`);
            },
          });
  
          await crawler.run([cat.url]);
  
          // Save products concurrently, if needed
          await Promise.all(
            products.map(async (prod) => {
              if (!prod.link || prod.link === '#' || prod.link.startsWith('javascript:')) return;
  
              let sourceId = prod.link.split('/').pop() || prod.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
              let counter = 1;
  
              while (await this.prodRepo.findOne({ where: { source_id: sourceId } })) {
                sourceId = `${sourceId}-${counter++}`;
              }
  
              try {
                const priceNumber = parseFloat(prod.price.replace(/[^\d.]/g, '')) || null;
                const priceString = priceNumber !== null ? priceNumber.toString() : null;
  
                await this.prodRepo.save({
                  source_id: sourceId,
                  title: prod.title,
                  price: priceString,
                  image_url: prod.image,
                  source_url: prod.link,
                  category: cat,
                  last_scraped_at: new Date(),
                });
  
                savedCount++;
              } catch (error) {
                this.logger.warn(`Failed to save product: ${prod.title}`);
              }
            }),
          );
        }),
      ),
    );
  
    this.logger.log(`✅ Saved ${savedCount} new products`);
    return { message: 'Product scraping completed', count: savedCount };
  }
  
  
}
