import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Parceria } from '../models/Parceria';

class ParceriaController{
  async create(request: Request, response: Response){
    const { parceiro, tipo_parceria, valor } = request.body;
    const parceriaRepositorio = getRepository(Parceria);
    const parceria = parceriaRepositorio.create({
      parceiro, tipo_parceria, valor
    });
    parceriaRepositorio.save(parceria);
    return response.json(parceria);
  }

  async search(request: Request, response: Response) {
    const buscaParcerias = await getRepository(Parceria)
      .createQueryBuilder("parcerias")
      .where("id = :id", {id: request.params.id})
      .getOne();
    return response.json(buscaParcerias);
  }

  async update(request: Request, response: Response) {
    const {
      parceiro, 
      tipo_parceria, 
      valor
    } = request.body;
    const parceriaRepositorio = getRepository(Parceria);
    const parceria = parceriaRepositorio.save({
      id: request.params.id,
      parceiro: request.body.parceiro,
      tipo_parceria: request.body.tipo_parceria,
      valor: request.body.valor
    });
    return response.json(response.status);
  }
}

export { ParceriaController };