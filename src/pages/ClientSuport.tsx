import { FormEvent, useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { Button } from "../components/Button";
import { Link, useParams } from "react-router-dom";
import { app } from "../services/app";

export default function ClientSuport() {
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [problema_relatado, setProblema_relado] = useState("");
  const [tipo_sist, setTipo_sist] = useState("");
  const { cnpj } = useParams();
  //console.log("cnpj",cnpj)
  const { Nivel } = useParams();

  useEffect(()=>{
    if(Nivel){  
      localStorage.setItem("Nivel", Nivel)
    }
  },[Nivel])
  async function handleCreateSuporte(event: FormEvent) {
    event.preventDefault();

    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await api.post("/suporte", {
        telefone,
        empresa,
        problema_relatado,
        tipo_sist,
      });
      const { id } = response.data;
      console.log(response);
      await navigator.clipboard.writeText(id);

      setTelefone("");
      setEmpresa("");
      setProblema_relado("");
      setTipo_sist("");
    } catch (err) {
      console.log(err);
      //alert("Falha ao criar user tente novamente");
    }
  }
  async function handleCreateSuporteUrl(event: FormEvent) {
    event.preventDefault();

    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await app.post("/suporte", {
        telefone,
        empresa,
        problema_relatado,
        tipo_sist,
      });
      const { id } = response.data;
      console.log(response);
      await navigator.clipboard.writeText(id);

      setTelefone("");
      setEmpresa("");
      setProblema_relado("");
      setTipo_sist("");
    } catch (err) {
      console.log(err);
      //alert("Falha ao criar user tente novamente");
    }
  }
  function Logged() {
    if (Nivel) {
      return (
        <Button
          onClick={handleCreateSuporteUrl}
          className="mt-8 border w-72 rounded h-12"
        >
          <Link
            className="w-[100%] flex items-center justify-center"
            to={`/suporte/${cnpj}/${Nivel}`}
          >
            Enviar
          </Link>
        </Button>
      );
    } else if (!Nivel) {
      return (
        <Button
          onClick={handleCreateSuporte}
          className="mt-8 border w-72 rounded h-12"
        >
          <Link
            className="w-[100%] flex items-center justify-center"
            to={"/suporte"}
          >
            Enviar
          </Link>
        </Button>
      );
    }
  }

  return (
    <div>
      <div className="md:ml-56 md:mt-24 mt-44 ml-4 text-xl font-bold text-cyan-900">
        <h1>Suporte</h1>
      </div>
      <form className="md:flex mt-8 md:mt-4 md:ml-56 ml-4 text-cyan-900">
        <HeaderClient />

        <div className="items-center content-center justify-center mb-6">
          <div className="md:flex items-center">
            <label className="ml-1 w-[100%]">
              Nome:
              <input
                type="text"
                className="md:flex rounded px-2 w-[100%] h-10  text-cyan-900 text-xs outline-none  placeholder:text-cyan-900 cursor-pointer border"
                value={empresa}
                onChange={(event) => setEmpresa(event.target.value)}
              />
            </label>
          </div>
          <div className="md:flex">
            <label className="flex flex-col ml-1 w-[100%]">
              Telefone:
              <input
                type="text"
                className="w-[100%] rounded h-10 text-cyan-900 text-xs outline-none placeholder:text-cyan-900 cursor-pointer border"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
            </label>
            <label className="flex flex-col ml-2 w-[100%]">
              Sistema
              <select
                className="rounded h-10 text-cyan-900 text-xs outline-none placeholder:text-cyan-900 cursor-pointer border"
                value={tipo_sist}
                onChange={(e) => setTipo_sist(e.target.value)}
              >
                <option value="">Selecione um tipo de sistema</option>
                <option value="NF-e">NF-e</option>
                <option value="NFC-e">NFC-e</option>
                <option value="MDF-e">MDF-e</option>
                <option value="DAV">DAV</option>
                <option value="SIAD">SIAD</option>
                <option value="Manifestador">Manifestador</option>
                <option value="Ordem de Serviço">Ordem de Serviço</option>
                <option value="Força de Vendas">Força de Vendas</option>
                <option value="Outros">Outros</option>
              </select>
            </label>
          </div>
          <textarea
            placeholder="Informe seu problema aqui:"
            className="flex items-start justify-start self-start rounded p-2 h-3/4 w-screen max-w-screen-sm mt-8 ml-2 text-cyan-900 text-xs outline-none placeholder:text-cyan-900 cursor-pointer border"
            value={problema_relatado}
            onChange={(event) => setProblema_relado(event.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center text-cyan-900">
          <div className="flex flex-col self-center justify-center content-center md:ml-4 ml-1 border rounded  md:w-96 w-72 h-[450px] cursor-pointer mt-6">
            <div className="flex flex-col justify-center items-center">
              <p className="flex justify-center font-semibold items-center mt-2 mb-6 self-center">
                Ações a serem aplicadas
                <br /> antes de abrir seu Ticket.
              </p>
              <ul>
                <li>
                  <Link
                    to={"/suporteinfo"}
                    className="flex justify-center items-center mt-4"
                  >
                    * Falta de Internet
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/suporteinfo"}
                    className="flex justify-center items-center mt-4"
                  >
                    * Migrar suas notas ficais
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/suporteinfo"}
                    className="flex justify-center items-center mt-4"
                  >
                    * Problemas com a balança
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/suporteinfo"}
                    className="flex justify-center items-center mt-4"
                  >
                    * Lançamento de nota fiscal
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/suporteinfo"}
                    className="flex justify-center items-center mt-4"
                  >
                    * Lançamento de impostos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {Logged()}
        </div>
        <Siderbar />
      </form>
    </div>
  );
}
