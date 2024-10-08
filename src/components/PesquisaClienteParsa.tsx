import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowsCounterClockwise,
  Bank,
  CurrencyCircleDollar,
  CaretLeft,
  CaretRight,
  Gear,
  Eye,
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
  ArrowFatLineUp,
} from "phosphor-react";
import axios from "axios";
import moment from "moment";
import { api } from "../services/api";
import { Siderbar } from "./SiderBar";

//import { f2b } from "../services/f2b";
import { ClienteBasic } from "./ClienteBasic";
import { ClientesProps } from "../types/ClientesProps";
import CadastrarClienteF2b from "./CadastrarClienteF2b";
import { UpdateStateCliente } from "./UpdateStateCliente";
import { UpdateStateGeraBoleto } from "./UpdateGeraBoleto";
import { UpdateStateClienteGera } from "./UpdateStateClienteGera";
import { UpdateStateClienteBloqueio } from "./UpdateStateClienteBloqueio";
import { clienteAtrasadoProps } from "../types/ClientesAtrasadosProps";

interface ParceiroProps {
  id: number;
  nome: string;
}
export default function PesquisaClienteParsa() {
  const [clienteAtrasado, setClienteAtrasado] = useState<
    clienteAtrasadoProps[] | null
  >([]);
  const [busca, setBusca] = useState<ClientesProps[]>([]);
  const [clienteUp, setClienteUp] = useState<number | null>();

  const [parceirosuporte, setParceirosuporte] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [data_status, setData_status] = useState("");
  let datas = parseInt(data_status.substring(8, 10));
  const [agenda, setAgenda] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [consulta, setConsulta] = useState("");
  //console.log("consulta", consulta);
  const [data_pag, setData_pag] = useState("");
  const [nivel, setNivel] = useState();
  const [validade, setValidade] = useState("");
  const [chave, setChave] = useState("");
  const [contraChave, setContraChave] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [pagina, setPagina] = useState<number | null>();
  const [url, setUrl] = useState("");
  const [basic, setBasic] = useState("");
  const [bloq, setBloq] = useState(false);
  const vlTotal = parseFloat(valorMensal);
  const datainicial = `${data_pag}/${mes + 2}/${ano}`;
  const [parceiro, setParceiro] = useState<number>();
  const [clienteId, setClienteId] = useState<string[]>([]);
  const [count, setCount] = useState<number>();
  const [n_panginas, setN_paginas] = useState(0);
  const [nova, setNova] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [pag_atual, setPag_atual] = useState(1);
  const userId = localStorage.getItem("Id");
  const ativoid = localStorage.getItem("ativo");
  useEffect(() => {
    if (count) {
      const npg = Math.ceil(count / 42);
      setN_paginas(npg);
    }
  }, [count]);

  useEffect(() => {
    if (ativoid) {
      setNova(ativoid);
    }
  }, [ativoid]);
  useEffect(() => {
    if (n_panginas) {
      const p_atual = Math.ceil(n_panginas / 15);
      setPag_atual(p_atual);
    }
  }, [n_panginas]);

  function PaginaAtual() {
    if (pag_atual <= 43) {
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
  useEffect(() => {
    api.get("/boletosvencidos").then((response) => {
      const boletoVencido = response.data;
      setClienteAtrasado(boletoVencido);
    });
  }, []);
  useEffect(() => {
    if (!userId) {
      return;
    }
    if (userId) {
      api.get(`/user/${userId}`).then((response) => {
        const { nivel } = response.data;
        const { parceiro_id } = response.data;
        setParceiro(parceiro_id);
        //console.log(response.data)
        setNivel(nivel);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (!userId) {
      api.get(`/usersuporteparceiro/suporte/${userId}`).then((response) => {
        const [{ parceiro_id }] = response.data;
        setParceirosuporte(parceiro_id);
      });
    }
  }, [userId]);
  useEffect(() => {
    api
      .post(`/parceiro/${parceiro}/cliente`, {
        consulta,
      })
      .then((response) => {
        const [{ cliente }] = response.data;
        setBusca(cliente);
        console.log(cliente);
        //setBloq(false)
      });
  }, [consulta]);
  useEffect(() => {
    if (!parceiro) {
      return;
    }
    if (parceiro) {
      api.get(`/parceiro/${parceiro}/cliente/${parceiro}`).then((response) => {
        const [{ cliente }] = response.data;
        console.log("cliente p", response.data);
        setBusca(cliente);
      });
    }
  }, [parceiro]);

  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month"));
    setAno(agora.year());
  }, []);

  function buscaClientes() {
    api
      .get(`/parceiro/${parceirosuporte}/cliente/${parceirosuporte}`)
      .then((response) => {
        const [{ cliente }] = response.data;
        setBusca(cliente);
        //setBusca(cliente)
      });
  }

  //   const [ {paceiro: {nome}}] = response.data
  //   setParceiro(nome)
  async function gravaData(id: number) {
    if (ativo == true) {
      const datativacao = api.post(`/qativacao/${id}/1`);
      return datativacao;
    }
  }
  async function gravaDataDesativado(id: number) {
    if (ativo == true) {
      const datativacao = api.post(`/qativacao/${id}/2`);
      return datativacao;
    }
  }

  // async function updateStateCliente(id: number) {
  //   document.getElementById("botao_ativar");
  //   addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     //window.parent.location = window.parent.location.href
  //     window.location.reload();
  //   });
  //   try {
  //     const response = await api.put(`/cliente/${id}`);
  //     JSON.stringify({
  //       id: Number,
  //       ativo: true,
  //     });
  //     localStorage.setItem("idCliente", id.toString());
  //   } catch (error) {
  //     alert("algo deu errado");
  //   }
  // }
  async function updateStateClienteBloqueio(id: number) {
    document.getElementById("bloqueio");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/clienteBloqueado/${id}`);
      JSON.stringify({
        id: Number,
        ativo: true,
      });
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  async function updateDadosCliente(event: FormEvent) {
    event.preventDefault();
    window.location.reload();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await api.post("/cliente/update", {
        email: data.email,
        name: data.name,
        cnpj: data.cnpj,
        cidade: data.cidade,
        n_fantasia: data.n_fantasia,
        rz_social: data.rz_social,
        tel_contato: data.tel_contato,
        telefone: data.telefone,
        bairro: data.bairro,
        cep: data.cep,
        endereco: data.endereco,
        uf: data.uf,
        ibge: data.ibge,
        numero: data.numero,
        nome: data.nome,
      });
      alert("Editado");
    } catch (error) {
      alert("Não foi possivel editar os dados");
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
  async function deleteCliente(id: number) {
    document.getElementById("delete");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.delete(`/cliente/${id}`);
      JSON.stringify({
        id: Number,
      });
      alert("Tem certeza que vai excluir esse cliente ");
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }
  async function updateStateClienteGera(id: number) {
    document.getElementById("gera");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/clientegeraOnline/${id}`);
      JSON.stringify({
        id: Number,
        gera_online: true,
      });
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  const hadleGerarChave = useCallback(async (event: FormEvent) => {
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
    console.log(chave);
    const tamanho = chave.length;
    console.log("tamanho", tamanho);
    const vnormal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const vcripto = "WQREYTIUPOSAFDHGKJZLCXBVMN3142859067";

    let wresultado = "";
    for (let i = 0; i < tamanho; i++) {
      console.log(i);
      let wposicao = vnormal.indexOf(branco.substr(i, 1));
      console.log(wposicao);
      wresultado += vcripto.substr(wposicao, 1);
      console.log("resultado", wresultado);
    }
    return wresultado;
  }
  function contasReceberClientes(email: string) {
    f2b
      .get(`/cobrancas/`, {
        params: {
          email_sacado: `${email}`,
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
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  function segundaVia(cnpj: string, email: string) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    f2b
      .get(`/cobrancas/segunda-via`, {
        params: {
          email: `${email}`,
          cpf_cnpj: `${cnpj}`,
        },
      })
      .then(function (response) {
        try {
          const [{ url_cobranca }] = response.data;
          setUrl(url_cobranca);
        } catch (error) {
          console.log(error);
        }
      });
  }

  async function gerarBoleto(n_fantasia: string, email: string) {
    try {
      f2b.post("/cobrancas/", {
        objeto_sacado: [
          {
            nome: `${n_fantasia}`,
            email: `${email}`,
          },
        ],
        data_vencimento: datainicial,
        valor_cobranca: vlTotal,
        demonstrativo: [
          {
            "@type": "item",
            numero_demonstrativo: 1,
            texto_demonstrativo: "Boleto Siad Sistemas",
            qtde_item: 1,
            valor_item: vlTotal,
          },
        ],

        valor_desconto: 0,
        tipo_desconto: 0,
        numero_dias_desconto: 0,
        parcelas_carne: agenda,
        valor_multa: 10,
        tipo_multa: 1,
        valor_mora_dia: 0.1,
        tipo_mora_dia: 0,
        maximo_dias_pagamento: 20,
      });
      //navigate("/boleto");
      console.log("enviado com sucesso");
    } catch (error) {
      console.log("error");
    }
  }
  async function handleMensalidadeCliente(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(`/financeiro/${id}/mensalidade/3/`, {
        valor: parseFloat(valorMensal),
      });
      //alert("criado com sucesso");
      //console.log(response);
      setValorMensal("");
    } catch (error) {
      console.log(error);
      //alert("error");
    }
  }
  function clientebloqueio() {
    const clientes = clienteAtrasado?.filter(
      (clienteAtrasado) => clienteAtrasado.status === "Vencida"
    );
    if (!clientes) {
      return;
    }
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      setClienteUp(cliente.cliente_id);

      if (cliente.Cliente.bloqueado == false) {
        UpdateStateClienteBloqueio(cliente.cliente_id);
      }
    }
  }
  useEffect(() => {
    clientebloqueio();
  }, []);
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setClienteId([...clienteId, checkboxId]);
    } else {
      setClienteId(clienteId.filter((id) => id !== checkboxId));
    }
  };
  function setPaginaMais() {
    if (!pagina) {
      setPagina(2);
    }
    if (pagina) {
      const total = pagina + 15;
      setPagina(total);
    }
  }

  function setPaginaMenos() {
    if (!pagina || pagina == 0) {
      return;
    }
    if (pagina) {
      const total = pagina - 15;
      setPagina(total);
    }
  }
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
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-cyan-900">
      <div className="flex items-center justify-center w-full pb-4 mt-20">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-10 w-[90%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass
              size={16}
              weight="light"
              className="z-50 font-bold "
            />
          </div>
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
      <table className="w-full ml-12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th scope="col" className="">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 sr-only text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="" className="py-3">
              Razão Social / CNPJ
            </th>
            <th scope="col" className="px-28 py-3 ml-12">
              Nome Fantasia
            </th>
            <th scope="col" className="px-2 py-3">
              Cidade
            </th>
            <th scope="col" className="px-2 py-3">
              Contato
            </th>

            <th scope="col" className="px-24 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {busca.map((busca, id) => (
            <tr
              key={id}
              className={`bg-write border-b ${
                busca.ativo == false ? "text-red-600" : " text-cyan-900"
              } ${
                busca.bloqueado == true ? " text-orange" : "  text-cyan-900"
              }`}
            >
              <td className="w-4">
                <div className="flex items-center ml-4 gap-3">
                  <input
                    id={busca.id.toString()}
                    type="checkbox"
                    value={busca.id}
                    className="w-4 h-4 border mr-3 border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td>
                <span className="font-bold uppercase">{busca.rz_social}</span>
                <br />
                <span className="">{busca.cnpj}</span>
              </td>
              <td className="flex flex-col px-28 py-4 max-w-sm">
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
                  {/* <button
                    type="button"
                    className="bg-opacity-95 bg-cyan-900 rounded px-1 p-2"
                    title="Imprimir segunda-via do boleto"
                    onClick={() => {
                      //contasReceberClientes(busca.email);
                      segundaVia(busca.cnpj, busca.email);
                    }}
                  >
                    <a href={url} target="_blank">
                      <ArchiveBox
                        size={24}
                        weight="light"
                        className="text-write"
                      />
                    </a>
                  </button> */}
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
                            type="submit"
                            name="update-ativo"
                            id="botao_ativar"
                            value={busca.id}
                            onClick={() => {
                              UpdateStateCliente(busca.id);
                              gravaData(busca.id);
                            }}
                            data-modal-toggle="editUserModal"
                            className="  text-write font-thin hover:underline bg-red-600 p-1 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Ativa o cliente"
                          >
                            <HeartBreak size={24} weight="light" />
                          </button>
                        );
                      case true:
                        return (
                          <Link to={"/gravarf2b"}>
                            <button
                              type="submit"
                              name="update-desativado"
                              id="botao_desativar"
                              value={busca.id}
                              onClick={() => {
                                UpdateStateCliente(busca.id);
                                gravaDataDesativado(busca.id);
                              }}
                              data-modal-toggle="tooltip"
                              data-te-html="true"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="font-normal text-write  hover:underline bg-green-500 px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                              title="Desativar cliente "
                            >
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
                            type="submit"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteBloqueio(busca.id);
                            }}
                            className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Bloqueia o cliente"
                          >
                            <LockSimpleOpen size={24} weight="light" />
                          </button>
                        );
                      case true:
                        return (
                          <button
                            name="desbloqueio"
                            type="submit"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteBloqueio(busca.id);
                            }}
                            className="font-thin text-xs text-write bg-red-600 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                            title="Desbloqueia o cliente"
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
                            type="submit"
                            id="bloqueio"
                            data-modal-toggle="editUserModal"
                            onClick={() => {
                              UpdateStateClienteGera(busca.id);
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
                            type="submit"
                            id="bloqueio"
                            data-modal-toggle="tooltip"
                            data-te-html="true"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => {
                              UpdateStateClienteGera(busca.id);
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
                            <form className="relative bg-cyan-900 rounded-lg shadow dark:bg-cyan-700">
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
                                    className="flex mb-2 text-sm font-medium text-write dark:text-white"
                                  >
                                    Cliente
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required={true}
                                    aria-required
                                    value={busca.rz_social}
                                  />
                                </div>
                                <div className="col-span-3 sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="flex mb-2 text-sm font-medium text-write dark:text-white"
                                  >
                                    CNPJ
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required={true}
                                    aria-required
                                    value={busca.cnpj}
                                    onChange={(event) =>
                                      setCnpj(event.target.value)
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="first-name"
                                      className="flex mb-2 text-sm font-medium text-write dark:text-white"
                                    >
                                      Chave gerada pelo SIAD
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="shadow-sm bg-gray-50 border border-cyan-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={chave}
                                      onChange={(event) =>
                                        setChave(event.target.value)
                                      }
                                      required={true}
                                      aria-required
                                    />
                                    <span className="mt-2 text-red-500">
                                      É necessário uma chave para continuar
                                    </span>
                                  </div>

                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="email"
                                      className="flex mb-2 text-sm font-medium text-write dark:text-white"
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
                                      value={validade}
                                      onChange={(event) =>
                                        setValidade(event.target.value)
                                      }
                                      required={true}
                                      aria-required
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="phone-number"
                                      className="flex mb-2 text-sm font-medium text-write dark:text-white"
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
                                    className="border-none rounded bg-green-500 text-write w-40 py-2"
                                    onClick={hadleGerarChave}
                                  >
                                    Gerar
                                  </button>
                                  <Dialog.Close asChild>
                                    <button
                                      className="border-none rounded bg-cyan-700 text-write w-40 py-2"
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
                      title="Vizualizar boletos do cliente"
                      onClick={() => {
                        localStorage.setItem("emailboleto", busca.cnpj);
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
                <Siderbar />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
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
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <button
                  onClick={() => {
                    setPaginaMenos();
                    PaginaAtualB();
                    setBloq(true);
                  }}
                  title="Anterior"
                >
                  <CaretLeft size={32} />
                </button>

                {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
              </span>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:outline-offset-0" */}
              <span
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {pag_atual}
              </span>

              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <button
                  onClick={() => {
                    setPaginaMais();
                    PaginaAtual();
                    setBloq(true);
                  }}
                  title="Seguinte"
                >
                  <CaretRight size={32} />
                </button>
                {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
              </span>

              <div>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      data-modal-toggle="editUserModal"
                      className="flex ml-16 gap-2 font-normal text-cyan-900 rounded py-3 px-4 tracking-wider leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                      title="Realizar ações em todos selecionados"
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
                              onClick={handleBloqueioClienteSelecionados}
                              title="Bloqueia e Desbloquia o Cliente"
                              className="flex justify-center items-center gap-2 rounded w-[80%] py-3 bg-write mb-2 text-cyan-900"
                            >
                              <LockSimple size={32} />{" "}
                            </button>
                            <button
                              onClick={handleDesativaClienteSelecionados}
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
                              onClick={handleGeraOnlineClienteSelecionados}
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
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
