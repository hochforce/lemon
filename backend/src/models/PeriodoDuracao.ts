import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("periodo_duracao")
class PeriodoDuracao{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  inicio: Date;

  @Column()
  fim: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { PeriodoDuracao };