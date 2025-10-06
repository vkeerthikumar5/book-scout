import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('navigations')
  async scrapeNavigations() {
    return this.scraperService.scrapeNavigations();
  }

  @Get('categories')
  async scrapeCategories() {
    return this.scraperService.scrapeCategories();
  }

  @Get('products')
  async scrapeProducts() {
    return this.scraperService.scrapeProducts();
  }

  @Get('run-scraper')
async runScraper() {
  await this.scraperService.scrapeNavigations();
  await this.scraperService.scrapeCategories();
  await this.scraperService.scrapeProducts();
  return { message: 'Scraping completed!' };
}

}
