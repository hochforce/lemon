import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PeriodoDuracao } from '../models/PeriodoDuracao';

class PeriodoDuracaoController{
  async create(request: Request, response: Response){
    const { data_inicio, data_fim, hora_inicio, hora_fim } = request.body;
    
    const periodoDuracaoRepositorio = getRepository(PeriodoDuracao);
    const periodoDuracao = periodoDuracaoRepositorio.create({
      data_inicio, data_fim, hora_inicio, hora_fim
    })
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

}

export { PeriodoDuracaoController };