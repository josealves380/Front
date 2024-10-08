import {
  AddressBook,
  Calculator,
  Calendar,
  CurrencyCircleDollar,
  FileArrowDown,
  Gear,
  Handshake,
  House,
  Key,
  List,
  Plus,
  Users,
  Wrench,
  X,
} from "phosphor-react";

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import { app } from "../services/app";

export function Siderbar() {
  const [nivel, setNivel] = useState<any>();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [niv, setNiv] = useState("");
  const [idContador, setIdContador] = useState("");
  //console.log("id contador", idContador);
  const userId = localStorage.getItem("Id");
  const emailcontador = localStorage.getItem("email");
  
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  
  
  const { Nivel } = useParams();
  useEffect(() => {
    if (!Nivel) {
      return;
    }
    if (Nivel) {
      setNiv(Nivel);
    }
  }, [Nivel]);
  
  useEffect(() => {
    if (!userId) {
      return;
    }
    if (userId) {
      api.get(`/user/${userId}`).then((response) => {
        const { nivel } = response.data;
        setNivel(nivel);
      });
    }
  }, [userId]);
  useMemo(() => {
    if (!emailcontador) {
      return;
    }
    if (emailcontador && nivel == "5") {
      app.get(`/getcontadoremail/${emailcontador}`).then((response) => {
        const [{ id }] = response.data;
        setIdContador(id);
      });
    }
  }, [emailcontador, nivel]);
  function Logged() {
    if (nivel == 1) {
      return (
        <ul>
          <li className="flex">
            <Link
              to="/pesquisaParceiro"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Handshake size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Parceiros
              </span>
            </Link>
            <button
              title="Adicionar Parceiro"
              className="md:block px-7 py-2.5 ml-1.5 text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full"
            >
              <Link to={"/newParsa"}>
                <Plus size={16} weight="bold" />
              </Link>
            </button>
          </li>
        </ul>
      );
    } else {
      return;
    }
  }
  function Adm() {
    const emailParsa = localStorage.getItem("email");
    if (nivel == 1) {
      return (
        <li>
          <Link
            to="/adm"
            className="relative flex flex-row items-center h-8 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-4 mb-2"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <House size={24} />
            </span>
            <span className="ml-4 text-sm tracking-wide truncate">Início</span>
          </Link>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
        </li>
      );
    } else {
      return;
    }
  }
  function Config() {
    if (nivel == 1 || nivel == 2) {
      return (
        <li>
          <Link
            to="/config"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <Gear size={24} />
            </span>
            <span className="ml-4 text-sm tracking-wide truncate">
              Configurações
            </span>
          </Link>
        </li>
      );
    } else {
      return;
    }
  }
  function AdmUser() {
    if (nivel == 1) {
      return (
        <ul>
          <li className="flex">
            <Link
              to="/PesquisaUser"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Users size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Usuários
              </span>
            </Link>
            <button
              title="Adicionar Usuário"
              className="md:block px-8 py-2.5 ml-1.5 text-lg font-bold tracking-wide rounded-full"
            >
              <Link to="/usuario">
                <Plus size={16} weight="bold" />
              </Link>
            </button>
          </li>
        </ul>
      );
    } else {
      return;
    }
  }
  function Parsa() {
    if (nivel == 2) {
      return (
        <ul>
          <li className="flex">
            <Link
              to="/PesquisaUserCliente"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Users size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Usuários
              </span>
            </Link>
            <span
              title="Adicionar Usuários"
              className="md:block px-8 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write  rounded-full"
            >
              <Link to="/usuario">
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
        </ul>
      );
    } else {
      return;
    }
  }
  function Client() {
    if (nivel == 1) {
      return (
        <ul>
          <li className="flex">
            <Link
              to="/PesquisaCliente"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AddressBook size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Clientes
              </span>
            </Link>
            <span
              title="Adicionar Cliente"
              className="md:block px-9 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write  rounded-full"
            >
              <Link to="/cadastro">
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
        </ul>
      );
    } else {
      return;
    }
  }
  function EnvioF2b() {
    if (nivel == 1 || nivel == 2) {
      return (
        <>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          <li className="flex">
            <Link
              to={"/pesquisacontador"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Calculator size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Contador
              </span>
            </Link>
            <span
              title="Adicionar um Contador"
              className="md:block px-7 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write text-cyan-900 rounded-full"
            >
              <Link to={"/newcontador"} className="text-write">
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
          <li className="flex">
            <Link
              to={"/suporte"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Wrench size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Suporte
              </span>
            </Link>
            <span
              title="Adicionar Suporte"
              className="md:block px-10 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write text-cyan-900 rounded-full"
            >
              <Link to={"/suportecliente"} className="text-write">
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>

          <li>
            <Link
              to={"/boleto"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Calendar size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Boletos
              </span>
            </Link>
          </li>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          <li>
            <Link
              to={"/boletosapi"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <CurrencyCircleDollar size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Boletos/F2b
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/arquivosficais"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FileArrowDown size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Arquivos Fiscais
              </span>
            </Link>
          </li>
        </>
      );
    }
  }
  //path="/clientes/:p1/:p2/:p3/:/:Nivel/:p5/:p6/:p7"
  // navigate("/clientes/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/1bG9zaWFk/81840/7105/00199");
  //ZXZhbGRvZnJhbmNpc2Nvam9zZTRzaWFkc2lzdGVtYXN1cmxtb2R1bG9zaWFk
  function DashCliente() {
    if (niv == "1bG9zaWFk") {
      return (
        <ul>
          <li>
            <Link
              to={`/clientes/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-8 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-4 mb-2"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <House size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Início
              </span>
            </Link>
          </li>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          <li className="flex">
            <Link
              to={`/pesquisacontador/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Calculator size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Contador
              </span>
            </Link>
            <span
              title="Adicionar um Contador"
              className="md:block px-7 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write text-cyan-900 rounded-full"
            >
              <Link
                to={`/newcontador/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
                className="text-write"
              >
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
          <li className="flex sr-only">
            <Link
              to={`/suporte/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Wrench size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Suporte
              </span>
            </Link>
            <span
              title="Adicionar Suporte"
              className="md:block px-10 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write  rounded-full"
            >
              <Link
                to={`/suportecliente/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}}`}
              >
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
          <li>
            <Link
              to={`/boleto/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Calendar size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Boleto
              </span>
            </Link>
          </li>
          <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          <li>
            <Link
              to={`/arquivosficais/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FileArrowDown size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Arquivos Fiscais
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`/configcliente/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/${niv}/${p5}/${p6}/${p7}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Gear size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Configurações
              </span>
            </Link>
          </li>
        </ul>
      );
    }
  }
  function ClientParsa() {
    if (nivel == 2 || nivel == 3) {
      return (
        <ul>
          <li>
            <Link
              to="/parceiro"
              className="relative flex flex-row items-center h-8 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-4 mb-2"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <House size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Início
              </span>
            </Link>
            <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
          </li>
          <li className="flex">
            <Link
              to="/PesquisaClienteParceiro"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AddressBook size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Clientes
              </span>
            </Link>
            <span
              title="Adicionar Cliente"
              className="md:block px-9 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write  rounded-full"
            >
              <Link to="/cadastro">
                <Plus size={16} weight="bold" />
              </Link>
            </span>
          </li>
        </ul>
      );
    } else {
      return;
    }
  }
  function Contador() {
    if (nivel == "5") {
      return (
        <ul>
          <li>
            <li>
              <Link
                to="/dashcontador"
                className="relative flex flex-row items-center h-8 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-4 mb-2"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <House size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Início
                </span>
              </Link>
              <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
            </li>
          </li>
          <li>
            <Link
              to={`/arquivosclientes/${idContador}`}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FileArrowDown size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Arquivos Fiscais
              </span>
            </Link>
          </li>
        </ul>
      );
    }
  }
  function handleButtonClick() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <div className="fixed md:flex flex-col top-3 md:top-8 left-0 w-14 hover:w-60 mt-16 sm:bg-cyan-900 dark:bg-cyan-600 h-full text-cyan-900 sm:text-write transition-all duration-300 border-none sidebar ">
      <nav className="fixed md:w-60 md:bg-cyan-900 bg-write  m-4 justify-between sm:hidden">
        <button onClick={handleButtonClick}>
          {isNavOpen ? (
            <X
              size={24}
              className="flex border-none justify-center items-center md:text-write mt-4 ml-3 cursor-pointer"
            />
          ) : (
            <List
              size={32}
              className="flex border-none justify-center bg-write text-cyan-900 m-0 cursor-pointer "
            />
          )}
        </button>
        {isNavOpen ? (
          <ul className="flex flex-col py-6 space-y-1">
            {Adm()}
            {Client()}
            {DashCliente()}
            {ClientParsa()}
            <li className="flex">{Logged()}</li>
            {Parsa()}
            {AdmUser()}
            {Contador()}
            <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2 sr-only"></div>

            <li className="flex sr-only">
              <Link
                to={"/suporte"}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <Wrench size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Suporte
                </span>
              </Link>
              <span
                title="Adicionar Suporte"
                className="md:block px-10 py-2.5 ml-1.5 text-xs font-medium tracking-wide sm:text-write  rounded-full"
              >
                <Link to={"/suportecliente"}>
                  <Plus size={16} weight="bold" />
                </Link>
              </span>
            </li>
            {EnvioF2b()}
            {/* <li>
              <Link
                to={"/boletosapi"}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <CurrencyCircleDollar size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Boletos/F2b
                  
                </span>
              </Link>
            </li> */}
            <li className="sr-only">
              <Link
                to={"/boleto"}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <Calendar size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Boleto
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/chaves"}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <Key size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Chave
                </span>
              </Link>
            </li> */}

            <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2 sr-only"></div>
            <li className="sr-only">
              <Link
                to={"/arquivosficais/2"}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FileArrowDown size={24} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">
                  Arquivos Fiscais
                </span>
              </Link>
            </li>

            <div className=" flex w-96 font-light text-cyan-600 space-x-4 border-b-2"></div>
            {Config()}
          </ul>
        ) : null}
      </nav>
      <div className="overflow-y-auto overflow-x-hidden hidden sm:flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-6 space-y-1">
          {Adm()}
          {Client()}
          {DashCliente()}
          {ClientParsa()}
          <li className="flex">{Logged()}</li>
          {Parsa()}
          {AdmUser()}
          {Contador()}
          {/* <li>
            <Link
              to={"/boleto"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Calendar size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">
                Boletos
              </span>
            </Link>
          </li> */}
          {EnvioF2b()}
          {/* <li>
            <Link
              to={"/chaves"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Key size={24} />
              </span>
              <span className="ml-4 text-sm tracking-wide truncate">Chave</span>
            </Link>
          </li> */}

          {/* <li>
            <Link
              to={"/arquivosficais"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800  border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FileArrowDown size={24} />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Arquivos Fiscais
              </span>
            </Link>
          </li> */}

          {Config()}
        </ul>
      </div>
    </div>
  );
}
