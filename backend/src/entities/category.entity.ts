import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Navigation } from './navigation.entity';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Navigation, (navigation) => navigation.categories, { onDelete: 'CASCADE' })
  navigation: Navigation;

  @Column({ nullable: true })
  parent_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  url: string; // ✅ Add this field

  @Column()
  slug: string;

  @Column({ default: 0 })
  product_count: number;

  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
