import { MagnifyingGlass } from "phosphor-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import * as Dialog from "@radix-ui/react-dialog";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  nivel: string;
  status: boolean;
  bloqueio: boolean;
}
interface parceiroProps {
  id: number;
}

export function PesquisaUsuarioParceiro() {
  const [user, setUser] = useState<UserProps[]>([]);
  const [parceiro, setParceiro] = useState<parceiroProps[]>([]);
  const [consulta, setConsulta] = useState("");

  const nivelLogado = localStorage.getItem("Nivel");

  useEffect(() => {
    api.get(`/parceiro/all`).then((response) => {
      setParceiro(response.data);
    });
  }, []);

 const updateUser = useCallback(async (id: string , event: FormEvent) => {
    event.preventDefault();
    
      document.getElementById("botao_ativar");
      try {
        const response = await api.put(`/user/${id}`);
        JSON.stringify({
          id: String,
          ativo: true,
        });
      } catch (error) {
        alert("algo deu errado");
      }
    
    
  }, []);
  async function deleteUser(id: string) {
    document.getElementById("delete");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.delete(`/user/${id}`);
      JSON.stringify({
        id: String,
      });
      alert("Tem certeza que vai excluir esse usuário ");

      return;
    } catch (error) {
      alert("algo deu errado");
    }
  }

  async function deleteRefreshToken() {
    const refresh = localStorage.getItem("@PermissionTY:token");

    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.delete(`/refresh/${refresh}`);
      JSON.stringify({
        id: String,
      });
      alert("Tem certeza que vai excluir esse usuário ");
      return;
    } catch (error) {
      alert("algo deu errado");
    }
  }

  return (
    <div className="flex justify-center items-center mt-24 text-cyan-900">
      <div className="overflow-x-auto relative shadow-sm sm:align-baseline">
        <div className="sm:flex justify-between items-center py-4 bg-white dark:bg-gray-800 sm:rounded-sm">
          <div className="relative sm:justify-center mt-4">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
              <MagnifyingGlass size={16} weight="light" className="m-2 " />
            </div>

            <input
              type="text"
              id="table-search-users"
              className="flex p-2 pl-10 w-80 text-sm rounded-lg border border-cyan-300 outline-0"
              placeholder="Procurar cliente"
              name="table-search-users"
              value={consulta}
              onChange={(event) => setConsulta(event.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:w-36 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360">
            <tr>
              <th scope="col">
                {/* <div className="flex items-center">
                                <input 
                                    id="checkbox-all-search" 
                                    name="checkbox-all-search"
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    
                                    />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div> */}
              </th>
              <th scope="col" className="flex mr-16 px-3">
                Status
              </th>
              <th scope="col" className="px-5">
                Name
              </th>
              <th scope="col" className="px-5">
                Permissão
              </th>
              <th scope="col"></th>

              <th scope="col" className="px-4">
                Ativação
              </th>

              <th scope="col" className="px-6">
                Editar
              </th>
              <th scope="col" className="px-10">
                Excluir
              </th>
            </tr>
          </thead>

          <tbody>
            {user.map((user, id) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>
                  <form className="flex items-center">
                    {/* <input 
                                    id="id_checkbox" 
                                    name="m"
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={user.id}
                                    />
                                    
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label> */}
                  </form>
                </td>
                <td>
                  <div className="flex items-center px-3">
                    {(() => {
                      switch (user.id && user.status) {
                        case true:
                          return (
                            <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-green-300">
                              <span className="ml-4">Ativo</span>
                            </div>
                          );

                        case false:
                          return (
                            <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-red">
                              <span className="ml-4">Desativado</span>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </td>
                <th className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                  {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"> */}
                  <div>
                    <div id="cliente_up" className="text-base font-semibold">
                      {user.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-5">
                  {(() => {
                    switch (user.nivel) {
                      case "1":
                        return <div>administrador</div>;
                      case "2":
                        return <div>parceiro</div>;
                      case "3":
                        return <div>suporte</div>;
                      case "4":
                        return <div>cliente</div>;
                      default:
                        return null;
                    }
                  })()}
                </td>
                <td></td>

                <td>
                  <form className="flex gap-4 px-3">
                    {(() => {
                      switch (user.status) {
                        case false:
                          return (
                            <button
                              type="submit"
                              name="update-ativo"
                              id="botao_ativar"
                              value={user.id}
                              onClick={(e) => {
                                updateUser(user.id, e );
                              }}
                              data-modal-toggle="editUserModal"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
                              value={user.id}
                              onClick={(e) => {
                              updateUser(user.id, e);
                              }}
                              data-modal-toggle="editUserModal"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

                {/* <td className="">
                             
                            <div className="flex gap-2">
                        {(() => {
                            switch (user.bloqueio) {
                                case false: 
                           return<button 
                                    id="bloqueio"
                                    name="bloqueio"
                                    type="submit"
                                    onClick={() =>{updateStateUserBloqueio(user.id)}} 
                                    data-modal-toggle="editUserModal" 
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-4">Bloquear
                                </button>
                                case true: 
                            return<button 
                                        id="desbloquieo"
                                        name="desbloqueio"
                                        type="submit"
                                        onClick={() =>{updateStateUserBloqueio(user.id)}} 
                                        data-modal-toggle="editUserModal" 
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Desbloquear
                                   </button>
                            }
                        })()}    
                            </div>
                        </td>           */}
                <td className="py-4 ">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        data-modal-toggle="editUserModal"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-5"
                      >
                        Editar
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
                            <form className="relative bg-cyan-300 rounded-lg shadow dark:bg-cyan-700">
                              {/* <!-- Modal header --> */}
                              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  Dados do Usuário
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
                                      Nome
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder=""
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
                                    />
                                  </div>
                                  {/* <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="current-password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                            <input type="password" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true}/>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="new-password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                            <input type="password" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true}/>
                                        </div> */}
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                  <button
                                    type="submit"
                                    className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                                  >
                                    Salvar
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
                <td className="px-4">
                  <button
                    id="delete"
                    name="delete"
                    className="bg-red w-28 rounded py-3 text-write"
                    value={user.id}
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
                {/* <td className="px-4">
                         <button
                            id="delete"
                            name="delete"
                            className="bg-red w-28 rounded py-3 text-write"
                            
                            onClick={()=>{deleteRefreshToken()}}>Excluir</button>
                        </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
