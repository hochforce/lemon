import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { InscricoesEventos } from '../models/InscricoesEventos';
import { Participante } from '../models/Participante';

class InscricoesEventoController {
  async create(request: Request, response: Response) {
    const { id_participante, id_evento, is_present } = request.body;
    const inscricoeseventosRepositorio = getRepository(InscricoesEventos);
    const inscricoeseventos = inscricoeseventosRepositorio.create({
      id_participante,
      id_evento,
      is_present
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
  async update(request: Request, response: Response) {
    var {
      id_participante,
      is_present
    } = request.body;
    var present = false
    if(is_present === 'false' || is_present === false){
      present = false
    }else{
      present = true
    }
    await getConnection()
      .createQueryBuilder()
      .update(InscricoesEventos)
      .set({ is_present: present })
      .where("id_participante = :id", { id: id_participante })
      .execute();
    return response.json(response.status);
  }
  

}

export { InscricoesEventoController };