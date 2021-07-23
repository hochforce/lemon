import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Input } from '../../components/Form/input';
import { api } from '../../services/api';

export default function NewManager({ history }) {

      const [titulo, setTitulo] = useState('');
      const [descricao, setDescricao] = useState('');
      const [tipo, setTipo] = useState('');
      const [data_inicio, setDataInicio] = useState('');
      const [hora_inicio, setHoraInicio] = useState('');
      const [data_fim, setDataFim] = useState('');
      const [hora_fim, setHoraFim] = useState('');
      const [logradouro, setLogradouro] = useState('');
      const [numero, setNumero] = useState('');
      const [complemento, setComplemento] = useState('');
      const [bairro, setBairro] = useState('');
      const [cidade, setCidade] = useState('');
      const [estado, setEstado] = useState('');
      const [cep, setCep] = useState('');
      const [parceiro, setParceiro] = useState('');
      const [tipo_parceria, setTipoParceria] = useState('');
      const [valor, setValor] = useState('');
      const [materiais, setMateriais] = useState('');
      const [recursos_humanos, setRecursosHumanos] = useState('');
      const [instalacoes, setInstalacoes] = useState('');
      const [financiamento, setFinanciamento] = useState('');
      const [tipo_bolsa, setTipoBolsa] = useState('');
      const [status, setStatus] = useState('');
      

      const formRef = useRef(null);

      async function handleSubmit(data, { reset }, event) {
            event.preventDefault();

            try {
                  const schema = Yup.object().shape({
                        titulo: Yup.string().required('O título é obrigatório'),
                        descricao: Yup.string().required('A descrição é obrigatória'),
                        tipo: Yup.string().required('O tipo é obrigatório'),
                        data_inicio: Yup.date().required('Este campo é obrigatório'),
                        hora_inicio: Yup.string().required('Este campo é obrigatório'),
                        data_fim: Yup.date().required('Este campo é obrigatório'),
                        hora_fim: Yup.string().required('Este campo é obrigatório'),
                        logradouro: Yup.string().required('Este campo é obrigatório'),
                        numero: Yup.number().required('Este campo é obrigatório'),
                        complemento: Yup.string().required('Este campo é obrigatório'),
                        bairro: Yup.string().required('Este campo é obrigatório'),
                        cidade: Yup.string().required('Este campo é obrigatório'),
                        estado: Yup.string().required('Este campo é obrigatório'),
                        cep: Yup.string().required('Este campo é obrigatório'),
                        parceiro: Yup.string().required('Este campo é obrigatório'),
                        tipo_parceria: Yup.string().required('Este campo é obrigatório'),
                        valor: Yup.string().required('Este campo é obrigatório'),
                        materiais: Yup.string().required('Este campo é obrigatório'),
                        recursos_humanos: Yup.string().required('Este campo é obrigatório'),
                        instalacoes: Yup.string().required('Este campo é obrigatório'),
                        financiamento: Yup.string().required('Este campo é obrigatório'),
                        tipo_bolsa: Yup.string().required('Este campo é obrigatório')
                  })
                  await schema.validate(data, {
                        abortEarly: false,
                  })

                  console.log(data);

                  //Salvando na tabela parcerias
                  const saveParceria = await api.post('/parceiros', {
                        parceiro,
                        tipo_parceria,
                        valor
                  });
                  const id_parceria = saveParceria.data.id;
                  console.log(saveParceria.data);
                  //Salvando na tabela bolsas
                  const saveBolsa = await api.post('/bolsas', {
                        financiamento,
                        tipo_bolsa
                  });
                  const { id_bolsa } = saveBolsa.data.id;
                  console.log(saveBolsa.data);
                  //Salvando na tabela recursos
                  const saveRecurso = await api.post('/recursos', {
                        id_bolsa,
                        materiais,
                        recursos_humanos,
                        instalacoes
                  });

                  console.log(saveRecurso.data);
                  //Salvando na tabela enderecos
                  const saveEndereco = await api.post('/enderecos', {
                        logradouro,
                        numero,
                        complemento,
                        bairro,
                        cidade,
                        estado,
                        cep
                  });
                  const id_endereco = saveEndereco.data.id;
                  console.log(saveEndereco.data);
                  //Salvando na tabela periododuracao
                  const savePeriodo = await api.post('/periododuracao', {
                        data_inicio,
                        hora_inicio,
                        data_fim,
                        hora_fim
                  });
                  const id_periodo_duracao = savePeriodo.data.id;
                  
                  var id_organizador = localStorage.getItem("organizador");
                  
                  //Salvando na tabela eventos
                  
                  const saveEvento = await api.post('/eventos', {
                        titulo,
                        descricao,
                        tipo,
                        id_organizador,
                        id_periodo_duracao,
                        id_parceria,
                        id_endereco,
                        status
                  });
                  console.log(saveEvento.data);
                  formRef.current.setErrors({});
                  reset();
                  history.push('/manager');

            } catch (err) {
                  if (err instanceof Yup.ValidationError) {
                        const errorMessages = {};

                        err.inner.forEach(error => {
                              errorMessages[error.path] = error.message;
                        })

                        formRef.current.setErrors(errorMessages);
                  }
            }
      }

      return (
            <>
                  <div className="menu-temp">
                        <a href="http://localhost:3000/new-participant">Participante</a>
                        <a href="http://localhost:3000/new-manager">Organizador</a>
                        <a href="http://localhost:3000/new-event">Evento</a>
                        <a href="http://localhost:3000/">Login</a>
                        <a href="http://localhost:3000/new-certificate">Gerar Certificado</a>
                        <a href="http://localhost:3000/manager">Dash Organizador</a>
                  </div>
                  <h1>CADASTRO DE NOVO EVENTO</h1>
                  <div className="container">
                        <Form ref={formRef} onSubmit={handleSubmit}>
                              <label>Dados do Evento</label>
                              <Input name="titulo"
                                    placeholder="Título do evento"
                                    value={titulo}
                                    onChange={event => setTitulo(event.target.value)}
                              />
                              <Input name="descricao"
                                    placeholder="Breve descrição"
                                    value={descricao}
                                    onChange={event => setDescricao(event.target.value)}
                              />
                              <Input name="tipo"
                                    placeholder="Qual tipo do Evento?"
                                    value={tipo}
                                    onChange={event => 
                                          {
                                                setTipo(event.target.value)
                                                setStatus("ativo");
                                          }}
                              />
                              <label>Período e Duração</label>
                              <Input name="data_inicio"
                                    type="date"
                                    value={data_inicio}
                                    onChange={event => setDataInicio(event.target.value)}
                              />
                              <Input name="hora_inicio"
                                    type="time"
                                    value={hora_inicio}
                                    onChange={event => setHoraInicio(event.target.value)}
                              />
                              <Input name="data_fim"
                                    type="date"
                                    value={data_fim}
                                    onChange={event => setDataFim(event.target.value)}
                              />
                              <Input name="hora_fim"
                                    type="time"
                                    value={hora_fim}
                                    onChange={event => setHoraFim(event.target.value)}
                              />
                              <label>Onde acontecerá o Evento</label>
                              <Input name="logradouro"
                                    placeholder="Logradouro"
                                    value={logradouro}
                                    onChange={event => setLogradouro(event.target.value)}
                              />
                              <Input name="numero"
                                    type="number"
                                    placeholder="Número"
                                    value={numero}
                                    onChange={event => setNumero(event.target.value)}
                              />
                              <Input name="complemento"
                                    placeholder="Complemento"
                                    value={complemento}
                                    onChange={event => setComplemento(event.target.value)}
                              />
                              <Input name="bairro"
                                    placeholder="Bairro"
                                    value={bairro}
                                    onChange={event => setBairro(event.target.value)}
                              />
                              <Input name="cidade"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={event => setCidade(event.target.value)}
                              />
                              <Input name="estado"
                                    placeholder="Estado"
                                    value={estado}
                                    onChange={event => setEstado(event.target.value)}
                              />
                              <Input name="cep"
                                    placeholder="CEP"
                                    value={cep}
                                    onChange={event => setCep(event.target.value)}
                              />
                              <label>Parceria</label>
                              <Input name="parceiro"
                                    placeholder="Parceiro"
                                    value={parceiro}
                                    onChange={event => setParceiro(event.target.value)}
                              />
                              <Input name="tipo_parceria"
                                    placeholder="Tipo de Parceria"
                                    value={tipo_parceria}
                                    onChange={event => setTipoParceria(event.target.value)}
                              />
                              <Input name="valor"
                                    placeholder="Valor"
                                    value={valor}
                                    onChange={event => setValor(event.target.value)}
                              />
                              <label>Recursos</label>
                              <Input name="materiais"
                                    placeholder="Materiais"
                                    value={materiais}
                                    onChange={event => setMateriais(event.target.value)}
                              />
                              <Input name="recursos_humanos"
                                    placeholder="Recursos Humanos"
                                    value={recursos_humanos}
                                    onChange={event => setRecursosHumanos(event.target.value)}
                              />
                              <Input name="instalacoes"
                                    placeholder="Instalacoes"
                                    value={instalacoes}
                                    onChange={event => setInstalacoes(event.target.value)}
                              />
                              <label>Bolsas</label>
                              <Input name="financiamento"
                                    placeholder="Financiamento"
                                    value={financiamento}
                                    onChange={event => setFinanciamento(event.target.value)}
                              />
                              <Input name="tipo_bolsa"
                                    placeholder="Tipo de Bolsa"
                                    value={tipo_bolsa}
                                    onChange={event => setTipoBolsa(event.target.value)}
                              />

                              <button className="btn" type="submit">Cadastrar</button>
                        </Form>
                  </div>
            </>
      )
}