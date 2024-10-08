import { useEffect, useState } from "react";
import { api } from "../services/api";

import { ArrowsCounterClockwise, Pencil, Plus } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";

import { Siderbar } from "./SiderBar";
import { HeaderClient } from "./HeaderClient";

import { ParceiroProps } from "./PesquisaParsa";

import { Button } from "./Button";
import HandleAllBoleto from "./HandleAllBoleto";
import { ClientesProps } from "../types/ClientesProps";
import { ConvertNumber } from "./ConvertNumber";
import moment from "moment";

export default function GeraTdBoletos() {
  const [gera, setGera] = useState<ClientesProps[]>([]);
  //console.log("clientes", gera);

  const [data_status, setData_status] = useState("");
  let datas = parseInt(data_status.substring(8, 10));
  const [email, setEmail] = useState("");

  const [data_pag, setData_pag] = useState("");

  const [valor_documento, setValor_ducumento] = useState("");

  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);

  const [num, setNum] = useState(0);

  const [mespag, setMespag] = useState("");

  const [envio, setEnvio] = useState(1);
  const [geraBoleto, setGeraBoleto] = useState(false);
  const status = "ativo";

  const [n_fantasia, setN_fantasia] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [estado, setEstado] = useState("");
  const [ibge, setIbge] = useState("");
  const [rz_social, setRz_social] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");

  const [id, setId] = useState(0);
  //const [idParceiro, setIdParceiro] = useState(0);

  const [nivel, setNivel] = useState("");
  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [anoAtual, setAnoAtual] = useState(0);
  const [valores, setValores] = useState(0);
  const [total, setTotal] = useState("0");
  //console.log("soma produtos", valores);

  const navigate = useNavigate();
  const userId = localStorage.getItem("Id");
  const idParceiro = localStorage.getItem("idParceiro");
  const idParsa = localStorage.getItem("idParsa");
  const id_parceiro = parseInt(idParsa!);

  const data_vencimento = `${dia}/${mes}/${ano}`;
  //console.log(data_vencimento);

  useEffect(() => {
    const msg = localStorage.getItem("mespag");
    if (msg) {
      setMespag(msg);
    }
  }, []);
  useEffect(() => {
    api.get("/getclientegeraboleto").then((response) => {
      const num = response.data;
      setNum(num);
    });
  }, []);
  useEffect(() => {
    api
      .get(`/parceiroboleto/${idParceiro}/cliente/${idParceiro}/dia/${dia}`)
      .then((response) => {
        const [{ cliente }] = response.data;
        //console.log("clientes", cliente);
        setGera(cliente);
      });
  }, [idParceiro, dia]);
  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
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
      .get(`/parceiroboleto/${idParceiro}/cliente/${idParceiro}/dia/${dia}`)
      .then((response) => {
        //console.log("cliente gerar", response.data);
        const [
          {
            cliente: [{ id }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ geraBoleto }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ valor_mensal }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ rz_social }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ email }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ data_pag }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ bairro }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ cep }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ cnpj }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ uf }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ ibge }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ numero }],
          },
        ] = response.data;
        const [
          {
            cliente: [{ endereco }],
          },
        ] = response.data;
        setValor_ducumento(valor_mensal);
        //      console.log("valor mensal", valor_mensal);
        setN_fantasia(rz_social);
        //    console.log("nome fantasia", n_fantasia);
        setId(id);
        //  console.log("id", id);
        setGeraBoleto(geraBoleto);
        //console.log("gera boleto", geraBoleto);
        setEmail(email);
        //console.log(email);
        setData_pag(data_pag);
        //console.log("data pag", data_pag);
        setBairro(bairro);
        //console.log(bairro);
        setCep(cep);
        //console.log(cep);
        setCnpj(cnpj);
        //console.log(cnpj);
        setEstado(uf);
        //console.log(estado);
        setIbge(ibge);
        //console.log(ibge);
        setRz_social(rz_social);
        //console.log(rz_social);
        setNumero(numero);
        //console.log(numero);
        setEndereco(endereco);
        //console.log(endereco);
      });
  }, [dia]);
  function handleInputChange(id: number) {
    if (id != null) {
      //setAtivo(!ativo);
      const idC = id.toString();
      localStorage.setItem("idCliente", idC);
    } else {
    }
  }
  useEffect(() => {
    const agora = moment();
    //setDia(agora.date()); // Imprimindo o dia
    //setMes(agora.get("month") + 1);
    setAnoAtual(agora.year());
  }, []);
  // useEffect(() => {
  //   if (mespag && geraBoleto == true) {
  //     GerarBoletosCliente();
  //     updateStateGeraBoleto(id);
  //   }
  // }, [mespag, geraBoleto]);
  function somar() {
    if (!gera) {
      setTotal("0");
    }
    if (gera) {
      const total = gera
        .map((gera) => parseFloat(gera.valor_mensal))
        .reduce((total, valor_mensal) => total + valor_mensal)
        .toFixed(2);
      setTotal(total);
    }
  }
  useEffect(() => {
    if (!ano && !gera) {
      return;
    }
    if (ano && gera) {
      somar();
    }
  }, [ano, gera]);

  function Salvar() {
    try {
      gera.map((gera) => {
        if (gera.geraBoleto == true && mespag) {
          HandleAllBoleto(
            gera.id,
            gera.parceiro_id,
            gera.valor_mensal,
            data_vencimento,
            mespag,
            gera.rz_social,
            gera.email,
            envio,
            gera.cep,
            gera.bairro,
            gera.cnpj,
            gera.ibge,
            gera.endereco,
            gera.cidade,
            gera.rz_social,
            gera.numero,
            gera.uf,
            status
          );
        }
      });
      //return window.location.reload();
    } catch (error) {
      alert("Não foi possível enviar os boletos");
    }
  }
  function datapag(data_pag: string) {
    const data = `${data_pag}`;
    setData_pag(data);
    // console.log(data);
  }
  async function handleBoletosCliente() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(
        `/boleto/${id_parceiro}/${envio}/${id_parceiro}`,
        {
          valor_documento: valor_documento,
          data_vencimento: data_vencimento,
          obs_corpo: mespag,
          n_fantasia: n_fantasia,
          email: email,
          status: `${status}`,
          parceiro_id: idParsa,
        }
      );
      console.log(response.data);
      // if(geraBoleto==true){
      //   GerarBoletosCliente()
      // }
      //alert(`Criado com sucesso o boleto do cliente ${n_fantasia}`);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateStateGeraBoleto(id: number) {
    document.getElementById("geraBoleto");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/clientegeraBoleto/${id}`);
      JSON.stringify({
        id: Number,
        geraBoleto: true,
      });
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }
  async function UpdateStateGeraBoleto(cliente_id: number) {
    document.getElementById("geraBoleto");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/clientegeraBoleto/${cliente_id}`);
      JSON.stringify({
        id: Number,
        geraBoleto: true,
      });
      //alert(`${cliente_id}`)
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  // useEffect(() => {
  //   api
  //     .post(`/clientesearch`, {
  //       consulta,
  //     })
  //     .then((response) => {
  //       setBusca(response.data);
  //     });
  // }, [consulta]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-cyan-900">
      <div className="flex items-center justify-center w-full pb-4 mt-20">
        <HeaderClient />
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="ml-32 text-2xl mt-16 w-full font-bold">
          <h1>Montar Boletos para enviar aos Clientes</h1>
        </div>
        
        <div className="relative mt-10 w-[90%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        </div>
      </div>
      <div className="flex mt-6 md:ml-28">
        {(() => {
          switch (nivel) {
            case "2":
              return (
                <>
                  <p className="font-extralight ml-6 mb-4">
                    Cadastrado no sistema : {idParceiro}
                  </p>
                </>
              );
            case "3":
              return (
                <>
                  <p>Número de Cadastrado no sistema :</p>
                  <input
                    type="text"
                    readOnly
                    className="border-none w-4 rounded-sm px-0.5 ml-0.5"
                    //defaultValue={idParceiro}
                    aria-required
                    required
                  />
                </>
              );
          }
        })()}
      </div>
      <div className="flex md:ml-24 gap-2 ml-6">
        <label className="md:flex flex-col mb-3 md:ml-10">
          Dia de vencimento
          <select
            id="dia"
            name="dia"
            className="h-10 w-48 border border-cyan-900 rounded outline-none px-1 font-bold text-xs"
            value={dia}
            onChange={(e) => {
              setDia(e.target.value);
            }}
            aria-required
            required={true}
            title="Essa consulta trará somente os boletos do determinado dia"
          >
            <option>Dia de gerar os boletos</option>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </label>
        <label className="flex flex-col ml-1 mb-3 ">
          Referente ao mês:
          <select
            id="mes_pag"
            name="mes_pag"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            value={mespag}
            onChange={(e) => {
              localStorage.setItem("mespag", e.target.value);
              setMespag(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês referente"
          >
            <option>Referente ao mês</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fervereiro">Fervereiro</option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>
        </label>
        <label className="flex flex-col mb-3 ">
          Mês da cobrança:
          <select
            id="mes"
            name="mes"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            value={mes}
            onChange={(e) => {
              setMes(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês que será cobrado"
          >
            <option>Mês da Cobrança</option>
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
          Ano da Cobrança:
          <select
            id="data_pag"
            name="data_pag"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            value={ano}
            onChange={(e) => {
              setAno(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês referente"
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
            <option value={anoAtual}>{anoAtual}</option>
          </select>
        </label>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th scope="col" className="md:px-32 py-3">
              Nome Fantasia
            </th>
            <th scope="col" className="px-2 py-3">
              email
            </th>
            <th scope="col" className="px-1 py-3">
              valor
            </th>
            <th scope="col" className="px-2 py-3">
              vencimento
            </th>
            <th scope="col" className="px-32 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {gera.map((gera, id) => (
            <tr key={id}>
              <td className="px-32">{gera.n_fantasia}</td>
              <td>{gera.email}</td>
              <td>{ConvertNumber(gera.valor_mensal).toString()}</td>
              <td className="px-2">{data_vencimento}</td>
              <td className="px-32 flex gap-2">
                {/* {(() => {
                  switch (geraBoleto) {
                    case true:
                      return (
                        <button
                          name="gerar"
                          type="button"
                          id="gerar"
                          data-modal-toggle="editUserModal"
                          className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                          title="Gerar boleto"
                          onClick={()=>HandleAllBoleto(gera.cliente_id,gera.parceiro_id, gera.valor_mensal, gera.data_pag, mespag, gera.n_fantasia, gera.email, envio)}
                        >
                          <ArrowsCounterClockwise size={24} weight="light" />
                        </button>
                      );
                    case false:
                      return (
                        <button
                          id="geraBoleto"
                          type="button"
                          name="geraBoleto"
                          className="font-normal text-xs text-write bg-red-500 hover:underline px-1 p-1 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                          title="gerar boletos"
                          onClick={()=>HandleAllBoleto(gera.cliente_id,gera.parceiro_id, gera.valor_mensal, gera.data_pag, mespag, gera.n_fantasia, gera.email, envio)}
                        >
                          <ArrowsCounterClockwise size={24} weight="light" />
                        </button>
                      );
                  }
                })()} */}
                <Link to={"/editarcliente"}>
                  <button
                    id="editar"
                    name="editar"
                    className={`font-bold hover:underline bg-cyan-900 text-write rounded py-3 px-1 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0`}
                    title="Editar Cliente"
                    onClick={() => {
                      handleInputChange(gera.id);
                    }}
                  >
                    <Pencil size={24} weight="light" />
                  </button>
                </Link>
                <button
                  name="bloqueio"
                  type="button"
                  id="bloqueio"
                  data-modal-toggle="editUserModal"
                  onClick={() => {
                    UpdateStateGeraBoleto(gera.id);
                  }}
                  className="font-normal text-write bg-green-500 hover:underline px-1 p-2 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                  title="Bloqueiar gerar boletos"
                >
                  <ArrowsCounterClockwise size={24} weight="light" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center ml-28 gap-3 font-bold">
      <div className="flex md:ml-32 ml-4 gap-3">
          <Link to={"/boletosapi"}>
            <Button title="Gerar todos os boletos" onClick={() => Salvar()}>
              Gerar Boletos
            </Button>
          </Link>
        </div>
        <button
          className=" bg-cyan-900 text-write rounded py-3 px-3 sr-only"
          title="Click se não aparecer a soma"
          onClick={() => somar()}
        >
          <Plus size={32} />
        </button>
        <span>Valor Total: {ConvertNumber(total)} R$</span>
        <button
          className=" bg-cyan-900 text-write rounded py-3 px-3"
          title="Click para atualizar o valor total"
          onClick={() => somar()}
        >
          <ArrowsCounterClockwise size={32} />
        </button>
      </div>
      <Siderbar />
    </div>
  );
}
