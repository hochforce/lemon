import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import { Endereco } from '../models/Endereco';

class EnderecoController{
  async create(request: Request, response: Response){
    const {logradouro, 
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado } = request.body;
    const enderecoRepositorio = getRepository(Endereco);
    const endereco = enderecoRepositorio.create({
      logradouro, numero, complemento, bairro, cep, cidade, estado
    });
    enderecoRepositorio.save(endereco);
    return response.json(endereco);
  }
}

export { EnderecoController };