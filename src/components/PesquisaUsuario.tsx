import {
  Gear,
  HeartBreak,
  Lock,
  MagnifyingGlass,
  Money,
  Pencil,
  Trash,
  X,
} from "phosphor-react";
import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  nivel: string;
  status: boolean;
  bloqueio: boolean;
}

export function PesquisaUsuario() {
  const [user, setUser] = useState<UserProps[]>([]);
  const { Logout } = useAuth();
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [consulta, setConsulta] = useState("");
  const [salario, setSalario] = useState("1320,00");
  const [basic, setBasic] = useState("");
  const [id, setId] = useState("");
  console.log("user",id)
  const userId = localStorage.getItem("Id");
  const nivelLogado = localStorage.getItem("Nivel");

  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
  useEffect(() => {
    api
      .post(`/usersearch`, {
        consulta,
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [consulta]);
  async function getUserCliente() {
    api.get(`/user`).then((response) => {
      setUser(response.data);
    });
  }
  async function getUserParsa() {
    api.get("/userparsa").then((response) => {
      setUser(response.data);
    });
  }
  async function getUserSuporte() {
    api.get("/usersuporte").then((response) => {
      setUser(response.data);
    });
  }
  async function trocarSenha(id: string) {
    document.getElementById("botao_ativar");
    try {
      if(senha != senhaConfirmada){
        alert("É necessário digitar uma senha igual, tente novamente")
      }
      if(senha === senhaConfirmada){
      const response = await api.put("/updatesenha", {
        id: id,
        senha: senha,
      });
      //Logout();
      alert("Senha alterada com sucesso peça ao usuário que faça o login com a nova senha 🎉🙌🤩😃");
    }
    } catch (error) {
      alert("Erro ao tentar trocar a senha 😢");
    }
  }
  //função button para ativar e desativar usuários

  async function updateStateUser(id: string) {
    document.getElementById("botao_ativar");
    // addEventListener("submit", (e) => {
    //   e.preventDefault();
    //window.parent.location = window.parent.location.href
    //window.location.reload();
    // });
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
  async function encodeBasic() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.reload();
    });
    try {
      const response = await api.post("/f2b", {
        basic: basic,
        salario: parseFloat(salario),
        user_id: id, //setar id parceiro do localstorage
      });

      setSalario("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex w-full ml-16 mt-24 text-cyan-900">
      <div className="w-full overflow-x-auto relative shadow-sm sm:align-baseline">
        <div className="flex items-center justify-center w-full pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-10 w-[90%] mr-2">
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
        <ul
          className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <li role="presentation" className="flex-auto text-center">
            <Link
              to="#"
              className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-3 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-home01"
              data-te-nav-active
              role="tab"
              aria-controls="tabs-home01"
              aria-selected="true"
              onClick={getUserCliente}
            >
              Cliente
            </Link>
          </li>
          <li role="presentation" className="flex-auto text-center">
            <Link
              to="#"
              className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-profile01"
              role="tab"
              aria-controls="tabs-profile01"
              aria-selected="false"
              onClick={getUserParsa}
            >
              Parceiro
            </Link>
          </li>
          <li role="presentation" className="flex-auto text-center">
            <Link
              to="#"
              className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-profile01"
              role="tab"
              aria-controls="tabs-profile01"
              aria-selected="false"
              onClick={getUserSuporte}
            >
              Suporte
            </Link>
          </li>
          <li role="presentation" className="flex-auto text-center">
            <Link
              to="#"
              className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-home01"
              data-te-nav-active
              role="tab"
              aria-controls="tabs-home01"
              aria-selected="true"
            >
              Contador
            </Link>
          </li>
        </ul>

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
                  <span className="font-bold ml-32 uppercase">
                    {" "}
                    {user.name}
                  </span>
                  <br />

                  <span className="ml-32">{user.email}</span>
                </td>
                <td className="">
                  {(() => {
                    switch (user.nivel) {
                      case "1":
                        return (
                          <span className="flex ml-6 justify-center items-center uppercase">
                            administrador
                          </span>
                        );
                      case "2":
                        return (
                          <span className="flex mr-6 justify-center items-center uppercase">
                            parceiro
                          </span>
                        );
                      case "3":
                        return (
                          <span className="flex mr-6 justify-center items-center uppercase">
                            suporte
                          </span>
                        );
                      case "4":
                        return (
                          <span className="flex mr-6 justify-center items-center uppercase">
                            cliente
                          </span>
                        );
                      case "5":
                        return (
                          <span className="flex mr-6 justify-center items-center uppercase">
                            Contador
                          </span>
                        );
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
                              className="font-medium text-blue-600 dark:text-blue-500 w-10 rounded py-3 hover:underline"
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
                        id="f2b"
                        name="f2b"
                        className={`flex justify-center items-center bg-cyan-900 w-10 rounded py-3 text-write`}
                        title="Configuração de permissões de acesso a dados da f2b"
                        value={user.id}
                      >
                        <Gear size={24} />
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
                                  Configuração de acesso a F2b
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
                                    <label className="flex mb-2 text-md font-medium text-gray-900 dark:text-white w-full gap-2">
                                      Selecione para dar acesso ao {user.name} à
                                      F2b
                                      <input
                                        type="checkbox"
                                        name="name"
                                        className="bg-gray-50 border w-40 "
                                        placeholder=""
                                        required={true}
                                        onChange={(e) => {
                                          setId(user.id);
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t">
                                  <button
                                    type="submit"
                                    className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                                    onClick={() => {
                                      encodeBasic();
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

                  <button
                    id="delete"
                    name="delete"
                    className={`flex justify-center items-center bg-red-600 w-10 rounded py-3 text-write ${
                      nivelLogado != "1" ? "hidden" : "bg-write"
                    }`}
                    title="Deletar Usuário"
                    value={user.id}
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    <Trash size={24} />
                  </button>
                  <div className="">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          id="configcontador"
                          name="configcontador"
                          className={`flex justify-center items-center bg-cyan-900 w-10 rounded py-3 text-write`}
                          title="Trocar a senha do usuário"
                          value={user.id}
                        >
                          <Lock size={24} />
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
                                    Trocar senha do usuário.
                                  </h3>
                                </div>

                                <div className="p-6 space-y-6">
                                  <div className="flex justify-start items-start border-t mt-4 mb-3"></div>
                                  <div className="flex flex-col justify-start items-start">
                                    <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                                      Nova Senha
                                    </label>
                                    <input
                                      type="password"
                                      name="senha"
                                      title="Preencher este campo para alterar as mensalidades e o novo salário para calcular as mensalidades"
                                      className="bg-gray-50 border w-[100%] py-3 px-2 rounded text-cyan-900 mb-3"
                                      placeholder=""
                                      value={senha}
                                      onChange={(e) => {
                                        setSenha(e.target.value);
                                      }}
                                    />
                                    <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                                      Digite novamente a senha
                                    </label>
                                    <input
                                      type="password"
                                      name="senha"
                                      title="Preencher este campo para alterar as mensalidades e o novo salário para calcular as mensalidades"
                                      className="bg-gray-50 border w-[100%] py-3 px-2 rounded text-cyan-900 mb-3"
                                      placeholder=""
                                      value={senhaConfirmada}
                                      onChange={(e) => {
                                        setSenhaConfirmada(e.target.value);
                                      }}
                                    />
                                    <button
                                      type="submit"
                                      className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                                      title="Trocar senha no sistema"
                                      onClick={()=>trocarSenha(user.id)}
                                    >
                                      Salvar
                                    </button>
                                    <Dialog.Close asChild>
                                      <button
                                        className="border-none rounded bg-cyan-900 text-write w-40 py-2 mt-4"
                                        type="submit"
                                      >
                                        Sair
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
