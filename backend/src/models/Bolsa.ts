import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("bolsas")
class Bolsa{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  financiamento: string;

  @Column()
  tipo_bolsa: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { Bolsa };