import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Organizador } from '../models/Organizador';

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
}

export { OrganizadorController };