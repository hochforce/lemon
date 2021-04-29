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

}

export { RecursosController };