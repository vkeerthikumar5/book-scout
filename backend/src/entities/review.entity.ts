import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ nullable: true })
  author: string;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  text: string;

  @CreateDateColumn()
  created_at: Date;
}
