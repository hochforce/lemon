import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Contato } from './Contato';
import bcrypt from 'bcryptjs';

@Entity("organizadores")
class Organizador{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_contato: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  cpf: string;

  @Column()
  campus_instituicao: string;

  @Column()
  titulacao: string;

  @Column()
  cargo: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @ManyToOne(()=>Contato)
  @JoinColumn({name: "id_contato"})
  contato: Contato;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}
export { Organizador };