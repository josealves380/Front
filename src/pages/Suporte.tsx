import { useEffect, useMemo, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { Button } from "../components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowsCounterClockwise,
  Check,
  ClockClockwise,
  CloudArrowUp,
  X,
} from "phosphor-react";
import { Refresh } from "../services/refresh";
import { useParams } from "react-router-dom";

interface SuporteProps {
  id: number;
  problema_relatado: string;
  empresa: string;
  status_sup: boolean;
  historico: string;
  solucao: string;
  tipo_sist: string;
  telefone: string;
  atendente: string;
  data_ini: string;
}

export default function Suporte() {
  const [suporte, setSuporte] = useState<SuporteProps[]>([]);
  const [historico, setHistorico] = useState("");
  const [atendente, setAtendente] = useState("");
  const [solucao, setSolucao] = useState("");
  //console.log(atendente);
  
  const nivel = useMemo(() => {
    return localStorage.getItem("Nivel");
  }, []);

  // const ref = localStorage.getItem("new");
  // useEffect(() => {
  //   if (ref) {
  //     const interval = setInterval(() => {
  //       Refresh(ref);
  //     }, 1000);
  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   }
  // }, [ref]);
  useEffect(() => {
    const interval = setInterval(() => {
      api.get("/suporte").then((response) => {
        setSuporte(response.data);
        //console.log(response.data);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [atendente]);
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      api.get("/suporte").then((response) => {
        setSuporte(response.data);
      });
    }, 100000);
    //Clearing the interval
    return () => clearInterval(interval);
  }, [solucao]);
  async function updateStatus(id: number) {
    try {
      const response = await api.put(`/upsuporte/${id}`, {
        historico: "Atendendo",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //função para definir o status como Cancelado
  async function updateStatusCancelar(id: number) {
    try {
      const response = await api.put(`/upsuporte/${id}`, {
        historico: "Cancelado",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
//Define o status como concluido
  async function updateStatusConcluir(id: number) {
    try {
      const response = await api.put(`/upsuporte/${id}`, {
        historico: "Concluído",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Função para atualizar a solução do problema
  async function updateSolucao(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });

    try {
      const response = await api.put(`/upsolucao/${id}`, {
        solucao: solucao,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
//atualiza o atendente do suporte
  async function updateAtendente(id: number) {
    document.getElementById("atendente");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    if (atendente != "") {
      try {
        const response = await api.put(`/upatendente/${id}`, {
          atendente: `${atendente}`,
        });

        setAtendente("");
      } catch (error) {
        console.log(error);
      }
    }
  }
//Restringe o acesso de quem esta logado
  function Logged() {
    if (nivel == "1") {
      return (
        <div className="flex gap-4 border-b">
          <h3 className="bold text-cyan-900 font-bold text-xl mb-4">Técnico</h3>
        </div>
      );
    }
  }

  return (
    <div className="w-full relative overflow-x-auto mt-32 md:ml-16 m-2">
      <header>
        <HeaderClient />
      </header>
      <h2 className="bold text-cyan-900 font-bold text-2xl border-b mb-4">
        Suporte
      </h2>

      <table className="w-[95%] mt-3 text-left text-sm dark:text-gray-400">
        <thead className="text-xs text-cyan-900 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b ">
          <tr>
            <th scope="col" className="px-5">
              Tickets
            </th>
            <th scope="col" className="px-5 sr-only">
              Status
            </th>
            <th>Telefone</th>
            <th>Sistema</th>
            <th scope="col" className="px-3">
              Problema
            </th>
            <th>Data</th>
            <th scope="col" className="px-8">
              Solução
            </th>
            <th scope="col" className="px-5">
              Situação
            </th>
            <th>Atendente</th>
            <th scope="col" className="mr-10 px-32">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {suporte.map((suporte, id) => (
            <tr
              key={id}
              data-cancel={suporte.historico == "Cancelado"}
              className={`bg-write border-b data-[cancel=true]:text-red-500
              ${
                suporte.historico == "em analise"
                  ? "bg-cyan-300 text-cyan-900"
                  : " text-cyan-900"
              } ${
                suporte.historico == "Concluído"
                  ? " bg-red text-green-500"
                  : "text-cyan-900"
              }`}
            >
              <td className="px-2">
                <div className="flex gap-2 text-xs uppercase">
                  <span>{suporte.id}</span>
                  <span>{suporte.empresa}</span>
                </div>
              </td>

              <td className="sr-only">
                -
                <div className="flex items-center px-3">
                  {(() => {
                    switch (suporte.id && suporte.status_sup) {
                      case true:
                        return (
                          <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-green-300 mb-6">
                            <span className="ml-4">Ativo</span>
                          </div>
                        );

                      case false:
                        return (
                          <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-red text-write">
                            <span className="ml-4">Desativado</span>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })()}
                </div>
              </td>
              <td>{suporte.telefone}</td>
              <td>{suporte.tipo_sist}</td>
              <td className=" font-semibold text-xs uppercase px-3">
                {suporte.problema_relatado}
              </td>
              <td className="text-xs">
                {suporte.data_ini.substring(8, 10)}
                {suporte.data_ini.substring(4, 8)}
                {suporte.data_ini.substring(0, 4)}
              </td>
              <td
                data-cancel={suporte.historico == "Cancelado"}
                data-final={suporte.historico == "Concluído"}
                className="flex justify-center items-center font-light uppercase gap-2 data-[cancel=false]:mt-8 data-[final=true]:mb-8 text-xs"
              >
                <span>{suporte.solucao}</span>
                {(() => {
                  switch (nivel) {
                    case "1":
                      return (
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button
                              type="button"
                              data-final={suporte.historico == "Concluído"}
                              data-cancel={suporte.historico == "Cancelado"}
                              data-modal-toggle="editUserModal"
                              className="w-10 rounded-3xl data-[cancel=true]:sr-only data-[final=true]:sr-only"
                              title="Atualizar a solução"
                            >
                              <CloudArrowUp size={24} />
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
                                        Atualizar solução deste suporte
                                      </h3>
                                      <button
                                        type="button"
                                        data-final={
                                          suporte.historico == "Concluído"
                                        }
                                        data-cancel={
                                          suporte.historico == "Cancelado"
                                        }
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 data-[cancel=true]:sr-only data-[final=true]:sr-only hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="editUserModal"
                                      >
                                        {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>   */}
                                      </button>
                                    </div>
                                    {/* <!-- Modal body --> */}

                                    <div className="p-6 space-y-3">
                                      <div className="col-span-3 sm:col-span-3">
                                        <textarea
                                          placeholder="Informe a solução do problema aqui:"
                                          className="flex items-start justify-start self-start rounded p-2 h-3/4 w-screen max-w-screen-sm  mt-8 text-cyan-900 text-xs outline-none placeholder:text-cyan-900 cursor-pointer border"
                                          value={solucao}
                                          onChange={(event) =>
                                            setSolucao(event.target.value)
                                          }
                                        />
                                      </div>

                                      {/* <!-- Modal footer --> */}
                                      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                        <button
                                          type="submit"
                                          className="border-none rounded bg-green-500 text-write w-40 py-2"
                                          onClick={() =>
                                            updateSolucao(suporte.id)
                                          }
                                        >
                                          Atualizar
                                        </button>
                                        <Dialog.Close asChild>
                                          <button
                                            className="border-none rounded bg-red-600 text-write w-40 py-2"
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
                      );

                    default:
                      return null;
                  }
                })()}
              </td>
              <td className="px-4 uppercase text-xs">
                {(() => {
                  switch (nivel) {
                    case "1":
                      return <>{suporte.historico}</>;
                    case "2":
                      return <>{suporte.historico}</>;
                    case "3":
                      return <>{suporte.historico}</>;

                    case "4":
                      return <>{suporte.historico}</>;
                  }
                })()}
              </td>
              <td>
                {(() => {
                  switch (nivel) {
                    case "1":
                      return (
                        <div className="flex justify-center items-center">
                          <select
                            id="atendente"
                            name="atendente"
                            className="appearance-none w-20 outline-none"
                            value={suporte.atendente}
                            onChange={(e) => {
                              //updateAtendente(suporte.id);
                              setAtendente(e.target.value);
                            }}
                          >
                            <option value="">Selecione o Atendente</option>
                            <option value="José">José</option>
                            <option value="Evaldo">Evaldo</option>
                          </select>
                          <Button
                            data-cancel={suporte.historico == "Cancelado"}
                            data-final={suporte.historico == "Concluído"}
                            className="w-10 mb-4 rounded-3xl data-[cancel=true]:sr-only data-[final=true]:sr-only"
                            title="Atualizar o nome do atendente"
                            onClick={() => updateAtendente(suporte.id)}
                          >
                            <ArrowsCounterClockwise />
                          </Button>
                        </div>
                      );
                    case "2":
                      return <>{atendente}</>;
                    case "3":
                      return <>{atendente}</>;
                    case "4":
                      return <>{suporte.atendente}</>;

                    default:
                      return null;
                  }
                })()}
              </td>
              <td>
                <div className="flex gap-1 mb-4">
                  {(() => {
                    switch (nivel) {
                      case "1":
                        return (
                          <>
                            <Button
                              data-final={suporte.historico == "Concluído"}
                              data-cancel={suporte.historico == "Cancelado"}
                              title="Mudar o status para em atendimento"
                              onClick={() => {
                                updateStatus(suporte.id);
                              }}
                              className="ml-10 w-20 bg-cyan-900 data-[cancel=true]:sr-only data-[final=true]:sr-only mb-1"
                            >
                              <ClockClockwise size={24} />
                            </Button>

                            <Button
                              data-final={suporte.historico == "Concluído"}
                              data-cancel={suporte.historico == "Cancelado"}
                              title="Mudar status para concluído"
                              onClick={() => {
                                updateStatusConcluir(suporte.id);
                              }}
                              className="ml-0.5 w-20 data-[cancel=true]:sr-only data-[final=true]:sr-only bg-cyan-900 mb-1"
                            >
                              <Check size={24} />
                            </Button>
                            <Button
                              data-final={suporte.historico == "Concluído"}
                              data-cancel={suporte.historico == "Cancelado"}
                              title="Mudar status para cancelado"
                              onClick={() => {
                                updateStatusCancelar(suporte.id);
                              }}
                              className={`border-b ml-0.5 w-20 mb-1 data-[cancel=true]:sr-only data-[final=true]:sr-only text-gost`}
                            >
                              <X size={24} />
                            </Button>
                          </>
                        );
                      case "4":
                        return (
                          <Button
                            data-cancel={suporte.historico == "Cancelado"}
                            data-final={suporte.historico == "Concluído"}
                            onClick={() => {
                              updateStatusCancelar(suporte.id);
                            }}
                            className="ml-28 bg-cyan-700 mb-2 w-24 data-[final=true]:sr-only data-[cancel=true]:sr-only "
                          >
                            Cancelar
                          </Button>
                        );

                      default:
                        return null;
                    }
                  })()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Siderbar />
    </div>
  );
}
