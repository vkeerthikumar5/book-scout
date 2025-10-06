import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Navigation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  url: string; // ✅ Add this field

  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at: Date;

  @OneToMany(() => Category, (category) => category.navigation)
  categories: Category[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
