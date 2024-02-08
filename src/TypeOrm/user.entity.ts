import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'firstname',
    nullable: false,
    default: '',
  })
  firstname: string;

  @Column({
    name: 'lastname',
    nullable: false,
    default: '',
  })
  lastname: string;

  @Column({
    name: 'Password',
    nullable: false,
    default: '',
  })
  Password: string;
}
