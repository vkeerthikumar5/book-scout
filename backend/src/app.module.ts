import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';

// Entities
import { Navigation } from './entities/navigation.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { Review } from './entities/review.entity';
import { ScrapeJob } from './entities/scrape-job.entity';
import { ViewHistory } from './entities/view-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'bookscout_db',
      entities: [
        Navigation,
        Category,
        Product,
        ProductDetail,
        Review,
        ScrapeJob,
        ViewHistory,
      ],
      synchronize: true, // only for dev
    }),
    TypeOrmModule.forFeature([
      Navigation,
      Category,
      Product,
      ProductDetail,
      Review,
      ScrapeJob,
      ViewHistory,
    ]),
  ],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
