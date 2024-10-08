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

export default function ContasPagas() {
  const [contas, setContas] = useState<contasProps[]>([]);
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
  const [finalizada, setFinalizada]= useState("")
  const idParsa = idParceiro.toString();
  const userId = localStorage.getItem("Id");
  const emailParsa = localStorage.getItem("email");
   
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  const cnpj = `${p6}${p5}${p7}`;
  //console.log(cnpj)
  //const {nivel} = useParams()
  
useEffect(()=>{
  if(nivel){
    localStorage.setItem("Nivel", nivel);
  }
},[nivel])
  const ref = localStorage.getItem("new");
  //consulta refresh-token e seta um novo token
  useEffect(() => {
    if(ref){
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
          codigo_status: 2
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
  
  function contasReceberClientes() {
    f2b
      .get(`/cobrancas/`, {
        headers: {
          Authorization: `Basic ${basic}`,
        },
        params: {
          limite: 50,
          pagina: `${pagina}`,
          codigo_status: 2
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
          codigo_status: 2,
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
          codigo_status: 2,
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
  
   
  async function handleEmail() {
    const emailAtrasado = contas.filter(
      (contas) => contas.texto_status === "Paga"
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
        status: "Paga",
      });
      // UpdateStateClienteBloqueio(idClienteVencido.id)
    }
  }
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
                  <button onClick={() => setPaginaMenos()}>
                    <CaretLeft size={32} />
                  </button>

                  {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
                </span>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(1)}
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0"
                  >
                    1
                  </button>
                </Link>
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(2)}
                    className="relative inline-flex items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </button>
                </Link>
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(3)}
                    className="relative hidden items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </button>
                </Link>
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(4)}
                    className="relative hidden items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    4
                  </button>
                </Link>
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(5)}
                    className="relative inline-flex items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0"
                  >
                    5
                  </button>
                </Link>
                <Link
                  to="#"
                  onClick={contasReceberClientes}
                  className="w-[100%]"
                >
                  <button
                    onClick={() => setPagina(6)}
                    className="relative inline-flex items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0"
                  >
                    6
                  </button>
                </Link>
                <span className="relative inline-flex items-center px-4 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0">
                  ...
                </span>
                <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-cyan-600 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <Link to="#" onClick={contasReceberClientes}>
                    <button onClick={() => setPaginaMais()}>
                      <CaretRight size={32} />
                    </button>
                  </Link>
                  {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                </span>
              </nav>
            </div>
          </div>
        </div>
      );
    }
  }
  function LoggedUrl() {
    if (nivel) {
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
              placeholder="Digite seu CNPJ"
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
              placeholder="Digite seu CNPJ"
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
        <div className="flex flex-col mt-8">
          <nav>
              <ul className="flex gap-3 justify-end items-end mb-8 text-cyan-900 font-bold">
                <li>
                  <Link to={"/contasvencidas"}>Vencidas</Link>
                </li>
                <li>Em Aberto</li>
                <li>Pagas</li>
                <li>Canceladas</li>
              </ul>
            </nav>
          <div className="md:flex gap-2 ml-44">
            <Button
              onClick={contasReceberClientes}
              className="text-center bg-cyan-700 font-bold "
              title="Boletos enviados F2b"
            >
              Pesquisar
            </Button>

            <Link to="/agendamentos">
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
                title="Montar e enviar para os clientes"
              >
                Montar Boletos
              </Button>
            </Link>
          </div>
          <div className="md:grid md:grid-cols-1 flex  md:ml-44 flex-col rounded p-1 md:max-w-screen-xl gap-2">
            <h3 className="mb-2 mt-3">
              Escolha o parceiro para gerar seus boletos
            </h3>
            <table className="mb-2 w-[30%]">
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
                      <span className="flex text-md uppercase w-full gap-2">
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
        <div className="ml-8 text-2xl font-bold mt-32">
          <h2 className="flex">Boletos Pagos</h2>
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
            {contas.map((contas, id) => (
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
      </div>
    </div>
  );
}
