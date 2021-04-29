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
}

export { ParceriaController };