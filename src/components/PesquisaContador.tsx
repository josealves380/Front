import {
  CurrencyCircleDollar,
  HeartBreak,
  LockSimple,
  LockSimpleOpen,
  MagnifyingGlass,
  Money,
  Pencil,
  X,
} from "phosphor-react";
import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";

import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ContadorProps } from "../types/ContadorProps";



export function PesquisaCont() {
  const [busca, setBusca] = useState<ContadorProps[]>([]);
  const [ativo, setAtivo] = useState(true);

  const [consulta, setConsulta] = useState("");
  const [valor, setValor] = useState("")
  const [perc, setPerc] = useState("")
  const [salario, setSalario] = useState("")
  const valor_cliente = ((parseFloat(salario) * parseFloat(perc))/100).toString()
  const location = useLocation();
  const navigate = useNavigate();

 

  useEffect(() => {
    api
      .post(`/contadorsearch`, {
        consulta,
      })
      .then((response) => {
        setBusca(response.data);
      });
  }, [consulta]);

  useEffect(() => {
    api.get(`/contador/all`).then((response) => {
      setBusca(response.data);
    });
  }, []);

  async function updateStateContador(id: number) {
    document.getElementById("botao_ativar");
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.put(`/contador/${id}`);
      JSON.stringify({
        id: Number,
        ativo: true,
      });
    } catch (error) {
      alert("algo deu errado");
    }
  }
  async function updateStateContadorBloqueio(id: number) {
    document.getElementById("bloqueio");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/contadorBloqueio/${id}`);
      JSON.stringify({
        id: Number,
        ativo: true,
      });
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  async function updateDadosContador(event: FormEvent) {
    event.preventDefault();
    window.location.reload();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await api.post("/contador/update", {
        email: data.email,
        name: data.name,
        cnpj: data.cnpj,
        rz_social: data.rz_social,
        telefone: data.telefone,
      });
      alert("Editado");
    } catch (error) {
      alert("não foi possivel editar os dados");
    }
  }

  async function updateValorContador(id: number) {
    document.getElementById("configcontador");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      await api.put(`/valorcliente/${id}`, {
        valor_cliente: valor_cliente
      });
      console.log("Editado");
    } catch (error) {
      alert("Não foi possivel editar o valor");
    }
  }
  function handleInputChange(id: number) {
    if (id != null) {
      setAtivo(!ativo);
      const idP = id.toString();
      localStorage.setItem("idcontador", idP);
    } else {
    }
  }
  function contasReceberClientes(email: string) {
    localStorage.setItem("emailboleto", `${email}`);
  }
  async function deleteContador(id: number) {
    document.getElementById("delete");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.delete(`/contador/${id}`);
      JSON.stringify({
        id: Number,
      });
      alert("Tem certeza que vai excluir esse contador");
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  return (
    <div className="flex w-full items-center justify-center mt-24 text-cyan-900 z-50">
      <div className="w-full overflow-x-auto relative shadow-sm sm:align-baseline z-0">
        <div className="flex items-center justify-center w-full pb-4 ">
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
              placeholder="Procurar contador"
              value={consulta}
              onChange={(event) => setConsulta(event.target.value)}
            />
          </div>
        </div>

        <table className="w-full ml-16 mr-2 max-w-[95%]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360">
            <tr className="border-b">
              <th scope="col" className="flex justify-start items-start">
                CNPJ
              </th>
              <th scope="col" className="px-2">
                Status
              </th>
              <th scope="col" className="pr-32">
                Nome
              </th>
              <th scope="col" className="">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {busca.map((busca, id) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="flex flex-col mt-2">
                  <span className="font-bold uppercase">{busca.rz_social}</span>
                  {busca.cnpj}
                </td>
                <td className="">
                  {(() => {
                    switch (busca.id && busca.ativo) {
                      case true:
                        return (
                          <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-green-300 ml-4">
                            <span className="ml-4">Ativo</span>
                          </div>
                        );

                      case false:
                        return (
                          <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-red-600 ml-4">
                            <span className="ml-4">Desativado</span>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })()}
                </td>
                
                  <td className="text-gray-900 dark:text-white">
                    <span className="font-bold uppercase ml-28">
                      {busca.nome}
                      <br />
                      <p className="font-light ml-28">{busca.email}</p>
                    </span>
                  </td>
                

                <td className="px-4 gap-2">
                  <form className="flex justify-center items-center gap-4 ">
                    {(() => {
                      switch (busca.ativo) {
                        case false:
                          return (
                            <button
                              type="submit"
                              name="update-ativo"
                              id="botao_ativar"
                              title="Ativar contador"
                              value={busca.id}
                              onClick={() => {
                                updateStateContador(busca.id);
                              }}
                              data-modal-toggle="editUserModal"
                              className="flex justify-center items-center rounded font-medium text-write bg-red-600 w-10 ml-3 py-3 hover:underline"
                            >
                              <HeartBreak size={24} weight="light" />
                            </button>
                          );
                        case true:
                          return (
                            <button
                              type="submit"
                              name="update-desativado"
                              id="botao_desativar"
                              title="Desativar contador"
                              value={busca.id}
                              onClick={() => {
                                updateStateContador(busca.id);
                              }}
                              data-modal-toggle="editUserModal"
                              className="flex justify-center items-center font-medium text-write bg-green-500 w-10 py-3 ml-3 rounded hover:underline"
                            >
                              <X size={24} weight="light" />
                            </button>
                          );
                        default:
                          return null;
                      }
                    })()}

                    <div className="flex">
                      {(() => {
                        switch (busca.bloqueio) {
                          case false:
                            return (
                              <button
                                name="bloqueio"
                                type="submit"
                                id="bloqueio"
                                title="Bloqueiar contador"
                                data-modal-toggle="editUserModal"
                                onClick={() => {
                                  updateStateContadorBloqueio(busca.id);
                                }}
                                className="flex justify-center items-center w-10 py-3 font-medium rounded text-write bg-green-500 hover:underline"
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
                                title="Desbloqueiar contador"
                                data-modal-toggle="editUserModal"
                                onClick={() => {
                                  updateStateContadorBloqueio(busca.id);
                                }}
                                className="flex justify-center items-center font-medium w-10 py-3 rounded text-write bg-red-600 hover:underline"
                              >
                                <LockSimple size={24} weight="light" />
                              </button>
                            );
                        }
                      })()}
                    </div>
                    <Link to={"/boletoscliente"}>
                    <button
                      className="flex justify-center items-center font-medium w-10 py-3 rounded text-write bg-opacity-90 bg-cyan-900 hover:underline"
                      title="Visualizar boletos do cliente"
                      onClick={() => {
                        contasReceberClientes(busca.email);
                      }}
                    >
                      <CurrencyCircleDollar
                        size={24}
                        weight="light"
                        className="text-write"
                      />
                    </button>
                  </Link>

                    <Link to={"/editcontador"}>
                      <button
                        type="button"
                        data-modal-toggle="editUserModal"
                        title="Editar contador"
                        className="flex justify-center items-center rounded h-12 w-10 font-medium text-write bg-cyan-900 hover:underline"
                        onClick={() => handleInputChange(busca.id)}
                      >
                        <Pencil size={24} weight="light" />
                      </button>
                    </Link>
                    <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        id="configcontador"
                        name="configcontador"
                        className={`flex sr-only justify-center items-center  w-12 rounded px-2.5 py-2.5 text-write bg-cyan-700 rotate-90 `}
                        title="Configurar o valor que o contador paga por cliente"
                        value={busca.id}
                      >
                        <Money size={24} />
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
                            <form className="relative bg-cyan-700 rounded-lg text-write p-6">
                              {/* <!-- Modal header --> */}
                              <div className="flex justify-between items-start rounded-t  dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 text-write ml-4">
                                  Definir o valor por cliente pago pelo contador
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

                              <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1">
                                  <div className="col-span-2 sm:col-span-3">
                                    <span className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white w-full gap-2">
                                      Configurar o valor a ser pago por cliente
                                      pelo contador {busca.nome}
                                     
                                    </span>
                                   <div className="flex justify-start items-start">
                                   <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                                      Salário base
                                      <input
                                        type="text"
                                        name="name"
                                        className="bg-gray-50 border w-40 ml-12 text-cyan-900"
                                        placeholder=""
                                        required={true}
                                        value={salario}
                                        onChange={(e) => {
                                          setSalario(e.target.value)
                                        }}
                                      />
                                    </label>
                                   </div>
                                    <div className="flex justify-start items-start">
                                    <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                                      %
                                      <input
                                        type="text"
                                        name="name"
                                        className="bg-gray-50 border w-40 ml-12 text-cyan-900"
                                        placeholder=""
                                        required={true}
                                        value={perc}
                                        onChange={(e) => {
                                          setPerc(e.target.value)
                                        }}
                                      />
                                    </label>
                                    </div>
                                    <div className="flex justify-start items-start">
                                    <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white ml-12 gap-2">
                                      Valor por cliente
                                      <input
                                        type="text"
                                        name="name"
                                        className="bg-gray-50 border w-40 text-cyan-900"
                                        placeholder=""
                                        required={true}
                                        value={valor_cliente}
                                        onChange={(e) => {
                                          setValor(e.target.value)
                                        }}
                                      />
                                    </label>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t">
                                  <button
                                    type="submit"
                                    className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                                    onClick={() => {
                                      updateValorContador(busca.id)
                                    }}
                                  >
                                    Salvar
                                  </button>
                                  <Dialog.Close asChild>
                                    <button
                                      className="border-none rounded bg-cyan-900 text-write w-40 py-2"
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
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
