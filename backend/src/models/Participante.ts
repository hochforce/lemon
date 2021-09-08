import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

@Entity("participantes")
class Participante {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  cpf: string;

  @Column()
  campus_instituicao: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Participante };