import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PeriodoDuracao } from '../models/PeriodoDuracao';

class PeriodoDuracaoController{
  async create(request: Request, response: Response){
    const { inicio, fim } = request.body;
    
    const periodoDuracaoRepositorio = getRepository(PeriodoDuracao);
    const periodoDuracao = periodoDuracaoRepositorio.create({
      inicio, fim })
    periodoDuracaoRepositorio.save(periodoDuracao);
    return response.json(periodoDuracao);
  }

  async search(request: Request, response: Response) {
    const buscaHorario = await getRepository(PeriodoDuracao)
      .createQueryBuilder("periodo_duracao")
      .where("id = :id", {id: request.params.id})
      .getOne();
    return response.json(buscaHorario);
  }

  async update(request: Request, response: Response) {
    const {
      inicio,
      fim
    } = request.body;
    const periodoRepositorio = getRepository(PeriodoDuracao);
    const periodo = periodoRepositorio.save({
      id: request.params.id,
      inicio: request.body.inicio,
      fim: request.body.fim
    });
    return response.json(response.status);
  }

}

export { PeriodoDuracaoController };