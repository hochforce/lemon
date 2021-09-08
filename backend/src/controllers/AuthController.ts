import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UserAuth from '../models/UserAuth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(UserAuth);
    const { cpf, password } = request.body;

    const user = await repository.findOne({ where: { cpf } });

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }
    
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    delete user.password;

    return response.json({
      user,
      token
    })
  }
}

export { AuthController };