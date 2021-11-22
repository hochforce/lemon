import { Request, Response } from 'express';
import { getConnection, getRepository, SimpleConsoleLogger } from 'typeorm';
import { Evento } from '../models/Evento';

class EventoController {
  async create(request: Request, response: Response) {
    const {
      titulo,
      descricao,
      tipo,
      id_organizador,
      id_periodo_duracao,
      id_parceria,
      id_endereco,
      status
    } = request.body;
    const eventoRepositorio = getRepository(Evento);
    const evento = eventoRepositorio.create({
      titulo,
      descricao,
      tipo,
      id_organizador,
      id_periodo_duracao,
      id_parceria,
      id_endereco,
      status
    });
    eventoRepositorio.save(evento);
    return response.json(evento);
  }

  async update(request: Request, response: Response) {
    const {
      titulo,
      descricao,
      tipo
    } = request.body;
    const eventoRepositorio = getRepository(Evento);
    const evento = eventoRepositorio.save({
      id: request.params.id,
      titulo: request.body.titulo,
      descricao: request.body.descricao,
      tipo: request.body.tipo
    });
    return response.json(response.status);
  }

  async list(request: Request, response: Response) {
    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .getMany();
    return response.json(eventosList);
  }

  async search(request: Request, response: Response) {
    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(eventosList);
  }

  async searchByStatusAtivo(request: Request, response: Response) {
    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("status = :status", { status: "ativo" })
      .getMany();

    return response.json(eventosList);
  }
  async searchByStatusFinalizado(request: Request, response: Response) {
    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("status = :status", { status: "finalizado" })
      .getMany();
    return response.json(eventosList);
  }
  async searchByStatusCancelado(request: Request, response: Response) {
    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("status = :status", { status: "cancelado" })
      .getMany();
    return response.json(eventosList);
  }
  async searchWithLimit(request: Request, response: Response) {
    let limit = parseInt(request.params.limit);
    let page = parseInt(request.params.page);

    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .limit(limit)
      .offset((page - 1) * limit)
      .getMany();

    const eventsLength = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .getMany();

    let length = eventsLength.length;

    return response.json({ length, eventosList });
  }
  async searchWithLimitAtivo(request: Request, response: Response) {
    let limit = parseInt(request.params.limit);
    let page = parseInt(request.params.page);

    const eventosList = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("status = :status", { status: "ativo" })
      .limit(limit)
      .offset((page - 1) * limit)
      .getMany();

    const eventsLength = await getRepository(Evento)
      .createQueryBuilder("eventos")
      .where("status = :status", { status: "ativo" })
      .getMany();

    let length = eventsLength.length;

    return response.json({ length, eventosList });
  }
}
export { EventoController };