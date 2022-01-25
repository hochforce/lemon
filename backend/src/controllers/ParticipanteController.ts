import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Participante } from '../models/Participante';
import bcrypt from 'bcryptjs';


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
      .where("cpf = :cpf", { cpf: request.params.cpf })
      .getOne();
    return response.json(participanteSearch);
  }
  async searchById(request: Request, response: Response) {
    const participanteSearch = await getRepository(Participante)
      .createQueryBuilder("participantes")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(participanteSearch);
  }
  async update(request: Request, response: Response) {
    const search = await getRepository(Participante)
      .createQueryBuilder("participantes")
      .where("id = :id", { id: request.params.id })
      .getOne();
    var {
      nome,
      sobrenome,
      campus_instituicao,
      password
    } = request.body;
    request.body.password = bcrypt.hashSync(request.body.password, 8);
    await getConnection()
      .createQueryBuilder()
      .update(Participante)
      .set({
        nome: request.body.nome ? request.body.nome : search.nome,
        sobrenome: request.body.sobrenome ? request.body.sobrenome : search.sobrenome,
        campus_instituicao: request.body.campus_instituicao ? request.body.campus_instituicao : search.campus_instituicao,
        password: request.body.password ? request.body.password : search.password
      })
      .where("id = :id", { id: request.params.id })
      .execute();
    return response.json(response.status);
  }

}
export { ParticipanteController };