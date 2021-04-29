import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UserAuth from '../models/UserAuth';

class UserAuthController {

  index(request: Request, response: Response){
    return response.json({ userID: request.userId });
  }

  async store(request: Request, response: Response){
    const repository = getRepository(UserAuth);
    const { cpf, password, tipo } = request.body;

    const userExists = await repository.findOne({ where: { cpf } });

    if (userExists) {
      return response.sendStatus(409);
    }else{
      const user = repository.create({ cpf, password, tipo });
      await repository.save(user);
      return response.json(user);
    }

  }
  async search(request: Request, response: Response) {
    const cpfSearch = await getRepository(UserAuth)
      .createQueryBuilder("userAuth")
      .where("id = :id", {id: request.params.id})
      .getOne();
    return response.json(cpfSearch);
  }
}

export { UserAuthController };