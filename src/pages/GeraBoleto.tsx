import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
//import { f2b } from "../services/f2b";

import moment, { locale, months } from "moment";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import GerarBoleto from "../components/GerarBoleto";
import Agendamentos from "../components/Agendamentos";
import handleBoletosCliente from "../components/HandleBoletosCliente";
import { ClientesProps } from "../types/ClientesProps";

export default function GeraBoleto() {
  const [rz_social, setRz_social] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [mespag, setMespag] = useState("");
  const [envio, setEnvio] = useState("");
  console.log("envio", envio)
  const [status, setStatus] = useState("");
  console.log("status", status)
  const [validade, setValidade] = useState("");
  const [salario, setSalario] = useState("");
  const [datapag, setDatapag] = useState("");

  const [agenda, setAgenda] = useState("1");
  const [valorMensal, setValorMensal] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [parceiro_id, setParceiro_id] = useState(0);
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setcidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [ibge, setIbge] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [gera, setGera] = useState<boolean>();
  const [basic, setBasic] = useState("");
  const [perc, setPerc] = useState("0");
  const [email, setEmail] = useState("");
  const [multa, setMulta] = useState("2");
  const [juros, setJuros] = useState("0.33");
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const vlTotal = (parseFloat(salario) * (parseFloat(perc) / 100)).toFixed(2);

  const datainicial = `${datapag}/${mes}/${ano}`;
  const mult = parseInt(multa);
  const jur = parseFloat(juros);

  const clienteId = localStorage.getItem("idCliente");
  const userId = localStorage.getItem("Id");

  // useEffect(() => {
  //   api.get(`/getf2b/${userId}`).then((response) => {
  //     const [{ basic }] = response.data;
  //     setBasic(basic)
  //   });
  // }, []);
  //const [basic, setBasic] = useState("")
 // const userId = localStorage.getItem("Id");
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic) 
    });
  }, []);

  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ salario }] = response.data;
      setSalario(salario);
    });
  }, []);
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    //setAno(agora.year());
  }, []);
  useEffect(() => {
    api.get<ClientesProps>(`/clienteId/${clienteId}`).then((response) => {
      const {
        cnpj,
        rz_social,
        n_fantasia,
        email,
        data_pag,
        perc_mensal,
        bairro,
        cep,
        cidade,
        endereco,
        ibge,
        numero,
        uf,
        geraBoleto,
        parceiro_id,
      } = response.data;
      //console.log("gera boleto", response.data);
      setParceiro_id(parceiro_id);
      setCnpj(cnpj);
      setRz_social(rz_social);
      setN_fantasia(rz_social);
      setEmail(email);
      setDatapag(data_pag);
      setPerc(perc_mensal);
      setBairro(bairro);
      setCep(cep);
      setcidade(cidade);
      setEndereco(endereco);
      setIbge(ibge);
      setNumero(numero);
      setUf(uf);
      setGera(geraBoleto);
    });
  }, []);

  // async function handleBoletosCpliente() {
  //   addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     //window.parent.location = window.parent.location.href
  //     window.location.reload();
  //   });
  //   try {
  //     const response = await api.post(`/boleto/${clienteId}/$`, {
  //       valor_documento: parseFloat(vlTotal),
  //       data_vencimento: datainicial,
  //       obs_corpo: mespag,
  //       n_fantasia: n_fantasia,
  //       email: email,
  //       status: `${status}`,
  //     });
  //     console.log(response.data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    if (envio == "1") {
      setStatus("Registrado");
    } else if (envio == "2") {
      setStatus("ativo");
    } else if (envio == "3") {
      setStatus("agendado");
    }
  }, [envio]);

  async function handleMensalidadeCliente() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(
        `/financeiro/${clienteId}/mensalidade/3/`,
        {
          valor: parseFloat(valorMensal),
        }
      );
      //alert("criado com sucesso");
      console.log(response);
    } catch (error) {
      console.log(error);
      //alert("error");
    }
  }
  function Envio() {
    if (envio == "1") {
      return (
        <div className="flex items-center space-x-2 rounded-b  border-gray-200 dark:border-gray-600 ml-4">
          <button
            className=" bg-green-500 border-none rounded font-bold text-write w-72 py-2"
            title="Confira se não esqueceu de preencher algum campo"
            //onChange={() => setStatus("enviado")}
            onClick={() => {
              GerarBoleto(
                rz_social,
                email,
                datainicial,
                vlTotal,
                mult,
                jur,
                mespag,
                cnpj,
                bairro,
                cep,
                cidade,
                endereco,
                ibge,
                numero,
                uf,
              basic
              );
              handleBoletosCliente(
                `${clienteId}`,
                vlTotal,
                datainicial,
                mespag,
                n_fantasia,
                email,
                status,
                envio,
                parceiro_id
              );
            }}
          >
            Enviar
          </button>
        </div>
      );
    } else if (envio == "2") {
      return (
        <div className="flex items-center ml-3 space-x-2 rounded-b  border-cyan-300 dark:border-write">
          <button
            className=" bg-cyan-900 border-none rounded font-bold text-write w-72 py-2"
            title="Confira se não esqueceu de preencher algum campo"
            onClick={() => {
              handleBoletosCliente(
                `${clienteId}`,
                vlTotal,
                datainicial,
                mespag,
                n_fantasia,
                email,
                status,
                envio,
                parceiro_id
              );
            }}
          >
            Gerar
          </button>
        </div>
      );
    } else if (envio == "3") {
      return (
        <div className="flex items-center ml-3 space-x-2 rounded-b  border-gray-200 dark:border-gray-600">
          <button
            className=" bg-cyan-600 border-none rounded  font-bold text-write w-72 py-2"
            title="Confira se não esqueceu de preencher algum campo"
            onClick={() => {
              Agendamentos(
                n_fantasia,
                email,
                datainicial,
                vlTotal,
                agenda,
                mult,
                jur,
                datapag
              );
              handleBoletosCliente(
                `${clienteId}`,
                vlTotal,
                datainicial,
                mespag,
                n_fantasia,
                email,
                status,
                envio,
                parceiro_id
              );
            }}
          >
            Agendar
          </button>
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-1 h-screen place-content-center md:ml-96 text-cyan-900 mr-96">
      <div className="flex justify-center items-center content-center">
        {/* <!-- Modal content --> */}
        <HeaderClient />
        <form className="px-2 rounded-lg shadow dark:bg-cyan-700 dark:text-write">
          {/* <!-- Modal header --> */}

          <div className="flex mt-32 w-[100%] justify-between items-start rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-cyan-900 dark:text-write">
              Gerar Boletos para o cliente
            </h3>
          </div>
          {/* <!-- Modal body --> */}

          <div className="w-[100%]">
            <div className="">
              <label
                htmlFor="first-name"
                className="flex mb-2 text-sm font-medium text-cyan-900  dark:text-write"
              >
                Cliente
              </label>
              <input
                type="text"
                name="name"
                className="shadow-sm bg-gray-50 border border-cyan-900 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-cyan-600 dark:border-gost dark:placeholder-gost dark:text-write dark:focus:ring-blue-500 dark:focus:border-cyan-600"
                placeholder=""
                required={true}
                aria-required
                value={n_fantasia}
                onChange={(e) => setN_fantasia(e.target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="first-name"
                className="flex mb-2 text-sm font-medium text-cyan-900  dark:text-write"
              >
                CNPJ
              </label>
              <input
                type="text"
                name="name"
                className="shadow-sm bg-gray-50 border border-cyan-900 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-cyan-600 dark:border-gost dark:placeholder-cyan-600 dark:text-write dark:focus:ring-cyan-600 dark:focus:border-cyan-600"
                placeholder=""
                required={true}
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
              />
            </div>
            <div className="col-span-3 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="flex text-sm font-medium text-cyan-900  dark:text-write"
              >
                EMAIL
              </label>
              <input
                type="text"
                name="name"
                className="shadow-sm bg-gray-50 border border-cyan-900 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-cyan-600 dark:border-write dark:placeholder-gost dark:text-write dark:focus:ring-cyan-600 dark:focus:border-cyan-600"
                placeholder=""
                required={true}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center justify-center mb-3">
                <label className="flex flex-col text-cyan-900 mt-2 dark:text-write">
                  Valor salário
                  <input
                    id="salario"
                    type="text"
                    name="salario"
                    aria-required
                    value={salario}
                    className="w-[100%] rounded border px-2 py-2 outline-none border-cyan-900 mb-2 text-cyan-900 placeholder:false font-bold dark:text-write dark:bg-cyan-600"
                    onChange={(e) => setSalario(e.target.value)}
                  />
                </label>
              </div>
              <label className="flex flex-col mt-2  text-cyan-900 dark:text-write">
                Porcentagem
                <input
                  id="porcentagem"
                  type="text"
                  name="porcentagem"
                  title="Ex: 20"
                  aria-required
                  value={perc}
                  className="w-[100%] rounded border border-t px-2 py-2 outline-none border-cyan-900 mb-1 text-cyan-900 placeholder:false font-bold dark:text-write dark:bg-cyan-600"
                  onChange={(e) => setPerc(e.target.value)}
                />
              </label>

              <div className="flex mt-2 ">
                <label className="flex flex-col text-cyan-900  dark:text-write">
                  Valor da mensalidade
                  <input
                    id="mensalidade"
                    type="text"
                    name="mensalidade"
                    title="Ex: 200.00"
                    required
                    aria-required
                    value={vlTotal}
                    className="w-[100%] rounded border border-t px-2 py-2 outline-none border-cyan-900 text-cyan-900 placeholder:false font-bold  dark:text-write dark:bg-cyan-600"
                    onChange={(e) => setValorMensal(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center ">
                <label className="mb-1 text-cyan-900  dark:text-write">
                  % da multa do boleto
                  <input
                    type="text"
                    className="w-[98%] border font-bold border-cyan-900 text-cyan-900 outline-none rounded px-2 py-2  dark:text-write dark:bg-cyan-600"
                    title="Números de boletos a serem gerados"
                    value={multa}
                    required
                    aria-required
                    onChange={(e) => setMulta(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <label className="text-cyan-900  dark:text-write">
                  Taxa diária de juros
                  <input
                    type="text"
                    className="w-[100%] border font-bold border-cyan-900 text-cyan-900 outline-none rounded mr-3 px-2 py-2  dark:text-write dark:bg-cyan-600"
                    title="Números de boletos a serem gerados"
                    value={juros}
                    required
                    aria-required
                    onChange={(e) => setJuros(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <label className="ml-2 mb-1 text-cyan-900  dark:text-write">
                  Quantidade de boletos
                  <input
                    type="text"
                    className="w-[100%] border font-bold border-cyan-900 text-cyan-900 outline-none rounded px-2 py-2  dark:text-write dark:bg-cyan-600"
                    title="Números de boletos a serem gerados"
                    value={agenda}
                    required
                    aria-required
                    onChange={(e) => setAgenda(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-1 ">
              <label className="flex flex-col">
                Referente ao mês?
                <select
                  id="data_pag"
                  name="data_pag"
                  className="h-10 w-[98%] border  border-cyan-900 rounded outline-none px-1 font-bold appearance-none  dark:text-write dark:bg-cyan-600"
                  value={mespag}
                  onChange={(e) => {
                    setMespag(e.target.value);
                  }}
                  aria-required
                  required={true}
                  title="É necessário definir o mês referente"
                >
                  <option>Referente mês</option>
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

              <div>
                <label className="flex flex-col">
                  Mês da cobrança?
                  <select
                    id="mes"
                    name="mes"
                    className="h-10 w-[98%] border  border-cyan-900 rounded outline-none px-1 font-bold appearance-none  dark:text-write dark:bg-cyan-600"
                    value={mes}
                    onChange={(e) => {
                      setMes(e.target.value);
                    }}
                    aria-required
                    required={true}
                    title="É necessário definir o mês que será cobrado"
                  >
                    <option>Mês Cobrança</option>
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
              </div>
              <label className="flex flex-col text-cyan-900  dark:text-write">
                Ano da Cobrança:
                <select
                  id="data_pag"
                  name="data_pag"
                  className="h-10 w-[98%] border  border-cyan-900 rounded outline-none px-1 font-bold appearance-none dark:bg-cyan-600  dark:text-write"
                  value={ano}
                  onChange={(e) => {
                    setAno(e.target.value);
                  }}
                  aria-required
                  required={true}
                  title="É necessário definir o mês referente"
                >
                  <option>Ano Cobrança</option>
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

              <label className="flex flex-col text-cyan-900  dark:text-write">
                Data de Pagamento
                <input
                  id="data_pag"
                  name="data_pag"
                  className="h-10 w-[98%] border font-bold text-cyan-900 border-cyan-900 rounded outline-none px-1 appearance-none dark:bg-cyan-600  dark:text-write"
                  value={datainicial}
                  disabled
                  onChange={(e) => {
                    setDatapag(e.target.value);
                  }}
                  required={true}
                  aria-required
                  title="É necessário definir uma data de pagamento"
                />
              </label>
            </div>
          </div>
          {(() => {
            switch (gera) {
              case true:
                return (
                  <div className="flex flex-col border w-[100%] rounded-lg p-3 gap-3 mt-2 mb-3">
                    <div>
                      <h2 className="flex font-bold text-lg">
                        Tipo de envio do boleto {Envio()}
                      </h2>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="checkbox"
                        className="px-2 py-2 border mr-1"
                        onChange={() => setEnvio("2")}
                      />
                      <label htmlFor="">Montar Boleto</label>

                      <input
                        type="checkbox"
                        className="px-2 py-2 border mr-1 ml-12"
                        onChange={() => setEnvio("3")}
                      />
                      <label htmlFor="">Agendamentos F2B</label>
                      <input
                        type="checkbox"
                        className="px-2 py-2 border mr-1 ml-12"
                        onChange={() => setEnvio("1")}
                      />
                      <label htmlFor="">Boleto F2B</label>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
          {/* <div className="flex items-center ml-3 space-x-2 rounded-b  border-gray-200 dark:border-gray-600">
            <button
              className=" bg-green-500 border-none rounded  text-write w-40 py-2"
              title="Confira se não esqueceu de preencher algum campo"
              onClick={() => {
                GerarBoleto(
                  n_fantasia,
                  email,
                  datainicial,
                  vlTotal,
                  agenda,
                  mult,
                  jur,
                  datapag,
                  mespag
                );
                handleBoletosCliente();
              }}
            >
              Enviar
            </button>
          </div> */}

          <Siderbar />
        </form>
      </div>
    </div>
  );
}
