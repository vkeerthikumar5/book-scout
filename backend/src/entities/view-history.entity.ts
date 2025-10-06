import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column()
  session_id: string;

  @Column({ type: 'jsonb' })
  path_json: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;
}
