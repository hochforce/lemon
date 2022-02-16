import { Router } from "express";
import { ParticipanteController } from './controllers/ParticipanteController';
import { ContatoController } from './controllers/ContatoController';
import { OrganizadorController } from './controllers/OrganizadorController';
import { EnderecoController } from './controllers/EnderecoController';
import { ParceriaController } from './controllers/ParceriaController';
import { CertificadoController } from './controllers/CertificadoController';
import { EventoController } from './controllers/EventoController';
import { RecursosController } from './controllers/RecursosController';
import { BolsaController } from './controllers/BolsaController';
import { PeriodoDuracaoController } from './controllers/PeriodoDuracaoController';
import { UserAuthController } from './controllers/UserAuthController';
import { AuthController } from './controllers/AuthController';
import { InscricoesEventoController } from './controllers/InscricoesEventosController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const participanteController = new ParticipanteController();
const contatoController = new ContatoController();
const organizadorController = new OrganizadorController();
const enderecoController = new EnderecoController();
const parceriaController = new ParceriaController();
const certificadoController = new CertificadoController();
const eventoController = new EventoController();
const recursosController = new RecursosController();
const bolsaController = new BolsaController();
const periodoDuracaoController = new PeriodoDuracaoController();
const userAuthController = new UserAuthController();
const inscricoesEventoController = new InscricoesEventoController();
const authController = new AuthController();

router.post("/participantes", participanteController.create);
router.post("/contatos", contatoController.create);
router.post("/organizadores", organizadorController.create);
router.post("/enderecos", enderecoController.create);
router.post("/parceiros", parceriaController.create);
router.post("/certificados", certificadoController.create);
router.post("/eventos", eventoController.create);
router.post("/recursos", recursosController.create);
router.post("/bolsas", bolsaController.create);
router.post("/periododuracao", periodoDuracaoController.create);
router.post("/user-auth", userAuthController.store);
router.post("/auth", authController.authenticate);
router.post("/inscricoes", inscricoesEventoController.create);

router.post("/updates/:id", eventoController.update);
router.post("/updatePeriodo/:id", periodoDuracaoController.update);
router.post("/updateEndereco/:id", enderecoController.update);
router.post("/updateContact/:id", contatoController.update);
router.post("/updateParceria/:id", parceriaController.update);
router.post("/updateRecurso/:id", recursosController.update);
router.post("/updateBolsa/:id", bolsaController.update);
router.post("/updateUser/:id", participanteController.update);
router.post("/updateManager/:id", organizadorController.update);
router.post("/updateUserAuth/:id", userAuthController.update);
router.post("/updateStatus/:id", eventoController.updateStatus);
router.post("/updateIscricoes", inscricoesEventoController.update);

router.get("/listEventos/:id", eventoController.search);
router.get("/searchParticipant/:cpf", participanteController.search);
router.get("/searchParticipantById/:id", participanteController.searchById);
router.get("/searchOrganizador/:cpf", organizadorController.search);
router.get("/searchOrganizadorById/:id", organizadorController.searchById);
router.get("/searchContactById/:id", contatoController.searchById);
router.get("/searchCpf/:id", userAuthController.search);
router.get("/listEventos/", eventoController.list);
router.get("/listEventosAtivos", eventoController.searchByStatusAtivo);
router.get("/listEventosFinalizados", eventoController.searchByStatusFinalizado);
router.get("/listEventosCancelados", eventoController.searchByStatusCancelado);
router.get("/listParticipantes", participanteController.list);
router.get("/listCertificados", certificadoController.list);
router.get("/listOrganizadores/", organizadorController.list);
router.get("/user-auth", authMiddleware, userAuthController.index);
router.get("/listPeriodos/:id", periodoDuracaoController.search);
router.get("/listEnderecos/:id", enderecoController.search);
router.get("/listParcerias/:id", parceriaController.search);
router.get("/listRecursos/:id", recursosController.search);
router.get("/listBolsa/:id", bolsaController.search);
router.get("/searchSubscribe/:id", inscricoesEventoController.searchByParticipant);
router.get("/searchSubscribeByEvent/:id", inscricoesEventoController.searchByEvent);
router.get("/subscribe/:idUser/:idEvent", inscricoesEventoController.searchSubscribe);
router.get("/isPresent/:idUser/:idEvent", inscricoesEventoController.searchPresence);
router.get("/eventos/:page/:limit", eventoController.searchWithLimit);
router.get("/searchWithLimitAtivo/:page/:limit", eventoController.searchWithLimitAtivo);
router.get("/searchWithLimitCancelado/:page/:limit", eventoController.searchByStatusCancelado);
router.get("/searchWithLimitFinalizado/:page/:limit", eventoController.searchByStatusFinalizado);
router.get("/validation/:code", certificadoController.checkValidation);

export { router }










// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)