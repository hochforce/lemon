import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import UserAuth from '../models/UserAuth';
import bcrypt from 'bcryptjs';

function validaCpfCnpj(val) {

  if (val.length == 11) {
    var cpf = val.trim();

    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] != cpf[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
      v1 = 0;
    }

    if (v1 != cpf[9]) {
      return false;
    }

    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
      v2 = 0;
    }

    if (v2 != cpf[10]) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

class UserAuthController {

  index(request: Request, response: Response) {
    return response.json({ userID: request.userId });
  }

  async store(request: Request, response: Response) {
    const repository = getRepository(UserAuth);
    const { cpf, password, tipo } = request.body;
    const valida = validaCpfCnpj(cpf);
    
    const userExists = await repository.findOne({ where: { cpf } });
    if(!valida){
      return response.sendStatus(409);
    }else{
      if (userExists) {
        return response.sendStatus(409);
      } else {
        const user = repository.create({ cpf, password, tipo });
        await repository.save(user);
        return response.json(user);
      }
    }
  }
  async search(request: Request, response: Response) {
    const cpfSearch = await getRepository(UserAuth)
      .createQueryBuilder("userAuth")
      .where("id = :id", { id: request.params.id })
      .getOne();
    return response.json(cpfSearch);
  }
  async update(request: Request, response: Response) {
    const search = await getRepository(UserAuth)
      .createQueryBuilder("userAuth")
      .where("id = :id", { id: request.params.id })
      .getOne();
    var {
      password
    } = request.body;
    request.body.password = bcrypt.hashSync(request.body.password, 8);
    await getConnection()
      .createQueryBuilder()
      .update(UserAuth)
      .set({
        password: request.body.password ? request.body.password : search.password
      })
      .where("id = :id", { id: request.params.id })
      .execute();
    return response.json(response.status);
  }
}

export { UserAuthController };