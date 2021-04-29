import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid';

@Entity("parcerias")
class Parceria {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  parceiro: string;

  @Column()
  tipo_parceria: string;

  @Column()
  valor: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { Parceria };