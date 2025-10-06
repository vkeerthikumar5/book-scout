import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ScrapeJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  target_url: string;

  @Column()
  target_type: string; // e.g. 'category', 'product'

  @Column({ default: 'pending' })
  status: string; // pending, running, success, failed

  @CreateDateColumn()
  started_at: Date;

  @UpdateDateColumn()
  finished_at: Date;

  @Column({ type: 'text', nullable: true })
  error_log: string;
}
