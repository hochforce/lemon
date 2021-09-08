import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("enderecos")
class Endereco {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Endereco };