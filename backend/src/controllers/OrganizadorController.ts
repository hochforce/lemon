import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Organizador } from '../models/Organizador';
import bcrypt from 'bcryptjs';

class OrganizadorController {
  async create(request: Request, response: Response) {

    const { id_contato,
      nome,
      sobrenome,
      cpf,
      campus_instituicao,
      titulacao,
      cargo,
      password
    } = request.body;

    const organizadorRepository = getRepository(Organizador);
    const cpfExiste = await organizadorRepository.findOne({ cpf });
    console.log(await cpfExiste);
    console.log(cpf);

    if (!cpfExiste) {
      const organizador = organizadorRepository.create({
        id_contato,
        nome,
        sobrenome,
        cpf,
        campus_instituicao,
        titulacao,
        cargo,
        password
      });
      organizadorRepository.save(organizador);
      return response.json(organizador);
    } else {
      response.json({ message: "Já existe um organizador com esse CPF cadastrado!" })
    }
  }

  async list(request: Request, response: Response) {
    const { id } = request.params;
    const userManager = await getRepository(Organizador).find({ id })
    const organizadorList = await getRepository(Organizador)
                                  .createQueryBuilder("organizadores")
                                  .getMany();
    response.json(organizadorList);
  }

  async search(request: Request, response: Response) {
    const organizadorSearch = await getRepository(Organizador)
      .createQueryBuilder("organizadores")
      .where("cpf = :cpf", {cpf: request.params.cpf})
      .getOne();
    return response.json(organizadorSearch);
  }
  async searchById(request: Request, response: Response) {
    const managerSearch = await getRepository(Organizador)
      .createQueryBuilder("organizadores")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(managerSearch);
  }
  async update(request: Request, response: Response) {
    const search = await getRepository(Organizador)
      .createQueryBuilder("organizadores")
      .where("id = :id", { id: request.params.id })
      .getOne();
    
    var {
      nome,
      sobrenome,
      campus_instituicao,
      titulacao,
      cargo,
      password
    } = request.body;
    request.body.password = bcrypt.hashSync(request.body.password, 8);
    await getConnection()
      .createQueryBuilder()
      .update(Organizador)
      .set({
        nome: request.body.nome ? request.body.nome : search.nome,
        sobrenome: request.body.sobrenome ? request.body.sobrenome : search.sobrenome,
        campus_instituicao: request.body.campus_instituicao ? request.body.campus_instituicao : search.campus_instituicao,
        titulacao: request.body.titulacao ? request.body.titulacao : search.titulacao,
        cargo: request.body.cargo ? request.body.cargo : search.cargo,
        password: request.body.password ? request.body.password : search.password
      })
      .where("id = :id", { id: request.params.id })
      .execute();
    return response.json(response.status);
  }
}

export { OrganizadorController };