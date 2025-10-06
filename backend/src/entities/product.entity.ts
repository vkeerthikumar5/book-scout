import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { ProductDetail } from './product-detail.entity';
import { Review } from './review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  source_id?: string; // made optional

  @Column()
  title: string;

  @Column({ nullable: true })
  author?: string;
  
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: string | null;
  

  @Column({ default: 'GBP' })
  currency?: string;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ unique: true })
  source_url?: string; // made optional

  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at?: Date;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  category: Category;

  @OneToOne(() => ProductDetail, (detail) => detail.product, { cascade: true })
  detail?: ProductDetail;

  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews?: Review[];
}
