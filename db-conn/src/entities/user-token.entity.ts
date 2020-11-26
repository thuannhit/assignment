import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace user_tokens
 * @classname UserTokenEntity
 **/
@Entity({ name: 'user_tokens' })
export class UserTokenEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('bigint')
    _user_id: number;

    @Column('tinyint')
    token_type: number;

    @Column('varchar')
    token_value: string;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @UpdateDateColumn({ nullable: false })
    updated_at: Date;

}