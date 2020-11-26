import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace user
 * @classname User
 **/
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  _id: number;

  @Column('varchar')
  email: string;

  @Column('tinyint')
  is_verified: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  user_name: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('tinyint', { nullable: true })
  _role_id: number;

  @Column('int', { nullable: true })
  created_by: number;

  @Column('int', { nullable: true })
  updated_by: number;

  @Column('tinyint')
  is_deleted: number;

  @Column('tinyint')
  is_active: number;
}
