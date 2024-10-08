import { MagnifyingGlass } from "phosphor-react";
import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocation, useNavigate } from "react-router-dom";

export interface ClientesProps {
  id: number;
  parceiro_id: number;
  name: string;
  email: string;
  cnpj: string;
  statusCliente: string;
  n_fantasia: string;
  ativo: boolean;
  telefone: string;
  tel_contato: string;
  cidade: string;
  rz_social: string;
  bloqueado: boolean;
  paceiro: {
    id: number;
    nome: string;
  };
}


export function Pesquisa() {
  const [busca, setBusca] = useState<ClientesProps[]>([]);
  const [ativo, setAtivo] = useState(true);
  const [q, setQ] = useState("");
  const [consulta, setConsulta] = useState("");


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.post(`/clientesearch`, {
      consulta
    }).then((response)=>{
      setBusca(response.data)
    });      
  }, [consulta]);

  useEffect(() => {
    api.get(`/cliente`).then((response) => {
      setBusca(response.data);      
    });
  }, []);
 

   async function updateStateCliente(id: number) {
    document.getElementById("botao_ativar");
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      //window.location.reload();
    });
    try {
      const response = await api.put(`/cliente/${id}`);
      JSON.stringify({
        id: Number,
        ativo: true,
      });

    } catch (error) {
      alert("algo deu errado");
    }
    
  }
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
      return 
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
      });
      alert("Editado");
    } catch (error) {
      alert("Não foi possivel editar os dados");
    }
  }

  function handleInputChange(id: number) {
    if (id != null) {
      setAtivo(!ativo);
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
      return 
    } catch (error) {
      alert("algo deu errado");
    }
  }

  return (
    <div className="flex flex-col w-[98%] items-center justify-center mt-20 z-50 text-cyan-900">
      <div className="overflow-x-auto">
        <div className="justify-start py-8 px-2 fixed sm:rounded-sm bg-cyan-900 w-[75%]">
         
          <div className="relative justify-center">
            <button className="flex items-center absolute inset-y-0  pl-2 cursor-pointer">
              <MagnifyingGlass size={16} weight="light" className="z-50 font-bold " />
            </button>

            <input
              type="text"
              id="consulta"
              className="flex p-2 pl-8 text-sm text-cyan-300 rounded-lg border border-cyan-300 outline-0 w-96 sm:w-[96%] xl:w-[99%]"
              placeholder="Pesquisar cliente, cnpj, nome fantasia, razão social"
              name="table-search-users"
              value={consulta}
              onChange={(event) => setConsulta(event.target.value)}
            />
          </div>
        </div>

        <table className="w-[100%] divide-y text-sm text-left text-gray-500 dark:text-gray-400 sm:w-36 mt-32 table-auto resize-x md:resize">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 ">
            <tr>
            
              <div className="fixed top-40 w-[75%] bg-cyan-900 text-write gap-3">
                <th scope="col" className=" pl-2">
                  CNPJ
                </th>
                <th scope="col" className="pl-28">
                  Nome Fantasia
                </th>
                <th scope="col" className="pl-10">
                  Razão Social
                </th>
                <th scope="col" className="pl-6  tracking-wider">
                  Cidade
                </th>
                <th scope="col" className="pl-10  tracking-wider">
                  Contato
                </th>
                <th scope="col" className="px-1  tracking-wider">
                  Telefone
                </th>
                <th scope="col" className="pl-8  tracking-wider" >
                  Parceiro
                </th>

                <th scope="col" className="pl-12  tracking-wider">
                  Ações
                </th>

              </div>
              {/* <th scope="col" className="px-4" >
                            Excluir
                        </th> */}
            </tr>
          </thead>
          <tbody className="divide-y">
            {busca
              .filter((valor) => {
                if (q === "") {
                  return valor;
                }
                if (
                  valor.rz_social.toLowerCase().includes(q.toLowerCase()) ||
                  valor.rz_social == q
                ) {
                  return valor;
                }
                if (valor.cnpj == q) {
                  return valor.cnpj;
                }
              })
              .map((busca, id) => (
                <tr
                  key={id}
                  className="bg-white border-b w-[98%]"
                >
                  
                  <td className="items-center justify-center tracking-wider">
                    <div>
                      {(() => {
                        switch (busca.id && busca.ativo) {
                          case true:
                            return (
                              <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-green-300">
                                <span className="sr-only">Ativo</span>
                              </div>
                            );

                          case false:
                            return (
                              <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-red">
                                <span className="sr-only">Desativado</span>
                              </div>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </div>
                  </td>
                  <td className="tracking-wider">
                    <div>{busca.cnpj}</div>
                  </td>
                  <th className="flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"> */}
                    <div>
                      <div id="cliente_up" className="text-base font-semibold">
                        {busca.n_fantasia}
                      </div>
                      <div className="font-normal text-gray-500">
                        {busca.email}
                      </div>
                    </div>
                  </th>
                  <td className="tracking-wider">
                    <div>{busca.rz_social}</div>
                  </td>

                  <td>
                    <div className="tracking-wider">{busca.cidade}</div>
                  </td>
                  <td>
                    <div className="tracking-wider">{busca.name}</div>
                  </td>
                  <td>
                    <div className="tracking-wider">{busca.telefone}</div>
                  </td>
                  <td>
                    <div className="tracking-wider">{busca.paceiro.nome}</div>
                  </td>
                  <td>
                    {/* <!-- Modal toggle --> */}
                    <form className="flex">
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
                                  updateStateCliente(busca.id);
                                }}
                                data-modal-toggle="editUserModal"
                                className="  text-write font-thin hover:underline bg-green-500 px-4 p-2 rounded"
                              >
                                Ativar
                              </button>
                            );
                          case true:
                            return (
                              <button
                                type="submit"
                                name="update-desativado"
                                id="botao_desativar"
                                value={busca.id}
                                onClick={() => {
                                  updateStateCliente(busca.id);
                                }}
                                data-modal-toggle="editUserModal"
                                className="font-normal text-write  hover:underline bg-red px-1 p-2 rounded"
                              >
                                Desativar
                              </button>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </form>
                  </td>

                  <td className="">
                    <div className="flex gap-1">
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
                                  updateStateClienteBloqueio(busca.id);
                                }}
                                className="font-normal text-write bg-red hover:underline px-1 p-2 rounded"
                              >
                                Bloquear
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
                                  updateStateClienteBloqueio(busca.id);
                                }}
                                className="font-thin text-xs text-write bg-green-500 hover:underline px-1 p-2 rounded"
                              >
                                Desbloquear
                              </button>
                            );
                        }
                      })()}
                    </div>
                  </td>
                  <td className="py-4 ">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          type="button"
                          data-modal-toggle="editUserModal"
                          className="font-normal hover:underline bg-cyan-900 text-write rounded ml-1 px-1 p-2 tracking-wider"
                          onClick={() => {
                            handleInputChange(busca.id);
                          }}
                        >
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal accessKey="id">
                        <Dialog.Overlay className="w-full inset-0 fixed" />

                        <Dialog.Content className="text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                          <div
                            id="editUserModal"
                            tabIndex={1}
                            aria-hidden="true"
                            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full sm:rounded-sm"
                          >
                            <div className="relative w-full max-w-2xl h-full md:h-auto">
                              {/* <!-- Modal content --> */}
                              <form
                                onSubmit={updateDadosCliente}
                                className="relative bg-cyan-300 rounded-lg shadow dark:bg-cyan-700"
                              >
                                {/* <!-- Modal header --> */}
                                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Dados do Cliente
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
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="first-name"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Nome do Contato
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        defaultValue={busca.name}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="last-name"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        CNPJ
                                      </label>
                                      <input
                                        type="text"
                                        name="cnpj"
                                        id="cnpj"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        defaultValue={busca.cnpj}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="last-name"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Nome Fantasia
                                      </label>
                                      <input
                                        type="text"
                                        name="n_fantasia"
                                        id="n_fantasia"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        defaultValue={busca.n_fantasia}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="email"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Razão Social
                                      </label>
                                      <input
                                        type="text"
                                        name="rz_social"
                                        id="rz_social"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="example@company.com"
                                        defaultValue={busca.rz_social}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="phone-number"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Telefone
                                      </label>
                                      <input
                                        type="text"
                                        name="telefone"
                                        id="telefone"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="(32)9999-1789"
                                        defaultValue={busca.telefone}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="department"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        email
                                      </label>
                                      <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Telefone de contato"
                                        required={true}
                                        defaultValue={busca.email}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="company"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Telefone Contato
                                      </label>
                                      <input
                                        type="text"
                                        name="tel_contato"
                                        id="tel_contato"
                                        placeholder="(32)9999-1789"
                                        required={true}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={busca.tel_contato}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="current-password"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Cidade
                                      </label>
                                      <input
                                        type="text"
                                        name="Cidade"
                                        id="Cidade"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={busca.cidade}
                                        required={true}
                                      />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="new-password"
                                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Nova Senha
                                      </label>
                                      <input
                                        type="password"
                                        name="new-password"
                                        id="new-password"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                        required={true}
                                      />
                                    </div>
                                  </div>
                                  {/* <!-- Modal footer --> */}
                                  <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button
                                      type="submit"
                                      className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                                      onChange={updateDadosCliente}
                                    >
                                      Save all
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
                  </td>
                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
