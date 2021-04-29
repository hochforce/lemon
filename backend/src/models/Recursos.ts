import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Bolsa } from './Bolsa';

@Entity("recursos")
class Recursos {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_bolsa: string;

  @Column()
  materiais: string;

  @Column()
  recursos_humanos: string;

  @Column()
  instalacoes: string;

  @ManyToOne(()=>Recursos)
  @JoinColumn({name: "id_bolsa"})
  bolsa: Bolsa;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Recursos };