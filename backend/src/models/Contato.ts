import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("contatos")
class Contato {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  constructor() {
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { Contato };