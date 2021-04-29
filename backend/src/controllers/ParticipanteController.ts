import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Participante } from '../models/Participante';

class ParticipanteController {
  async create(request: Request, response: Response) {
    const { nome, sobrenome, cpf, campus_instituicao, password } = request.body;
    const participanteRepositorio = getRepository(Participante);
    const cpfExiste = await participanteRepositorio.findOne({ cpf });
    console.log(await cpfExiste);
    console.log(cpf);

    if (!cpfExiste) {
      const participante = participanteRepositorio.create({
        nome, sobrenome, cpf, campus_instituicao, password
      })
      await participanteRepositorio.save(participante);
      return response.json(participante);
    } else {
      response.json({ message: "Já existe um usuário com esse CPF cadastrado!" })
    }
  }
  async list(request: Request, response: Response) {
    const participanteList = await getRepository(Participante)
      .createQueryBuilder("participantes")
      .getMany();
    return response.json(participanteList);
  }
  async search(request: Request, response: Response) {
    const participanteSearch = await getRepository(Participante)
      .createQueryBuilder("participantes")
      .where("cpf = :cpf", {cpf: request.params.cpf})
      .getOne();
    return response.json(participanteSearch);
  }

}
export { ParticipanteController };