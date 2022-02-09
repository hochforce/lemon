import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Certificado } from '../models/Certificado';

class CertificadoController {
  async create(request: Request, response: Response) {
    const { id_evento, id_participante, key } = request.body;
    const certificadoRepositorio = getRepository(Certificado);
    const certificado = certificadoRepositorio.create({
      id_evento, id_participante, key
    })
    certificadoRepositorio.save(certificado);
    return response.json(certificado);
  }
  async list(request: Request, response: Response) {
    const certificadosList = await getRepository(Certificado)
      .createQueryBuilder("certificados")
      .getMany();
    return response.json(certificadosList);
  }
  async checkValidation(request: Request, response: Response) {
    const search = await getRepository(Certificado)
      .createQueryBuilder("certificados")
      .where("key = :id", { id: request.params.code })
      .getOne();
    return response.json(search);
  }

}

export { CertificadoController };