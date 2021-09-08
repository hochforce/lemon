import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

@Entity("userAuth")
class UserAuth {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column()
  tipo: string;

  constructor() {
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default UserAuth;