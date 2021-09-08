import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Bolsa } from '../models/Bolsa';

class BolsaController{
  async create(request: Request, response: Response){
    const { financiamento, tipo_bolsa } = request.body;
    const bolsaRepositorio = getRepository(Bolsa);
    const bolsa = bolsaRepositorio.create({
      financiamento, tipo_bolsa
    })
    bolsaRepositorio.save(bolsa);
    return response.json(bolsa);
  }

  async search(request: Request, response: Response) {
    const buscaBolsa = await getRepository(Bolsa)
      .createQueryBuilder("bolsas")
      .where("id = :id", {id: request.params.id})
      .getOne();
    return response.json(buscaBolsa);
  }

  async update(request: Request, response: Response) {
    const {
      financiamento, 
      tipo_bolsa
    } = request.body;
    const bolsaRepositorio = getRepository(Bolsa);
    const bolsa = bolsaRepositorio.save({
      id: request.params.id,
      financiamento: request.body.financiamento,
      tipo_bolsa: request.body.tipo_bolsa
    });
    return response.json(response.status);
  }

}

export { BolsaController };