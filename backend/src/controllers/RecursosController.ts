import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Recursos } from '../models/Recursos';

class RecursosController {
  async create(request: Request, response: Response) {
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
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(buscaRecursos);
  }

  async update(request: Request, response: Response) {
    console.log("ENTROU NO UPDATE E O ID É: ", request.params.id)
    if (request.params.id === undefined) {
      const { id_bolsa, materiais, recursos_humanos, instalacoes } = request.body;
      const recursosRepositorio = getRepository(Recursos);
      const recursos = recursosRepositorio.create({
        id_bolsa, materiais, recursos_humanos, instalacoes
      })
      recursosRepositorio.save(recursos);
    } else {
      const {
        id_bolsa,
        materiais,
        recursos_humanos,
        instalacoes
      } = request.body;
      const materialRepositorio = getRepository(Recursos);
      const recurso = materialRepositorio.save({
        id: request.params.id,
        id_bolsa: request.body.id_bolsa,
        materiais: request.body.materiais,
        recursos_humanos: request.body.recursos_humanos,
        instalacoes: request.body.instalacoes
      });
    }
    return response.json(response.status);
  }

}

export { RecursosController };