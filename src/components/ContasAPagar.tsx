import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

import { boletosProps } from "../types/BoletosProps";
import { ClientesProps } from "../types/ClientesProps";
import { Button } from "./Button";
import { HeaderClient } from "./HeaderClient";
import { ParceiroProps } from "./PesquisaParsa";
import { Siderbar } from "./SiderBar";
import { CaretLeft, CaretRight, MagnifyingGlass } from "phosphor-react";
import axios from "axios";
import { app } from "../services/app";
import moment from "moment";

export interface contasProps {
  bairro: string;
  cep: string;
  cidade: string;
  cnpj: string;
  codigo_sacado: string;
  complemento_endereco: string;
  data_limite_pagamento: string;
  data_registro: string;
  data_vencimento: string;
  logradouro_endereco: string;
  email: string;
  nome: string;
  numero_cobranca: number;
  numero_documento: string;
  numero_endereco: string;
  texto_desconto: string;
  texto_limite_pagamento: string;
  texto_multa: string;
  texto_status: string;
  texto_valor: string;
  url_cobranca: string;
  valor_cobranca: number;
  demonstrativo_1: string;
}

export default function ContasApagar() {
  const [contas, setContas] = useState<contasProps[]>([]);
  //console.log(contas);
  const [boletos, setBoletos] = useState<boletosProps[]>([]);
  //console.log("boletos", boletos);

  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);
  const [nivel, setNivel] = useState<any>();
  const [numero_cobranca, setNumero_cobranca] = useState<number>();
  const [emailAtrasado, setEmailAtrasado] = useState<null | string>();
  //console.log(emailAtrasado);
  const [clientes, setClientes] = useState<ClientesProps[]>([]);
  //console.log("clientes", clientes);
  const [basic, setBasic] = useState("");
  //console.log("basic")
  const [basi, setBasi] = useState("");
  //  console.log("basi", basi)
  const [idParceiro, setIdParceiro] = useState(0);
  const [parceiroid, setparceiroid] = useState("");
  // const [ cliente, setCliente] = useState<number | null>()
  // console.log("id",cliente)
  const [adiantar, setAdiantar] = useState(false);
  const [cn, setCn] = useState("");
  //console.log(cn)
  const [dados, setDados] = useState("");
  const [cnpjDig, setCnpjDig] = useState("");
  //console.log("d", cnpjDig);
  const [registro, setRegistro] = useState("");
  //console.log("registro", registro)
  const [numDoc, setNumDoc] = useState<number>();
  const [pagina, setPagina] = useState<number | null>(1);
  //console.log("numero doc", numDoc)
  const [finalizada, setFinalizada] = useState("");
  const [user_id, setUser_id] = useState("");
  const [qtd, setQtd] = useState(0);
  const [cod_status, setCod_status] = useState("90");
  const [ano, setAno] = useState<number>();
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [mesvenc, setMesVenc] = useState("");
  const [anovenc, setAnoVenc] = useState("");
  const [qtdmes, setqtdmes] = useState("");
  const [pag_atual, setPag_atual] = useState(1);
  const [aparecer, setAparecer] = useState(false);

  const [pCnpj, setPCnpj] = useState<boolean>();
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  //console.log(mes)
  const [paginacao, setPaginacao] = useState(1);
  const [mesRef, setMesRef] = useState("");
  const idParsa = idParceiro.toString();
  const userId = localStorage.getItem("Id");
  const emailParsa = localStorage.getItem("email");

  const data_inicial = `01/0${mes + 1}/${ano}`;
  const data_final = `31/0${mes + 2}/${ano}`;
  //console.log( data_inicial , data_final)
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  const cnpj = `${p6}${p5}${p7}`;
  //console.log(cnpj)
  //const {nivel} = useParams()

  const pages = Math.ceil(contas.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = contas.slice(startIndex, endIndex);

  console.log(currentItens);
  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month"));
    setAno(agora.year());
  }, []);
  useEffect(() => {
    api.get("/qtdboleto").then((response) => {
      const qtd = response.data;
      setQtd(qtd);
    });
  }, []);
  useEffect(() => {
    if (!anovenc && mesvenc) {
      return;
    }
    if (anovenc && mesvenc) {
      api
        .post("/getboletosmes", {
          mes: `${mesvenc}/${anovenc}`,
        })
        .then((response) => {
          const qtdmes = response.data;
          setqtdmes(qtdmes);
        });
    }
  }, [mesvenc, anovenc]);
  useEffect(() => {
    if (!mesvenc) {
      return;
    }
    switch (mesvenc) {
      case "01":
        setMesRef("Janeiro");
        break;
      case "02":
        setMesRef("Fevereiro");
        break;
      case "03":
        setMesRef("Março");
        break;
      case "04":
        setMesRef("Abril");
        break;
      case "05":
        setMesRef("Maio");
        break;
      case "06":
        setMesRef("Junho");
        break;
      case "07":
        setMesRef("Julho");
        break;
      case "08":
        setMesRef("Agosto");
        break;
      case "09":
        setMesRef("Setembro");
        break;
      case "10":
        setMesRef("Outubro");
        break;
      case "11":
        setMesRef("Novembro");
        break;
      case "12":
        setMesRef("Dezembro");
        break;
    }
  }, [mesvenc]);
  useEffect(() => {
    if (nivel) {
      localStorage.setItem("Nivel", nivel);
    }
  }, [nivel]);
  const ref = localStorage.getItem("new");
  //consulta refresh-token e seta um novo token
  useEffect(() => {
    if (ref) {
      api
        .post(`/refresh-token`, {
          ref,
        })
        .then((response) => {
          //console.log(response.data)
          const { token } = response.data;
          localStorage.setItem("@PermissionYT:token", token);
        });
    }
  }, [ref]);
  //Função para editar o boleto com dados vindos da api f2b

  if (nivel == "1") {
    localStorage.setItem("idParceiro", idParsa);
  }
  useEffect(() => {
    api.get(`/boletosEnviados`).then((response) => {
      setBoletos(response.data);
    });
  }, []);
  useEffect(() => {
    if (cnpj) {
      setCnpjDig(cnpj);
    }
  }, [cnpj]);
  useEffect(() => {
    if (nivel == "2") {
      const parceiroid = localStorage.getItem("idParceiro");
      if (parceiroid != null) {
        setparceiroid(parceiroid);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      api.get(`/user/${userId}`).then((response) => {
        const { nivel } = response.data;
        setNivel(nivel);
      });
    }
  }, [userId]);
  useEffect(() => {
    if (parceiroid) {
      api
        .get(`/parceiro/${parceiroid}/cliente/${parceiroid}`)
        .then((response) => {
          const [{ cliente }] = response.data;
          //console.log("cliente", cliente);
          setClientes(cliente);
        });
    }
  }, [parceiroid]);
  useEffect(() => {
    if (cnpjDig) {
      app.get(`/clientebasicb/${cnpjDig}`).then((response) => {
        const { basic } = response.data;
        setBasi(basic);
        //console.log(basic)
        //setCnpjDig(cnpj);
      });
    }
  }, [cnpjDig]);
  useEffect(() => {
    if (userId) {
      api.get(`/getf2b/${userId}`).then((response) => {
        const [{ basic }] = response.data;
        //console.log("basic",basic)
        setBasic(basic);
      });
    }
  }, []);
  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
    });
  }, []);
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  function contasReceberClientesParceiro() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          email_sacado: emailParsa,
        },
      })
      .then(function (response) {
        try {
          setContas(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  function PaginaAtual() {
    if (pag_atual <= 100) {
      const pg = pag_atual + 1;
      setPag_atual(pg);
    }
  }
  function PaginaAtualB() {
    if (pag_atual > 0) {
      const pg = pag_atual - 1;
      setPag_atual(pg);
    }
  }
  function contasReceberClientes() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          limite: 100,
          pagina: `${pagina}`,
          codigo_status: parseInt(cod_status),
        },
      })
      .then(function (response) {
        try {
          setContas(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  function segundaVia() {
    addEventListener("submit", (e) => {
      e.preventDefault();

      window.location.reload();
    });
    f2b
      .get(`/cobrancas/segunda-via`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          cpf_cnpj: "05351887000186",
          email: "zema@gmail.com",
        },
      })
      .then(function (response) {
        try {
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  async function seachBoleto() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          cpf_cnpj: `${cn}`,
          codigo_status: -1,
        },
      })
      .then((response) => {
        try {
          setContas(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  async function seachBoletoNome() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          nome_sacado: `${cn}`,
          //codigo_status: -1,
        },
      })
      .then((response) => {
        try {
          setContas(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  async function seachBoletoUrl() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basi}`,
        },
        params: {
          cpf_cnpj: `${cnpjDig}`,
          codigo_status: -1,
        },
      })
      .then((response) => {
        try {
          setContas(response.data);
          //console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      });
  }
  async function upDadosboletos() {
    const carne = contas.filter(
      (contas) => contas.texto_status == "Registrada"
    );
    //console.log("carne", carne)
    if (!carne) {
      return;
    }
    for (let i = 0; i < carne.length; i++) {
      const conta = carne[i];
      // Lógica para modificar o status da conta aqui
      setDados(conta.email);
      setRegistro(conta.data_registro);
      setNumDoc(parseInt(conta.numero_documento));
    }
    //console.log("contas", carne);
  }
  async function upDadosboletosPaga() {
    const carne = contas.filter((contas) => contas.texto_status == "Cancelada");
    //console.log("carne", carne)
    if (!carne) {
      return;
    }
    for (let i = 0; i < carne.length; i++) {
      const conta = carne[i];
      // Lógica para modificar o status da conta aqui
      setFinalizada(conta.texto_status);
      setNumero_cobranca(conta.numero_cobranca);
      // setNumDoc(parseInt(conta.numero_documento));
    }
    console.log("contas", carne);
  }
//Função para consultar chave de acesso a f2b do usuário parceiro
  // async function BasicParceiro() {
  //   if (user_id) {
  //     api.get(`/getf2b/${user_id}`).then((response) => {
  //       const [{ basic }] = response.data;
  //       //console.log("basic",basic)
  //       setBasic(basic);
  //     });
  //   }
  // }
  async function AtualizarDados() {
    if (!dados) {
      return;
    }
    const idBoleto = boletos.filter((boletos) => dados === boletos.email);
    //console.log("idboleto" , idBoleto )
    if (idBoleto) {
      //UpdateStateClienteBloqueio(idClienteVencido.cliente_id);
      for (let i = 0; i < idBoleto.length; i++) {
        const conta = idBoleto[i];
        try {
          const response = await api.put(`/upboletodados/${conta.id}`, {
            status: "Registrada",
            data_processamento: registro,
            numero_documento: numDoc?.toString(),
          });
          //console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  useEffect(() => {
    AtualizarDados();
  }, [dados]);

  useEffect(() => {
    upDadosboletos();
  }, [contas]);
  async function handleEmail() {
    const emailAtrasado = contas.filter(
      (contas) => contas.texto_status === "Vencida"
    );
    if (!emailAtrasado) {
      return;
    }
    for (let i = 0; i < emailAtrasado.length; i++) {
      const conta = emailAtrasado[i];
      // Lógica para modificar o status da conta aqui
      setEmailAtrasado(conta.email);
    }
    //console.log("e", emailAtrasado);
  }
  useEffect(() => {
    handleEmail();
  }, [contas]);
  useEffect(() => {
    if (nivel) {
      return;
    }
    if (!nivel && basi) {
      seachBoletoUrl();
    }
  }, [cnpjDig, basi]);
  function AdiantarPagamento() {
    setAdiantar(true);
  }

  async function AtualizarDadosBoleto() {
    if (!emailAtrasado) {
      return;
    }
    const idClienteVencido = boletos.find(
      (boletos) => emailAtrasado === boletos.email
    );
    if (idClienteVencido) {
      //UpdateStateClienteBloqueio(idClienteVencido.cliente_id);
      await api.put(`/upstatusboleto/${idClienteVencido.id}`, {
        status: "Vencida",
      });
      // UpdateStateClienteBloqueio(idClienteVencido.id)
    }
  }
// Busca o usuário parceiro quando estiver com f2b configurado
  // useEffect(() => {
  //   if (idParceiro != 0) {
  //     api.get(`/userparceiroid/${idParceiro}`).then((response) => {
  //       const {
  //         user: [{ id }],
  //       } = response.data;
  //       setUser_id(id);
  //     });
  //   }
  // }, [idParceiro]);
  function setPaginaMais() {
    if (!pagina) {
      setPagina(1);
    }
    if (pagina) {
      const total = pagina + 1;
      setPagina(total);
    }
  }
  function setPaginaMenos() {
    if (!pagina || pagina == 0) {
      return;
    }
    if (pagina) {
      const total = pagina - 1;
      setPagina(total);
    }
  }
  function Pagination(cont: number) {
    if (!pagina) {
      setPagina(1);
    }
    if (pagina) {
      setPaginacao(paginacao + 10);
    }
  }
  function PaginationB() {
    if (!pagina) {
      return;
    }
    if (pagina && paginacao >= 10) {
      setPaginacao(paginacao - 10);
    }
  }
  function PesquisarCnpj() {
    setPCnpj(true);
  }
  useEffect(() => {
    AtualizarDadosBoleto();
  }, [emailAtrasado]);
  function AdiantarCliente() {
    if (adiantar == true) {
      return (
        <div className="md:grid md:grid-cols-12 flex flex-col justify-center items-center border rounded p-4 md:max-w-screen-xl md:ml-16 gap-2">
          {clientes.map((cliente, id) => (
            <div key={id} className="md:flex md:col-span-3">
              <div className="flex justify-center items-center gap-2 uppercase">
                <input type="checkbox" />
                <span>{cliente.n_fantasia}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  function Logged3() {
    if (nivel) {
      return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden sr-only">
            <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-cyan-600">
              Previous
            </a>
            <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-cyan-600">
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
            <div className="ml-24">
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div className="grid-cols-1 w-[100%] ml-24 z-0 mt-4">
                  {(() => {
                    switch (aparecer) {
                      case true:
                        return (
                          <div className="grid grid-cols-12 ">
                            <span className="flex justify-end items-center">
                              <button
                                onClick={() => {
                                  setPaginaMenos();
                                  // setBloq(true);
                                  PaginationB();
                                }}
                              >
                                <CaretLeft size={24} />
                              </button>
                            </span>
                            {Array.from(Array(pages), (item, index) => {
                              return (
                                <button
                                  className="border py-1.5 px-2 rounded-sm hover:text-red-600"
                                  value={index}
                                  onClick={() => {
                                    setCurrentPage(index);
                                  }}
                                >
                                  {index + paginacao}
                                </button>
                              );
                            })}
                            <span className="flex justify-star items-center">
                              <button
                                onClick={() => {
                                  setPaginaMais();
                                  // setBloq(true);
                                  Pagination(10);
                                  // setCont(cont + 1);
                                }}
                              >
                                <CaretRight size={24} />
                              </button>
                            </span>
                          </div>
                        );
                    }
                  })()}
                </div>
              </nav>
            </div>
          </div>
        </div>
      );
    }
  }
  function Logged4() {
    if (nivel == "1") {
      return (
        <div className="flex border-t m-3 p-3">
          <div className="flex flex-col ml-40">
            <h2 className="text-xl">
              Quantidade de Boletos Gerados e Enviados
            </h2>
            <label className="flex flex-col mb-3 mr-2">
              Mês que foi enviado para o cliente:
              <select
                id="mes"
                name="mes"
                className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold appearance-none"
                value={mesvenc}
                onChange={(e) => {
                  setMesVenc(e.target.value);
                }}
                aria-required
                required={true}
                title="É necessário definir o mês para consultar a quantidade de boletos."
              >
                <option>Mês de Envio</option>
                <option value="01">Janeiro</option>
                <option value="02">Fervereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </label>

            <label className="flex flex-col mb-3 ">
              Ano que foi enviado o boleto:
              <select
                id="data_pag"
                name="data_pag"
                className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold appearance-none"
                value={anovenc}
                onChange={(e) => {
                  setAnoVenc(e.target.value);
                }}
                aria-required
                required={true}
                title="É necessário definir o ano para consultar a quantidade de boletos"
              >
                <option>Ano da Cobrança</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
                <option value="2033">2033</option>
                <option value="2034">2034</option>
              </select>
            </label>
            <label htmlFor="" className="mt-3 mb-2 uppercase">
              Total Geral de Boletos Enviados Para os Clientes:{" "}
              <input value={qtd} className="bg-gost w-20 py-2 px-2" />
            </label>
            <label htmlFor="" className="uppercase">
              Quantidade de Boletos Enviados no mês de {mesRef}:
              <input
                value={qtdmes}
                className="mr-2 w-20 py-2 px-2 rounded bg-gost"
              />
            </label>
          </div>
        </div>
      );
    }
  }
  function LoggedUrl() {
    if (nivel) {
      return (
        <div className="flex flex-col w-full">
          <div className="flex flex-col ml-[164px] gap-2 border p-2 w-72 rounded">
            <h2>Selecione a opção de consulta</h2>
            <div className="flex gap-2">
              <label htmlFor="">
                <input
                  type="checkbox"
                  title="Pesquise por razão social"
                  onChange={() => setPCnpj(false)}
                />{" "}
                Razão Social
              </label>
              <label htmlFor="">
                <input
                  type="checkbox"
                  title="Pesquise por razão social"
                  onChange={() => setPCnpj(true)}
                />{" "}
                CNPJ
              </label>
            </div>
          </div>
          {(() => {
            switch (pCnpj) {
              case true:
                return (
                  <div className="flex items-center justify-center w-full pb-4 mt-1">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-1 w-[70%]">
                      <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlass
                          size={16}
                          weight="light"
                          className="z-50 font-bold cursor-pointer outline-none"
                        />
                      </button>
                      <input
                        type="text"
                        id="consulta"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[100%] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                        placeholder="Digite o CNPJ do cliente."
                        value={cn}
                        onChange={(event) => setCn(event.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => seachBoleto()}
                      className="bg-cyan-900 w-28 rounded py-3 text-write ml-2"
                    >
                      Pesquisar
                    </button>
                  </div>
                );
              case false:
                return (
                  <div className="flex items-center justify-center w-full pb-4 mt-1">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-1 w-[70%]">
                      <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlass
                          size={16}
                          weight="light"
                          className="z-50 font-bold cursor-pointer outline-none"
                        />
                      </button>
                      <input
                        type="text"
                        id="consulta"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[100%] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                        placeholder="Digite a Razão Social do cliente."
                        value={cn}
                        onChange={(event) => setCn(event.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => seachBoletoNome()}
                      className="bg-cyan-900 w-28 rounded py-3 text-write ml-2"
                    >
                      Pesquisar
                    </button>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full pb-4 mt-1 sr-only">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 w-[70%]">
            <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlass
                size={16}
                weight="light"
                className="z-50 font-bold cursor-pointer outline-none"
              />
            </button>
            <input
              type="text"
              id="consulta"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[100%] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Digite o CNPJ do cliente"
              value={cnpj}
              onChange={(event) => setCnpjDig(event.target.value)}
            />
          </div>
          {/* <button
            onClick={() => seachBoletoUrl()}
            className="bg-cyan-900 w-28 rounded py-3 text-write ml-2"
          >
            Pesquisar
          </button> */}
        </div>
      );
    }
  }
  function Logged() {
    if (nivel == 1) {
      return (
        <div className="flex flex-col">
          <h2 className="sr-only">
            Escolha os filtros para consultar os boletos
          </h2>
          <label htmlFor="" className="flex gap-1 sr-only">
            <input
              id="parceiro"
              type="checkbox"
              title="Escolher o parceiro antes de consultar e enviar os boletos"
              aria-required
              required
            />
            Periódo
          </label>
          <label htmlFor="" className="flex flex-col ml-44 text-xs">
            Filtrar
            <select
              className="h-10 w-32 border font-light border-cyan-900 rounded outline-none px-2 appearance-none"
              value={cod_status}
              onChange={(e) => {
                setCod_status(e.target.value);
              }}
            >
              <option value={"1"}>Em Aberto</option>
              <option value={"2"}>Paga</option>
              <option value={"3"}>Cancelada</option>
              <option value={"90"}>Vencida</option>
            </select>
          </label>

          <div className="gap-2 md:ml-44">
            <Button
              onClick={() => {
                contasReceberClientes();
                setAparecer(true);
              }}
              className="text-center bg-cyan-700 font-bold "
              title="Boletos enviados F2b"
            >
              Pesquisar
            </Button>

            <Link to="/agendamentos" className="sr-only">
              <Button
                className="bg-cyan-900 font-bold"
                title="Agendados para o enviar para o cliente"
              >
                Agendamentos F2B
              </Button>
            </Link>
            <Link to="/geratodosboletos">
              <Button
                className="font-bold"
                title="Faltando enviar para os clientes"
              >
                Montar Boletos
              </Button>
            </Link>
          </div>
          <div className="md:grid md:grid-cols-1 flex md:ml-44 flex-col rounded p-1 md:max-w-screen-xl gap-2">
            <h3 className="mb-2 mt-3 text-md">
              Escolha o parceiro para gerar seus boletos
            </h3>
            <table className="mb-2 w-[80%]">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {parceiro.map((parceiro, id) => (
                  <tr key={id}>
                    <td>
                      {" "}
                      <input
                        id="parceiro"
                        type="checkbox"
                        name="parceiro"
                        value={parceiro.id}
                        onChange={(e) => {
                          setIdParceiro(parceiro.id);

                          //localStorage.setItem("mespag", e.target.value);
                        }}
                        title="Escolher o parceiro antes de consultar e enviar os boletos"
                        aria-required
                        required
                      />
                    </td>
                    <td>
                      <span className="text-md uppercase w-full gap-2">
                        {parceiro.nome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (nivel == 1) {
      return (
        <div className="flex items-center justify-center ml-24">
          <Link to="#" onClick={contasReceberClientesParceiro}>
            <Button
              role="presentation"
              onClick={AtualizarDadosBoleto}
              className=" text-center"
            >
              Pesquisar
            </Button>
          </Link>
        </div>
      );
    } else if (nivel == 2) {
      return (
        <div className="flex flex-col items-center justify-center ml-44 gap-3">
          <div className="flex gap-2">
            <div className="flex items-center justify-center gap-2">
              <Link to="/geratodosboletos">
                <Button className="font-bold">Montar Boletos</Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link to="/boletosclientesparceiro">
                <Button className="font-bold">Adiantar Boletos</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (nivel == 3) {
      return (
        <div className="flex items-center justify-center ml-24 gap-3">
          <Link to="/geratodosboletos">
            <Button className="font-bold">Montar Boletos</Button>
          </Link>
        </div>
      );
    }
  }
  return (
    <div className="flex w-full justify-center items-center mt-0 ml-32 text-cyan-900">
      <div className="w-full overflow-x-auto shadow-sm sm:align-baseline">
        <div className="sm:flex justify-between items-center py-1 bg-white px-7 dark:bg-gray-800 sm:rounded-sm">
          <div className="sm:justify-center">
            <HeaderClient />
          </div>
        </div>
        <div className="ml-44 text-2xl font-bold">
          <h2 className="flex">Boletos Enviados para os Clientes</h2>
        </div>
        <nav
          className="mt-0 mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          {Logged()}
        </nav>

        <div className="flex items-center justify-center w-full pb-4 mt-1">
          {/* <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 w-[70%]">
            <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlass
                size={16}
                weight="light"
                className="z-50 font-bold cursor-pointer outline-none"
              />
            </button>
            <input
              type="text"
              id="consulta"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[100%] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Digite seu CNPJ"
              value={cnpjDig}
              onChange={(event) => setCnpjDig(event.target.value)}
            />
          </div>
          <button
            onClick={() => seachBoleto()}
            className="bg-cyan-900 w-28 rounded py-3 text-write ml-2"
          >
            Pesquisar
          </button> */}
          {LoggedUrl()}
        </div>

        <table className="w-full max-w-[95%] mt-3 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 border-b-2">
            <tr>
              <th scope="col"></th>
              <th scope="col" className="flex px-3">
                CNPJ
              </th>

              <th scope="col" className="pr-72">
                Nome
              </th>

              <th className="">Referente</th>
              <th className="px-3">Vencimento</th>
              <th className="px-6">Status</th>

              <th scope="col" className="px-10">
                <span>Ações</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {currentItens.map((contas, id) => (
              <tr
                key={id}
                data-success={contas.texto_status === "Vencida"}
                data-danger={contas.texto_status === "Paga"}
                data-primary={contas.texto_status === "Registrada"}
                data-secondary={contas.texto_status === "Cancelada"}
                className={`bg-write border-b data-[success=true]:text-red-500 data-[danger=true]:text-green-500 data-[primary=true]:text-cyan-900 data-[secondary=true]:text-orange`}
              >
                <td className="sr-only">
                  <input type="text" />
                </td>
                <td>
                  <div className="flex items-center px-3">
                    <span>{contas.cnpj}</span>
                  </div>
                </td>
                <td className="px-6 uppercase font-bold">
                  <span>{contas.nome}</span>
                  <br />
                  <span className="font-light lowercase">{contas.email}</span>
                </td>

                <td className="px-6 opacity-95">{contas.demonstrativo_1}</td>
                <td className="px-4">
                  {contas.data_vencimento}
                  <br />
                  <span className="font-bold">{contas.texto_valor}</span>
                </td>
                <td className="text-lg font-bold px-4">
                  {(() => {
                    switch (contas.texto_status) {
                      case "Registrada":
                        return <span>Em aberto</span>;
                      case "Vencida":
                        return <span>{contas.texto_status}</span>;
                      case "Paga":
                        return <span>{contas.texto_status}</span>;
                      case "Cancelada":
                        return <span>{contas.texto_status}</span>;
                      default:
                        return null;
                    }
                  })()}
                </td>

                <td className="flex justify-center items-center mb-3 gap-2">
                  <a href={contas.url_cobranca} target="_blank">
                    <Button
                      id="segundavia"
                      name="segundavia"
                      className="bg-cyan-900 w-28 rounded py-3 text-write"
                      onClick={segundaVia}
                      title="Click aqui para vizualizar a segunda-via do boleto"
                    >
                      Segunda-via
                    </Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Siderbar />
        {Logged3()}
        {Logged4()}
      </div>
    </div>
  );
}
