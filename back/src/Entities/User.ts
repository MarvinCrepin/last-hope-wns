import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['mail'])
@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 36 })
  public firstname!: string;

  @Column({ type: 'varchar', length: 100 })
  public lastname!: string;

  @Column({ type: 'varchar', length: 100 })
  public password!: string;

  @Column({ type: 'varchar', length: 255 })
  public mail!: string;

  @Column({ type: 'varchar', length: 255 })
  public role!: string;
}

export default User;
