import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Participante } from './Participante';
import { Evento } from './Evento';

@Entity("certificados")
class Certificado{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_participante: string;

  @Column()
  id_evento: string;

  @Column()
  key: string;

  @ManyToOne(()=>Evento)
  @JoinColumn({name: "id_evento"})
  evento: Evento;

  @ManyToOne(()=>Participante)
  @JoinColumn({name: "id_participante"})
  participante: Participante;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Certificado };