import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Recursos } from '../models/Recursos';

class RecursosController{
  async create(request: Request, response: Response){
    const { id_bolsa, materiais, recursos_humanos, instalacoes } = request.body;
    const recursosRepositorio = getRepository(Recursos);
    const recursos = recursosRepositorio.create({
      id_bolsa, materiais, recursos_humanos, instalacoes
    })
    recursosRepositorio.save(recursos);
    return response.json(recursos);
  }

  async search(request: Request, response: Response) {
    const buscaRecursos = await getRepository(Recursos)
      .createQueryBuilder("recursos")
      .where("id = :id", {id: request.params.id})
      .getOne();
    return response.json(buscaRecursos);
  }

}

export { RecursosController };