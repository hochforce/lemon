import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Organizador } from './Organizador';
import { PeriodoDuracao } from './PeriodoDuracao';
import { Parceria } from './Parceria';
import { Endereco } from './Endereco';

@Entity("eventos")
class Evento{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_organizador: string;

  @Column()
  id_periodo_duracao

  @Column()
  id_parceria: string;

  @Column()
  id_endereco: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  tipo: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(()=>Organizador)
  @JoinColumn({name: "id_organizador"})
  organizador: Organizador;

  @ManyToOne(()=>PeriodoDuracao)
  @JoinColumn({name: "id_periodo_duracao"})
  periodoDuracao: PeriodoDuracao;

  @ManyToOne(()=>Parceria)
  @JoinColumn({name: "id_parceria"})
  parceria: Parceria;

  @ManyToOne(()=>Endereco)
  @JoinColumn({name: "id_endereco"})
  endereco: Endereco;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Evento };