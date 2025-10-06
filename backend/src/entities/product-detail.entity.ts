import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (product) => product.detail, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  specs: Record<string, any>;

  @Column({ type: 'float', nullable: true })
  ratings_avg: number;

  @Column({ type: 'int', nullable: true })
  reviews_count: number;
}
