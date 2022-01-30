import { getRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { Contato } from '../models/Contato';

class ContatoController {
  async create(request: Request, response: Response){
    const { telefone, email } = request.body;
    const contatoRepositorio = getRepository(Contato);
    const contato = contatoRepositorio.create({
      telefone, email
    })
    
    contatoRepositorio.save(contato);

    return response.json(contato);
  }
  async searchById(request: Request, response: Response) {
    const contactSearch = await getRepository(Contato)
      .createQueryBuilder("contatos")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(contactSearch);
  }
  async update(request: Request, response: Response) {
    const search = await getRepository(Contato)
      .createQueryBuilder("contatos")
      .where("id = :id", { id: request.params.id })
      .getOne();
    var {
      telefone,
      email
    } = request.body;
    
    await getConnection()
      .createQueryBuilder()
      .update(Contato)
      .set({
        telefone: request.body.telefone ? request.body.telefone : search.telefone,
        email: request.body.email ? request.body.email : search.email
      })
      .where("id = :id", { id: request.params.id })
      .execute();
    return response.json(response.status);
  }
}

export { ContatoController };