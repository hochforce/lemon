import { getRepository } from 'typeorm';
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
}

export { ContatoController };