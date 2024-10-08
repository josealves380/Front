import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { Button } from "../components/Button";
import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";
import {
  ArrowsCounterClockwise,
  Pencil,
  Plus,
  Trash,
  Upload,
  Wrench,
} from "phosphor-react";

import TesteBoletos from "../components/TesteBoletos";
import { Link } from "react-router-dom";
import { ParceiroProps } from "../types/ParceiroProps";
import { boletosProps } from "../types/BoletosProps";
import { ConvertNumber } from "../components/ConvertNumber";
import { TextInput } from "../components/TextInput";

type Status = "waiting" | "sending" | "success" | "enviando";
const statusMessages = {
  sending: "Sending...",
  success: "Sucesso!",
  enviando: "Enviando...",
};
export default function BoletosApi() {
  const [boletos, setBoletos] = useState<boletosProps[]>([]);
  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);
  const [parceiroid, setIdParceiro] = useState(0);
  const [status, setStatus] = useState<Status>("waiting");
  const [boletoId, setBoletoId] = useState<string[]>([]);
  console.log(boletoId);
  const [isCheck, setIsCheck] = useState(false);
  const [ativar, setAtivar] = useState(false);
  const [basic, setBasic] = useState("");
  const [total, setTotal] = useState(0);
  const [qtdBoleto, setQTDBoleto] = useState(0);
  const [aparecer, setAparecer] = useState(false);
  const userId = localStorage.getItem("Id");

  //const basic = localStorage.getItem("basic");

  const idParceiro = localStorage.getItem("idParceiro");
  console.log(idParceiro);
  const nivel = localStorage.getItem("Nivel");
  //const userId = localStorage.getItem("Id");
  useMemo(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
  useEffect(() => {
    api.get(`/boletos/${idParceiro}`).then((response) => {
      setBoletos(response.data);
      //console.log("boleto", response.data);
    });
  }, [idParceiro]);
  function boletobreak() {
    return (
      <div>
        <p>Enviado com sucesso!!!</p>
      </div>
    );
  }

  function consulta(id: number) {
    api.get(`/boletos/${id}`).then((response) => {
      setBoletos(response.data);
      //console.log("consulta",response.data)
    });
  }
  function somar() {
    const total = boletos
      .map((boletos) => boletos.valor_documento)
      .reduce((total, valor_documento) => total + valor_documento);
    setTotal(total);
  }

  async function enviar() {
    try {
      setStatus("enviando");
      boletos.map((boletos) => {
        if (boletos.status == "ativo") {
          TesteBoletos(
            boletos.email,
            boletos.data_vencimento,
            boletos.valor_documento,
            boletos.obs_corpo,
            boletos.id,
            boletos.cep,
            boletos.bairro,
            boletos.cnpj,
            boletos.ibge,
            boletos.endereco,
            boletos.cidade,
            boletos.rz_social,
            boletos.numero,
            boletos.estado,
            basic
          );
        }
      });
      //boletobreak()
      setStatus("success");
      //alert("Enviado com sucesso");
      setBoletos([]);
    } catch (error) {
      alert("Não foi possível enviar os boletos");
    }
  }
  function Contador() {
    const qtd = boletos.map((boletos) => boletos.id).length;

    setQTDBoleto(qtd);
  }
  function desativar() {
    try {
      boletos.map((boletos) => {
        if (boletos.status == "ativo") {
          updateStatusBoleto(boletos.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStateGeraBoleto(cliente_id: number) {
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
      //console.log(response.data);
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
      //console.log(response.data)
    });
  }, []);
  function ativarVal() {
    //alert("executou")
    setAtivar(true);
  }
  async function updateStatusBoleto(id: number) {
    // addEventListener("submit", (e) => {
    //   e.preventDefault();
    //window.parent.location = window.parent.location.href
    //window.location.reload();
    //});
    try {
      const response = await api.put(`/upstatusboleto/${id}`, {
        status: "enviado",
      });
      //alert("Deletado com sucesso")
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteBoleto(id: number) {
    document.getElementById("delete");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.delete(`/boletodelete/${id}`);
      JSON.stringify({
        id: Number,
      });
      // console.log(response.data)
      //alert("Tem certeza que vai excluir esse boleto ");
      api.get(`/boletos/${idParceiro}`).then((response) => {
        setBoletos(response.data);
      });
      // return window.location.reload();
    } catch (error) {
      console.log("algo deu errado");
    }
  }
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setBoletoId([...boletoId, checkboxId]);
    } else {
      setBoletoId(boletoId.filter((id) => id !== checkboxId));
    }
  };


  function handleBoletoSelecionados() {
    boletoId.map((boletoId) => {
      if (boletoId) {
        DeleteBoleto(parseInt(boletoId));
      }
    });
  }
  function handleBoletoCheck() {
    boletos.map((boletos) => {
      if (boletos.id && boletos) {
        DeleteBoleto(boletos.id);
      }
    });
  }
  function Logged() {
    if (nivel == "1") {
      return (
        <>
          <div className="md:ml-36">
            <h2>
              Selecione o parceiro para consultar os boletos que não foram
              enviados
            </h2>
          </div>
          <div className="md:grid md:grid-cols-1 flex flex-col justify-center items-center md:p-4 md:max-w-screen-lg md:ml-32 gap-2">
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
                          consulta(parceiro.id);
                          localStorage.setItem(
                            "idParceiro",
                            parceiro.id.toString()
                          );
                        }}
                        className="w-4 h-4"
                        title="Escolher o parceiro antes de consultar e enviar os boletos"
                        aria-required
                        required
                      />
                    </td>
                    <td>
                      <span className="flex flex-col text-md uppercase">
                        {parceiro.nome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }
  return (
    <div className="flex w-full md:ml-16 ml-6 mt-24 text-cyan-900">
      <div className="w-full overflow-x-auto relative shadow-sm sm:align-baseline">
        <HeaderClient />
        {/* <!--Tabs navigation--> */}

        <div className="flex flex-col mt-16 md:ml-16 gap-3">
          {/* <Link to={"/geratodosboletos"}>
            <Button title="Gerar todos os boletos">Gerar boletos</Button>
          </Link> */}
          {/* <Link to={"/alterstatus"}> */}
          
        <h1 className="font-bold text-2xl ml-36 mb-8">Enviar Boletos para F2B</h1>
          {Logged()}
        </div>
        <table className="w-full max-w-[95%] mt-6 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360">
            <tr className="border-b">
              <th scope="col" className="">
                <div className="flex items-end  justify-end">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={isCheck}
                    onChange={() => {
                      setIsCheck(true);
                    }}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>

              <th scope="col" className="flex px-3">
                Nome
              </th>
              <th>Expedição</th>
              <th>Referente</th>
              <th className="">valor</th>
              <th scope="col" className="">
                Vencimento
              </th>

              <th scope="col" className="">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {boletos.map((boletos, boleto_id) => (
              <tr
                key={boleto_id}
                className="bg-write border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4">
                  <div className="flex items-center justify-center ml-16">
                    <input
                      id={boletos.id.toString()}
                      checked={isCheck}
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      onClick={()=>setAparecer(true)}
                      className="w-5 h-5 border border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>

                <td className="px-3 w-[50%]">
                  <span className="font-bold uppercase ">
                    {boletos.n_fantasia}
                  </span>
                  <br />

                  <span className="">{boletos.email}</span>
                </td>
                <td className="flex items-center justify-center">{(boletos.data_gerada).substring(0,10)}</td>
                <td>
                  <div className="flex justify-center items-center">
                    {boletos.obs_corpo}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {ConvertNumber(boletos.valor_documento.toString())}
                  </div>
                </td>
                <td className="flex justify-center items-center mt-3">
                  <div>{boletos.data_vencimento}</div>
                </td>

                <td className="mt-4">
                  <div className="flex justify-center items-center gap-2">
                    <Link to={"/editboleto"}>
                      <button
                        id="editar"
                        name="editar"
                        className={`font-bold hover:underline bg-cyan-900 text-write rounded py-3 px-1 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0`}
                        title="Editar boleto"
                        onClick={() => {
                          localStorage.setItem(
                            "boletoid",
                            boletos.id.toString()
                          );
                        }}
                      >
                        <Pencil size={24} weight="light" />
                      </button>
                    </Link>
                    <button
                      name="gerar"
                      type="button"
                      id="gerar"
                      data-modal-toggle="editUserModal"
                      className="text-write bg-green-500 hover:underline py-3 px-1 rounded uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                      title="Enviar este boleto"
                      onClick={() => {
                        TesteBoletos(
                          boletos.email,
                          boletos.data_vencimento,
                          boletos.valor_documento,
                          boletos.obs_corpo,
                          boletos.id,
                          boletos.cep,
                          boletos.bairro,
                          boletos.cnpj,
                          boletos.ibge,
                          boletos.endereco,
                          boletos.cidade,
                          boletos.rz_social,
                          boletos.numero,
                          boletos.estado,
                          basic
                        );
                        //desativar();
                      }}
                    >
                      <Upload className="w-6 h-6" size={24} />
                    </button>
                    <button
                      id="delete"
                      name="delete"
                      className={`flex justify-center items-center bg-red-600 rounded px-1 py-3 text-write`}
                      title="Deletar boleto"
                      value={boletos.id}
                      onClick={() => {
                        DeleteBoleto(boletos.id);
                      }}
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center ml-40 gap-3 font-bold">
        <div className="flex md:ml-36 gap-2">
            <Button
              disabled={status != "waiting"}
              title="Enviar todos os boletos"
              onClick={() => {
                enviar();
                //desativar();
              }}
            >
              {status === "waiting" ? (
                <>
                  Enviar F2B
                  <Upload className="w-4 h-4 ml-2" />
                </>
              ) : (
                statusMessages[status]
              )}
            </Button>
            {/* <Button
              disabled={status != "waiting"}
              title="Finalizar e desativar todos os boletos"
              onClick={() => {
                //enviar();
                desativar();
              }}
            >
              Finalizar
            </Button> */}
          </div>
          <span className="mr-2">Número de Boletos gerados: {qtdBoleto}</span>
          <button
            className="bg-cyan-900 text-write py-3 px-4 rounded mt-2 uppercase outline-none sr-only"
            title="Click se não aparecer a soma"
            onClick={() => {
              somar();
              Contador();
            }}
          >
            <Plus size={32} />
          </button>
          <span>Total: {ConvertNumber(total.toString())} R$</span>
          <button
            className="bg-cyan-900 text-write py-3 px-4 rounded mt-2 uppercase outline-none"
            title="Click para atualizar o valor total"
            onClick={() => {
              somar();
              Contador();
            }}
          >
            <ArrowsCounterClockwise size={32} />
          </button>
        </div>
        <div className="m-4">
          {(() => {
            switch (ativar) {
              case true:
                return (
                  <div>
                    <button
                      title="Excluir todos os boletos selecionados"
                      className="flex justify-center items-center  w-72 rounded py-3 "
                      onClick={() => handleBoletoSelecionados()}
                    >
                      {" "}
                      <Trash size={24} className="text-red-600" />
                    </button>
                  </div>
                );
            }
          })()}
          {(() => {
            switch (aparecer) {
              case true:
                return (
                  <TextInput.Root>
                    <TextInput.Input
                      type="button"
                      defaultValue={"Ações"}
                      required
                      aria-required
                      onClick={ativarVal}
                      className="w-[100%] h-[100%] px-24 cursor-pointer"
                      title="Realizar ações em boletos selecionados"
                    />
                    <TextInput.ICon>
                      <Wrench size={32} weight="light" />
                    </TextInput.ICon>
                  </TextInput.Root>
                );
            }
          })()}
          {(() => {
            switch (isCheck) {
              case true:
                return (
                  <div>
                    <button
                      title="Excluir todos os boletos selecionados"
                      className="flex justify-center items-center  bg-red-500  w-72 rounded py-3 "
                      onClick={() => handleBoletoCheck()}
                    >
                      {" "}
                      <Trash size={24} className="text-write" />
                    </button>
                  </div>
                );
            }
          })()}
        </div>
      </div>
      <Siderbar />
    </div>
  );
}
