import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Participante } from './Participante';
import { Evento } from './Evento';

@Entity("inscricoesEventos")
class InscricoesEventos{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_participante: string;

  @Column()
  id_evento: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(()=>Participante)
  @JoinColumn({name: "id_participante"})
  participante: Participante;

  @ManyToOne(()=>Evento)
  @JoinColumn({name: "id_evento"})
  evento: Evento;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { InscricoesEventos };