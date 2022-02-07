import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { InscricoesEventos } from '../models/InscricoesEventos';

class InscricoesEventoController {
  async create(request: Request, response: Response) {
    const { id_participante, id_evento } = request.body;
    const inscricoeseventosRepositorio = getRepository(InscricoesEventos);
    const inscricoeseventos = inscricoeseventosRepositorio.create({
      id_participante,
      id_evento
    });
    inscricoeseventosRepositorio.save(inscricoeseventos);
    return response.json(inscricoeseventos);
  }

  async searchByParticipant(request: Request, response: Response) {

    const search = await getRepository(InscricoesEventos)
      .createQueryBuilder("inscricoesEventos")
      .where("id_participante = :id", { id: request.params.id })
      .getMany();
    return response.json(search);
  }
  async searchByEvent(request: Request, response: Response) {

    const search = await getRepository(InscricoesEventos)
      .createQueryBuilder("inscricoesEventos")
      .where("id_evento = :id", { id: request.params.id })
      .getMany();
    return response.json(search);
  }

  async searchSubscribe(request: Request, response: Response) {
    let idUser = request.params.idUser;
    let idEvent = request.params.idEvent;
    let subscribe = false;
    const search = await getRepository(InscricoesEventos)
      .createQueryBuilder("inscricoesEventos")
      .where("id_participante = :id AND id_evento = :name", { id: idUser, name: idEvent })
      .getMany();

    if (search.length > 0) { subscribe = true }
    
    return response.json(subscribe);
  }
  // async list(request: Request, response: Response){
  //   const eventosList = await getRepository(Evento)
  //                       .createQueryBuilder("eventos")
  //                       .getMany();
  //   return response.json(eventosList);
  // }

}

export { InscricoesEventoController };