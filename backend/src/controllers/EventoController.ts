import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Evento } from '../models/Evento';

class EventoController{
  async create(request: Request, response: Response){
    const { id_organizador, 
            id_periodo_duracao, 
            id_parceria, 
            id_endereco, 
            titulo,  
            descricao, 
            tipo
          } = request.body;
    const eventoRepositorio = getRepository(Evento);
    const evento = eventoRepositorio.create({
      id_organizador, 
      id_periodo_duracao, 
      id_parceria, 
      id_endereco, 
      titulo,  
      descricao, 
      tipo
    });
    eventoRepositorio.save(evento);
    return response.json(evento);
  }

  async list(request: Request, response: Response){
    const eventosList = await getRepository(Evento)
                        .createQueryBuilder("eventos")
                        .getMany();
    return response.json(eventosList);
  }

  async search(request: Request, response: Response){
    const eventosList = await getRepository(Evento)
                        .createQueryBuilder("eventos")
                        .where("id = :id", {id: request.params.id})
                        .getOne();
    return response.json(eventosList);
  }

}

export { EventoController };