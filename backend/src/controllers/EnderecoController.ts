import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import { Endereco } from '../models/Endereco';

class EnderecoController {
  async create(request: Request, response: Response) {
    const { logradouro,
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

  async search(request: Request, response: Response) {
    const buscaEndereco = await getRepository(Endereco)
      .createQueryBuilder("enderecos")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(buscaEndereco);
  }

  async update(request: Request, response: Response) {
    const {
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      estado
    } = request.body;
    const localRepositorio = getRepository(Endereco);
    const endereco = localRepositorio.save({
      id: request.params.id,
      logradouro: request.body.logradouro,
      numero: request.body.numero,
      complemento: request.body.complemento,
      bairro: request.body.bairro,
      cep: request.body.cep,
      cidade: request.body.cidade,
      estado: request.body.estado
    });
    return response.json(response.status);
  }
}

export { EnderecoController };