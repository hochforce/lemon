import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("periodo_duracao")
class PeriodoDuracao{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  data_inicio: string;

  @Column()
  data_fim: string;

  @Column()
  hora_inicio: string;

  @Column()
  hora_fim: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { PeriodoDuracao };