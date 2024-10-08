import { HeartBreak, MagnifyingGlass, Pencil, Trash, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
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

export function PesquisaUsuarioCLiente() {
  const [user, setUser] = useState<UserProps[]>([]);
  const [consulta, setConsulta] = useState("")

  const nivelLogado = localStorage.getItem("Nivel")
  const paceiro_id = localStorage.getItem("idParceiro")

  useEffect(() => {
    api.post(`/usersearchparceiro/${paceiro_id}`, {
      consulta
    }).then((response) => {
      setUser(response.data)
    });
  }, [consulta]);
  useEffect(() => {
    api.get(`/user/cliente/${paceiro_id}`).then((response) => {
      setUser(response.data);
      console.log("r", response.data)
    });
  }, []);

  async function updateStateUser(id: string) {
    document.getElementById("botao_ativar");
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.put(`/user/${id}`);
      JSON.stringify({
        id: String,
        ativo: true,
      });
    } catch (error) {
      alert("algo deu errado");
    }
  }

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

      return window.location.reload();
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
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  return (
    <div className="flex w-full ml-16 mt-24 text-cyan-900">
      <div className="w-full overflow-x-auto relative shadow-sm sm:align-baseline">
      <div className="flex items-center justify-center w-full pb-4">
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
            placeholder="Procurar Usuários"
            value={consulta}
            onChange={(event) => setConsulta(event.target.value)}
          />
        </div>
      </div>
        {/* <!--Tabs navigation--> */}
        

      <table className="w-full max-w-[95%] ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360">
            <tr className="border-b">
              <th scope="col" className="">
                Status
              </th>
              
              <th scope="col" className="flex justify-start items-start ml-32">
                Name
              </th>
              <th scope="col" className="">
                Permissão
              </th>
                        
              <th scope="col" className="">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {user.map((user, id) => (
              <tr
                key={id}
                className="bg-write border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                
                <td className="ml-12">
                  <div className="ml-6">
                    {(() => {
                      switch (user.id && user.status) {
                        case true:
                          return (
                            <div className="flex flex-row ml-6 items-center h-2.5 w-2.5 rounded-full bg-green-300">
                              <span className="ml-4">Ativo</span>
                            </div>
                          );

                        case false:
                          return (
                            <div className="flex flex-row items-center h-2.5 w-2.5 rounded-full bg-red-600">
                              <span className="ml-4">Desativado</span>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </td>
                
                <td className="whitespace-nowrap">
                                     
                     <span className="font-bold ml-32"> {user.name}</span>
                    <br/>
                    
                      <span className="ml-32">{user.email}</span>
                    
                </td>
                <td className="">
                  {(() => {
                    switch (user.nivel) {
                      case "1":
                        return <span className="flex ml-6 justify-center items-center">administrador</span>;
                      case "2":
                        return <span className="flex mr-6 justify-center items-center" >parceiro</span>;
                      case "3":
                        return <span className="flex mr-6 justify-center items-center">suporte</span>;
                      case "4":
                        return <span className="flex mr-6 justify-center items-center">cliente</span>;
                      default:
                        return null;
                    }
                  })()}
                </td>
                

                <td className="flex items-center justify-center gap-2 mt-4">
                  <form className="flex">
                    {(() => {
                      switch (user.status) {
                        case false:
                          return (
                            <button
                              type="submit"
                              name="update-ativo"
                              id="botao_ativar"
                              value={user.id}
                              onClick={() => {
                                updateStateUser(user.id);
                              }}
                              data-modal-toggle="editUserModal"
                              className="font-medium bg-red-600 text-write dark:text-blue-500 w-10 rounded py-3 px-2 hover:underline"
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
                              title="Desativar usuário"
                              value={user.id}
                              onClick={() => {
                                updateStateUser(user.id);
                              }}
                              data-modal-toggle="editUserModal"
                              className="flex justify-center items-center font-medium text-write w-10 rounded py-3 bg-green-500 hover:underline"
                            >
                              <X size={24} weight="light" />
                            </button>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </form>
                                               
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        title="Editar usuário"
                        data-modal-toggle="editUserModal"
                        className="flex justify-center items-center dark:text-blue-500 hover:underline w-10 rounded py-3 bg-cyan-900 text-write"
                      >
                        <Pencil size={24} weight="light" />
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal accessKey="id">
                      <Dialog.Overlay className="w-full inset-0 fixed" />

                      <Dialog.Content className="text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-700 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                        <div
                          id="editUserModal"
                          tabIndex={1}
                          aria-hidden="true"
                          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full sm:rounded-sm"
                        >
                          <div className="relative w-full max-w-2xl h-full md:h-auto">
                            {/* <!-- Modal content --> */}
                            <form className="relative bg-cyan-700 rounded-lg shadow text-write dark:bg-cyan-700">
                              {/* <!-- Modal header --> */}
                              <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600 p-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-6">
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
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                      placeholder="Nome do usuário"
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
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                      title="Razão Social"
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
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
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
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                      title="Telefone de contato"
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
                                      title="Telefone de contato"
                                      required={true}
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                    />
                                  </div>
                                  {/* <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="current-password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                            <input type="password" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true}/ outline-none>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="new-password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                            <input type="password" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true}/ outline-none>
                                        </div> */}
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                  <button
                                    type="submit"
                                    className="border-none rounded bg-cyan-900 text-write w-40 py-2"
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
                
                  <button
                    id="delete"
                    name="delete"
                    className={`flex justify-center items-center bg-red-600 w-10 rounded py-3 text-write ${nivelLogado != "1" ? "hidden": "bg-write"}`}
                    title="Deletar Usuário"
                    value={user.id}
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    <Trash size={24} />
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      
    </div>
  );
}
