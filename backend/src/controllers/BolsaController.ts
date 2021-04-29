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

}

export { BolsaController };