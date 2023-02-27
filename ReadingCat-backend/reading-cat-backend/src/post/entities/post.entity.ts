import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OutputBlockData } from '../dto/create-post.dto';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  secondTitle: string;

  @Column({ type: 'jsonb' })
  text: OutputBlockData[];

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  tags?: string;

  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];

  @ManyToOne(() => User, (owner) => owner.posts, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  ownerId: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
