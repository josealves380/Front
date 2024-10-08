import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowFatLineUp,
  ArrowsCounterClockwise,
  Bank,
  CaretLeft,
  CaretRight,
  CurrencyCircleDollar,
  Eye,
  Gear,
  Globe,
  HeartBreak,
  Key,
  LockSimple,
  LockSimpleOpen,
  MagnifyingGlass,
  Pencil,
  WifiSlash,
  Wrench,
  X,
} from "phosphor-react";
import axios from "axios";
import moment from "moment";
import { api } from "../services/api";

//import { f2b } from "../services/f2b";

//import { contasProps } from "./ContasAPagar";

import { ClienteBasic } from "./ClienteBasic";
import { ClientesProps } from "../types/ClientesProps";
import CadastrarClienteF2b from "./CadastrarClienteF2b";
import { UpdateStateCliente } from "./UpdateStateCliente";
import { UpdateStateGeraBoleto } from "./UpdateGeraBoleto";
import { UpdateStateClienteGera } from "./UpdateStateClienteGera";
import { UpdateStateClienteBloqueio } from "./UpdateStateClienteBloqueio";
//import { clienteAtrasadoProps } from "../types/ClientesAtrasadosProps";
//import { CalculateTotalAPagar } from "./CalculateTotalAPagar";

export function PesquisaClient() {
  // const [clienteAtrasado, setClienteAtrasado] = useState<
  //   clienteAtrasadoProps[] | null
  // >([]);
  const [busca, setBusca] = useState<ClientesProps[]>([]);
  //console.log("clientes busca", busca);
  const [data_status, setData_status] = useState("");
  let datas = parseInt(data_status.substring(8, 10));
  const [clienteAtivo, setCLienteAtivo] = useState(false);
  const [apareceer, setAparecer] = useState(false);

  const [salarioAtual, setSalarioAtual] = useState("");
  const [contraChave, setContraChave] = useState("");
  const [consulta, setConsulta] = useState("");
  const [pagina, setPagina] = useState<number | null>();
  //console.log("pagina", pagina);
  const [data_pag, setData_pag] = useState("");
  const [validade, setValidade] = useState("");
  const [datapag, setDatapag] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [chave, setChave] = useState("");
  const [nivel, setNivel] = useState();
  const [cnpj, setCnpj] = useState("");
  const [url, setUrl] = useState("");
  const [bloq, setBloq] = useState(false);
  console.log(bloq);
  const [multa, setMulta] = useState("2");
  const [juros, setJuros] = useState("0.33");
  const [basic, setBasic] = useState("");
  const [nova, setNova] = useState("");

  const [count, setCount] = useState<number>();
  //console.log("count",count);
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  //console.log("b", clienteAtrasado);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  //console.log("curr", currentPage);

  const [clienteId, setClienteId] = useState<string[]>([]);
  const [n_panginas, setN_paginas] = useState(0);
  //console.log(n_panginas);

  const [pag_atual, setPag_atual] = useState(0);
  const [paginacao, setPaginacao] = useState(1);
  const [pg, setPg] = useState(0);
  //console.log(pg);
  const [cont, setCont] = useState(1);
  //console.log("cont", cont);
  //console.log("id", clienteId);
  //console.log("soma produtos", valores);

  const userId = localStorage.getItem("Id");
  const ativoid = localStorage.getItem("ativo");
  const pages = Math.ceil(busca.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = busca.slice(startIndex, endIndex);

  useEffect(() => {
    if (count) {
      const numeroPag = Math.floor(count / 100);
      setPg(numeroPag);
    }
  }, [count]);

  useEffect(() => {
    if (ativoid) {
      setNova(ativoid);
    }
  }, [ativoid]);
  useEffect(() => {
    if (n_panginas) {
      const p_atual = Math.ceil(n_panginas / 20);
      setPag_atual(p_atual);
    }
  }, [n_panginas]);

  function PaginaAtual() {
    const c = cont + 1;

    setCont(c);
  }
  function PaginaAtualB() {
    if (pag_atual > 0) {
      const pg = pag_atual - 1;
      setPag_atual(pg);
    }
  }

  function Pagination(cont: number) {
    if (pg === cont) {
      alert("Fim da lista de clientes");
    }
    if (pg >= cont) {
      if (pagina && paginacao >= 1) {
        const p = paginacao + 10;
        setPaginacao(p);
        setPagina(p + 90 + pagina);
      }
    }
  }
  function PaginationB() {
    if (paginacao >= 10 && pagina) {
      const p = paginacao - 10;
      setPaginacao(p);
      setPagina(p - 90 - pagina);
    }
  }
  // useEffect(() => {
  //   api.get("/boletosvencidos").then((response) => {
  //     const boletoVencido = response.data;
  //     setClienteAtrasado(boletoVencido);
  //   });
  // }, []);
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);

  useEffect(() => {
    api
      .post(`/clientesearch`, {
        consulta,
      })
      .then((response) => {
        setBusca(response.data);
        setBloq(false);
      });
  }, [consulta]);

  // função para recarregar a página sem reload
  // useEffect(() => {
  //   if(consulta != ""){
  //     return
  //   }

  //   if(!consulta){
  //     //Implementing the setInterval method
  //     const interval = setInterval(() => {
  //       api.get(`/cliente`).then((response) => {
  //         setBusca(response.data);
  //       });
  //     }, 1000);
  //     //Clearing the interval
  //     return () => clearInterval(interval);

  //   }
  // }, []);
  useEffect(() => {
    const apiData = async () => {
      await api.get(`/cliente`).then((response) => {
        setBusca(response.data);
        //console.log(response.data);
        const [{ data_pag }] = response.data;
        const [{ ativo }] = response.data;
        //const [{ bloqueado }] = response.data;
        //setBloqueado(bloqueado);
        setCLienteAtivo(ativo);
        setDatapag(data_pag);
      });
    };
    apiData();
  }, []);

  useEffect(() => {
    api.get(`/clientecountall`).then((response) => {
      const total = response.data;
      setCount(total);
    });
  }, []);
  useEffect(() => {
    if (bloq == false) {
      return;
    }
    if (bloq == true) {
      const interval = setInterval(() => {
        api
          .post(`/clienteporpagina`, {
            pagina,
          })
          .then((response) => {
            setBusca(response.data);
            //console.log(response.data);
            const [{ data_pag }] = response.data;
            const [{ ativo }] = response.data;
            //const [{ bloqueado }] = response.data;
            //setBloqueado(bloqueado);
            setCLienteAtivo(ativo);
            setDatapag(data_pag);
          });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pagina, bloq]);
  useEffect(() => {
    if (bloq == false) {
      return;
    }
    if (bloq == true) {
      const interval = setInterval(() => {
        setBloq(false);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [bloq == true]);
  useEffect(() => {
    api.get(`/qativacao`).then((response) => {
      const [{ data_status }] = response.data;
      setData_status(data_status);
    });
  }, []);
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ salario }] = response.data;
      setSalarioAtual(salario);
    });
  }, []);
  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month"));
    setAno(agora.year());
  }, []);

  /////Função para bloqueio automatico de clientes

  // function UpdateValorMensal(){
  //   busca.map((busca,id )=>{
  //     const sal = parseFloat(perc) * parseFloat(salarioAtual)
  //     api.patch(`/editavalormensal/${id}`,{
  //       valor_mensal: sal
  //     })
  //   })
  // }
  // function clientebloqueio() {
  //   const clientes = clienteAtrasado?.filter(
  //     (clienteAtrasado) => clienteAtrasado.status === "Vencida"
  //   );
  //   if (!clientes) {
  //     return;
  //   }
  //   for (let i = 0; i < clientes.length; i++) {
  //     const cliente = clientes[i];
  //     setClienteUp(cliente.cliente_id);

  //     if (cliente.Cliente.bloqueado == false) {
  //       UpdateStateClienteBloqueio(cliente.cliente_id);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   if (clienteAtrasado) {
  //     clientebloqueio();
  //   }
  // }, [clienteAtrasado]);

  // const meuCallback = useCallback(() => {
  //   function clienteBloq() {
  //     if (!clienteUp) {
  //       return;
  //     }
  //     const client = busca.find((busca) => busca.bloqueado === false);
  //     if (!client) {
  //       return;
  //     }
  //   }
  //   clienteBloq();
  // }, []);
  // meuCallback();

  function clientesAtivos() {
    if (ativo == true) {
      if (
        (datas < parseInt(datapag) && mes == 1) ||
        mes == 3 ||
        mes == 5 ||
        mes == 7 ||
        mes == 8 ||
        mes == 10 ||
        mes == 12
      ) {
        const cont = 31 - parseInt(datapag) + dia;
        //console.log("Os dias ativos no sistema são", cont);
        const total = (cont * (40 / 30)).toFixed(2);
      }
      if (
        (datas < parseInt(datapag) && mes == 4) ||
        mes == 6 ||
        mes == 9 ||
        mes == 11
      ) {
        const cont = 30 - parseInt(datapag) + dia;

        const total = (cont * (40 / 30)).toFixed(2);
      } else if (datas < parseInt(datapag) && mes == 2) {
        const cont = 28 - parseInt(datapag) + dia;

        const total = (cont * (40 / 30)).toFixed(2);
      } else {
        const cont = datas - parseInt(datapag);
        const total = (cont * (40 / 30)).toFixed(2);
      }
    }
  }
  {
    clientesAtivos();
  }

  async function gravaData(id: number) {
    if (ativo == true) {
      const datativacao = api.post(`/qativacao/${id}/1`);
      return datativacao;
    }
  }
  async function gravaDataDesativado(id: number) {
    if (ativo == true) {
      const datativacao = api.post(`/qativacao/${id}/2`);
      //console.log("desativado",datativacao)
      return datativacao;
    }
  }
  function handleInputChange(id: number) {
    if (id != null) {
      setAtivo(!ativo);
      const idC = id.toString();
      localStorage.setItem("idCliente", idC);
    } else {
    }
  }

  const handleGerarChave = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    let contra = gerar(validade, chave, cnpj);
    setContraChave(contra);
    function gerar(validade: string, chave: string, cnpj: string) {
      validade = !validade ? "0" : validade;
      validade = validade.padStart(3, "0");
      chave = chave.substr(1, 9);

      let vi = decChave(chave);

      let vl: string;
      switch (vi.substr(4, 1)) {
        case "0":
          vl = "9K";
          break;
        case "1":
          vl = "8O";
          break;
        case "2":
          vl = "7D";
          break;
        case "3":
          vl = "6A";
          break;
        case "4":
          vl = "5B";
          break;
        case "5":
          vl = "4J";
          break;
        case "6":
          vl = "3C";
          break;
        case "7":
          vl = "2M";
          break;
        case "8":
          vl = "1L";
          break;
        case "9":
          vl = "0T";
          break;
      }
      let vhora = vi.substr(0, 2);
      //console.log(vhora)
      let vdata = vi.substr(2, 2);
      //console.log(vdata)
      let vcnpj = cnpj.substr(1, 1) + cnpj.substr(12, 1);
      //console.log(vcnpj)
      let campoSaida = gerarChave(
        vhora + vdata + vi.substr(4, 1) + validade + vi.substr(0, 1) + vcnpj
      );
      //console.log(campoSaida)
      let campo = gerarChave(campoSaida);
      return campo;
    }
  }, []);
  function decChave(chave: string) {
    const branco = chave;
    // console.log("branco",branco)

    const tamanho = chave.length;
    //console.log(tamanho)

    const vnormal = "WQREYTIUPOSAFDHGKJZLCXBVMN3142859067";
    const vcripto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let wresultado = "";
    for (let i = 0; i < tamanho; i++) {
      const wposicao = vnormal.indexOf(branco.substr(i, 1));
      //console.log( wposicao )

      // const wposicao = vnormal.indexOf(branco.substring(i, 1))
      // console.log("wposição", wposicao)
      wresultado += vcripto.substr(wposicao, 1);
    }
    return wresultado;
  }

  function gerarChave(chave: string) {
    const branco = chave;
    //console.log(chave)
    const tamanho = chave.length;
    //console.log("tamanho", tamanho)
    const vnormal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const vcripto = "WQREYTIUPOSAFDHGKJZLCXBVMN3142859067";

    let wresultado = "";
    for (let i = 0; i < tamanho; i++) {
      //console.log(i)
      let wposicao = vnormal.indexOf(branco.substr(i, 1));
      //console.log(wposicao)
      wresultado += vcripto.substr(wposicao, 1);
      //console.log("resultado", wresultado)
    }
    return wresultado;
  }
  function contasReceberClientes(email: string) {
    localStorage.setItem("emailboleto", `${email}`);
  }
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });

  function setPaginaMais() {
    if (!pagina) {
      setPagina(1);
    }
    if (pagina) {
      const total = pagina + 10;
      setPagina(total);
    }
  }

  function setPaginaMenos() {
    if (!pagina || pagina == 0) {
      return;
    }
    if (pagina > 10) {
      const total = pagina - 10;
      setPagina(total);
    }
    if (pagina == 1) {
      const total = pagina - 1;
      setPagina(total);
    } else {
    }
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setClienteId([...clienteId, checkboxId]);
    } else {
      setClienteId(clienteId.filter((id) => id !== checkboxId));
    }
  };

  function handleBloqueioClienteSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        UpdateStateClienteBloqueio(parseInt(clienteId));
      }
    });
    setClienteId([]);
  }
  function handleDesativaClienteSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        UpdateStateCliente(parseInt(clienteId));
        gravaDataDesativado(parseInt(clienteId));
      }
    });
    setClienteId([]);
  }
  function handleAtivaClienteSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        UpdateStateCliente(parseInt(clienteId));
        gravaData(parseInt(clienteId));
      }
    });
    setClienteId([]);
  }
  function handleGeraOnlineClienteSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        UpdateStateClienteGera(parseInt(clienteId));
      }
    });
    setClienteId([]);
  }
  function handleBloqueiaGeraBoletoClienteSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        UpdateStateGeraBoleto(parseInt(clienteId));
      }
    });
    setClienteId([]);
  }
  function handleAcessoAosBoletosClientesSelecionados() {
    clienteId.map((clienteId) => {
      if (clienteId) {
        ClienteBasic(basic, parseInt(clienteId));
      }
    });
    alert("Liberado o acesso dos clientes aos boletos");
    setClienteId([]);
  }
  useEffect(() => {
    setCurrentPage(0);
  }, [itensPerPage]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-cyan-900">
      <div className="flex items-center justify-center w-full pb-4 mt-20">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-10 w-[90%]">
          <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass
              size={16}
              weight="light"
              className="z-50 font-bold"
            />
          </button>
          <input
            type="text"
            id="consulta"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[100%] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0"
            placeholder="Procurar Clientes"
            value={consulta}
            onChange={(event) => setConsulta(event.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th scope="col" className="">
              <div className="flex items-end  justify-end sr-only">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  title="Selecione todos os clientes para realizar ações em conjunto"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>

            <th scope="col" className="md:px-2 py-3">
              Razão Social / CNPJ
            </th>
            <th scope="col" className="px-2 py-3">
              Nome Fantasia
            </th>
            <th scope="col" className="px-2 py-3">
              Cidade
            </th>
            <th scope="col" className="px-2 py-3">
              Contato
            </th>

            <th scope="col" className="px-6 py-3">
              Parceiro
            </th>
            <th scope="col" className="px-44 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map((busca, id) => (
            <tr
              key={id}
              className={`bg-write border-b ${
                busca.ativo == false ? "text-red-500" : " text-cyan-900"
              } ${
                busca.bloqueado == true ? " text-orange " : "  text-cyan-900"
              }`}
            >
              <td className="w-4">
                <div className="flex items-center justify-center ml-16">
                  <input
                    id={busca.id.toString()}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    onClick={() => setAparecer(true)}
                    className="w-4 h-4 border border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <td className="max-w-sm md:px-2 py-4">
                <span className="font-bold uppercase">{busca.rz_social}</span>
                <br />
                <span>{busca.cnpj}</span>
              </td>

              <td className="flex flex-col px-2 py-4 max-w-sm">
                <span className="font-bold uppercase">{busca.n_fantasia}</span>
                <span>{busca.email}</span>
              </td>

              <td className="px-2 py-4 uppercase">
                {busca.cidade}-{busca.uf}
              </td>
              <td className="flex flex-col px-2 py-4">
                <span className="uppercase">{busca.name}</span>
                <span>{busca.telefone}</span>
              </td>
              <td className="px-6 py-4 uppercase">{busca.paceiro.nome}</td>
              <td className="px-6 py-4">
                <form className="flex gap-1">
                  {(() => {
                    switch (busca.ativo) {
                      case true:
                        return (
                          <Link to={"/geraboletos"}>
                            <button
                              className="bg-opacity-90 rounded px-1 p-2 bg-cyan-900"
                              title="Gerar boleto"
                              onClick={() => {
                                handleInputChange(busca.id);
                              }}
                            >
                              <Bank
                                size={24}
                                weight="light"
                                className="text-write"
                              />
                            </button>
                          </Link>
                        );

                      default:
                        return null;
                    }
                  })()}
                  {/* {(() => {
                    
                          <Link to={"/geraboletos"}>
                          <button
                            className="bg-opacity-90 rounded px-1 p-2 bg-cyan-900"
                            title="Gerar boleto"
                            onClick={() => {
                              handleInputChange(busca.id);
                            }}
                          >
                            <Bank
                              size={24}
                              weight="light"
                              className="text-write"
                            />
                          </button>
                        </Link>
                          );
                          case false:
                        return (
                          <button>x</button>
                        )

                      default:
                        return null;
                    }
                  })()} */}
                  <button
                    type="button"
                    className="bg-opacity-95 bg-cyan-900 rounded px-1 p-2"
                    title="Cadastrar Cliente Na F2B"
                    onClick={() => {
                      CadastrarClienteF2b(
                        busca.rz_social,
                        busca.email,
                        busca.endereco,
                        busca.numero,
                        busca.ibge,
                        busca.bairro,
                        busca.cidade,
                        busca.uf,
                        busca.cep,
                        busca.cnpj
                      );
                    }}
                  >
                    <ArrowFatLineUp size={24} className="text-write" />
                  </button>
                  <Link to={"/vercliente"}>
                    <button
                      type="button"
                      data-modal-toggle="editUserModal"
                      className="font-normal hover:underline bg-green-500 text-write rounded px-1 p-2 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                      title="Ver dados do cliente"
                      onClick={() => {
                        handleInputChange(busca.id);
                      }}
                    >
                      <Eye size={24} weight="light" />
                    </button>
                  </Link>
                  {(() => {
                    switch (busca.ativo) {
                      case false:
                        return (
                          <button
                            type="button"
                            name="update-ativo"
                            id="botao_ativar"
                            value={busca.id}
                            onClick={() => {
                              UpdateStateCliente(busca.id);
                              gravaData(busca.id);
                              setBloq(true);
                            }}
                            data-modal-toggle="editUserModal"
                            className="  text-write font-thin hover:underline bg-red-600 p-1 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Ativar cliente"
                          >
                            <HeartBreak size={24} weight="light" />
                          </button>
                        );
                      case true:
                        return (
                          <Link
                            to={"/gravarf2b"}
                            onClick={() => gravaDataDesativado(busca.id)}
                          >
                            <button
                              type="button"
                              name="update-desativado"
                              id="botao_desativar"
                              value={busca.id}
                              onClick={() => {
                                UpdateStateCliente(busca.id);
                                setBloq(true);
                              }}
                              data-modal-toggle="tooltip"
                              data-te-html="true"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="font-normal text-write  hover:underline bg-green-500 px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                              title="Desativar cliente "
                            >
                              {" "}
                              <X size={24} weight="light" />
                            </button>
                          </Link>
                        );
                      default:
                        return null;
                    }
                  })()}
                  {(() => {
                    switch (busca.bloqueado) {
                      case false:
                        return (
                          <button
                            name="bloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteBloqueio(busca.id);
                              setBloq(true);
                            }}
                            className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Bloqueiar cliente"
                          >
                            <LockSimpleOpen size={24} weight="light" />
                          </button>
                        );
                      case true:
                        return (
                          <button
                            name="desbloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteBloqueio(busca.id);
                              setBloq(true);
                            }}
                            className="font-thin text-xs text-write bg-red-600 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Desbloqueiar cliente"
                          >
                            <LockSimple size={24} weight="light" />
                          </button>
                        );
                    }
                  })()}

                  {(() => {
                    switch (busca.gera_online) {
                      case false:
                        return (
                          <button
                            name="bloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteGera(busca.id);
                              setBloq(true);
                            }}
                            className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Bloqueiar gerar chave on-line"
                          >
                            <Globe size={24} weight="light" />
                          </button>
                        );
                      case true:
                        return (
                          <button
                            name="desbloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="tooltip"
                            data-te-html="true"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => {
                              UpdateStateClienteGera(busca.id);
                              setBloq(true);
                            }}
                            className="font-thin text-xs text-write bg-red-600 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Ativar chave on-line"
                          >
                            <WifiSlash size={24} weight="light" />
                          </button>
                        );
                    }
                  })()}
                  {(() => {
                    switch (busca.geraBoleto) {
                      case true:
                        return (
                          <button
                            name="bloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateGeraBoleto(busca.id);
                              setBloq(true);
                            }}
                            className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Bloqueiar gerar boletos"
                          >
                            <ArrowsCounterClockwise size={24} weight="light" />
                          </button>
                        );
                      case false:
                        return (
                          <button
                            name="desbloqueio"
                            type="button"
                            id="bloqueio"
                            data-modal-toggle="tooltip"
                            data-te-html="true"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => {
                              UpdateStateGeraBoleto(busca.id);
                              setBloq(true);
                            }}
                            className="font-thin text-xs text-write bg-red-600 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Ativar para gerar boletos"
                          >
                            <ArrowsCounterClockwise size={24} weight="light" />
                          </button>
                        );
                    }
                  })()}
                  {/* <button
                        type="button"
                        data-modal-toggle="editUserModal"
                        className="font-normal hover:underline bg-orange text-write rounded px-1 p-2 tracking-wider"
                        onClick={() => {
                          handleInputChange(busca.id);
                        }}
                      >
                        
                       <Key size={24} weight="light"/>
                      </button> */}
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        data-modal-toggle="editUserModal"
                        className="font-normal hover:underline bg-orange text-write rounded px-1 p-2 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                        title="Gerar chave on-line"
                        onClick={() => {
                          handleInputChange(busca.id);
                        }}
                      >
                        <Key size={24} weight="light" />
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal accessKey="id">
                      <Dialog.Overlay className="w-full inset-0 fixed" />

                      <Dialog.Content className="text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                        <div
                          id="editUserModal"
                          tabIndex={1}
                          aria-hidden="true"
                          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full sm:rounded-sm"
                        >
                          <div className="relative w-full max-w-2xl h-full md:h-auto">
                            {/* <!-- Modal content --> */}
                            <form className="relative bg-cyan-900  rounded-lg shadow dark:bg-cyan-700">
                              {/* <!-- Modal header --> */}
                              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-write dark:text-white">
                                  Gerando contra chave
                                </h3>
                                <button
                                  type="button"
                                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  data-modal-toggle="editUserModal"
                                >
                                  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>   */}
                                </button>
                              </div>
                              {/* <!-- Modal body --> */}

                              <div className="p-6 space-y-3">
                                <div className="col-span-3 sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="flex mb-2 text-sm font-medium text-write"
                                  >
                                    Cliente
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required={true}
                                    defaultValue={busca.rz_social}
                                  />
                                </div>
                                <div className="col-span-3 sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="flex mb-2 text-sm font-medium text-write"
                                  >
                                    CNPJ
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required={true}
                                    defaultValue={busca.cnpj}
                                    onChange={(event) =>
                                      setCnpj(event.target.value)
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="first-name"
                                      className="flex mb-2 text-sm font-medium text-gray-90 text-write"
                                    >
                                      Chave gerada pelo SIAD
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      defaultValue={chave}
                                      onChange={(event) =>
                                        setChave(event.target.value)
                                      }
                                      required={true}
                                    />
                                    <span className="mt-2 text-red-500">
                                      É necessário uma chave para continuar
                                    </span>
                                  </div>

                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="email"
                                      className="flex mb-2 text-sm font-medium text-write"
                                    >
                                      Duração (em dias)
                                    </label>
                                    <input
                                      type="number"
                                      name="contra-chave"
                                      id="contra-chave"
                                      max={90}
                                      min={1}
                                      className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-24 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      defaultValue={validade}
                                      onChange={(event) =>
                                        setValidade(event.target.value)
                                      }
                                      required={true}
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="phone-number"
                                      className="flex mb-2 text-sm font-medium text-write"
                                    >
                                      Contra chave
                                    </label>
                                    <input
                                      type="text"
                                      name="telefone"
                                      id="telefone"
                                      className="shadow-sm bg-gray-50 border outline-none border-cyan-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      defaultValue={contraChave}
                                    />
                                  </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                  <button
                                    type="submit"
                                    className="border-none rounded bg-green-500 text-write w-[80%] py-3"
                                    onClick={handleGerarChave}
                                  >
                                    Gerar
                                  </button>
                                  <Dialog.Close asChild>
                                    <button
                                      className="border-none rounded bg-red-600 text-write w-[80%] py-3"
                                      type="submit"
                                    >
                                      sair
                                    </button>
                                  </Dialog.Close>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Link to={"/editclient"}>
                    <button
                      type="button"
                      data-modal-toggle="editUserModal"
                      className="font-normal hover:underline bg-cyan-900 text-write rounded px-1 p-2 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                      title="Editar dados cliente"
                      onClick={() => {
                        handleInputChange(busca.id);
                      }}
                    >
                      <Pencil size={24} weight="light" />
                    </button>
                  </Link>
                  <Link to={"/boletoscliente"}>
                    <button
                      className="bg-opacity-90 rounded px-1 p-2 bg-cyan-900"
                      title="Visualizar boletos do cliente"
                      onClick={() => {
                        contasReceberClientes(busca.cnpj);
                      }}
                    >
                      <CurrencyCircleDollar
                        size={24}
                        weight="light"
                        className="text-write"
                      />
                    </button>
                  </Link>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
          <div className="ml-24">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:outline-offset-0" */}
              <div className="flex flex-col justify-center items-start gap-2 ">
                <div className="flex ml-32">
                  <label htmlFor="" className="flex flex-col">
                    Clientes por Página
                    <select
                      className="border py-1.5 rounded-sm outline-none appearance-none px-2"
                      title="Selecione a quuantidade de clientes para vizualição nesta página"
                      value={itensPerPage}
                      onChange={(e) => {
                        setItensPerPage(Number(e.target.value));
                        setBloq(true);
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </label>
                </div>

                <div className="grid-cols-1 w-[100%] ml-24 z-0 mt-4">
                  <div className="grid grid-cols-12 ">
                    <span className="flex justify-end items-center">
                      <button
                        onClick={() => {
                          setPaginaMenos();
                          setBloq(true);
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
                          setBloq(true);
                          Pagination(cont);
                          setCont(cont + 1);
                        }}
                      >
                        <CaretRight size={24} />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              {(() => {
                switch (apareceer) {
                  case true:
                    return (
                      <div>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button
                              type="button"
                              data-modal-toggle="editUserModal"
                              className="flex md:ml-16 mt-3 gap-2 font-normal z-50 text-cyan-900 rounded py-3 px-4 tracking-wider leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                              title="Realizar ações em todos clientes selecionados"
                            >
                              Ações
                              <Wrench size={24} weight="light" />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal accessKey="id">
                            <Dialog.Overlay className="w-full inset-0 fixed" />

                            <Dialog.Content className="text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                              <div
                                id="editUserModal"
                                tabIndex={1}
                                aria-hidden="true"
                                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full sm:rounded-sm"
                              >
                                <div className="relative w-[50%] max-w-2xl h-full md:h-auto bg-cyan-600 p-4 text-red-900 text-md font-bold">
                                  {/* <!-- Modal content --> */}
                                  <Dialog.DialogTitle>
                                    Atenção ao Realizar as Ações
                                  </Dialog.DialogTitle>
                                  <div className="flex  flex-col justify-center items-center m-4">
                                    <button
                                      onClick={
                                        handleBloqueioClienteSelecionados
                                      }
                                      title="Bloqueia e Desbloquia o Cliente"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <LockSimple size={32} />{" "}
                                    </button>
                                    <button
                                      onClick={
                                        handleDesativaClienteSelecionados
                                      }
                                      title="Desativa o Cliente"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <X size={32} />{" "}
                                    </button>

                                    <button
                                      onClick={handleAtivaClienteSelecionados}
                                      title="Ativa o Cliente"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <HeartBreak size={32} />{" "}
                                    </button>
                                    <button
                                      onClick={
                                        handleGeraOnlineClienteSelecionados
                                      }
                                      title="Bloqueia e permite gerar chave online"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <Globe size={32} />{" "}
                                    </button>
                                    <button
                                      onClick={
                                        handleBloqueiaGeraBoletoClienteSelecionados
                                      }
                                      title="Bloqueia e desbloqueia gerar boleto para o cliente"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <ArrowsCounterClockwise size={32} />{" "}
                                    </button>
                                    <button
                                      onClick={
                                        handleAcessoAosBoletosClientesSelecionados
                                      }
                                      title="Permitir acesso aos clientes selecionados aos boletos"
                                      className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                                    >
                                      <Gear size={32} />{" "}
                                    </button>
                                  </div>
                                  <Dialog.Close asChild>
                                    <button
                                      className="border-none rounded bg-red-600 text-write w-[80%] py-3"
                                      type="submit"
                                    >
                                      sair
                                    </button>
                                  </Dialog.Close>
                                </div>
                              </div>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                      </div>
                    );
                }
              })()}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
