import { Base64 } from "base64-string";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "../components/Button";
import { Siderbar } from "../components/SiderBar";
import { HeaderClient } from "../components/HeaderClient";
import { useNavigate } from "react-router-dom";
import { ConsultarLogins } from "../components/ConsultarLogins";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, Gear, Lock, Money } from "phosphor-react";
import UpdateValorMensal from "../components/UpdateValorMensal";
import { CalculateTotalAPagar } from "../components/CalculateTotalAPagar";
import { useAuth } from "../contexts/AuthContext";
interface valorProps {
  id: number;
  perc_mensal: number;
  valor_mensal: number;
}
export default function Configuracoes() {
  const { Logout } = useAuth();
  const [basic, setBasic] = useState("");
  const [salario, setSalario] = useState("");
  console.log("salario", salario);
  const [salarioEditado, setSalarioEditado] = useState("");
  const [senha, setSenha] = useState("");
  //console.log("novo", novo);
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [id, setId] = useState(0);
  //console.log("id", id);
  const idUser = localStorage.getItem("Id");
  const [aparecer, setAparecer] = useState(false);
  console.log(idUser);
  const navigate = useNavigate();
  const enc = new Base64();
  let encode = enc.encode(basic);
  const [clientes, setClientes] = useState<valorProps[]>([]);

  useEffect(() => {
    api.get("/clientemensal").then((response) => {
      const clientes = response.data;
      setClientes(clientes);
    });
  }, []);
  function updateMensal() {
    const valor_mensal = clientes.filter((cliente) => cliente.perc_mensal != 0);
    if (!valor_mensal.length) {
      return;
    }
    for (let i = 0; i < valor_mensal.length; i++) {
      const novo = valor_mensal[i];
      const valorAtualizado = (novo.perc_mensal * parseInt(salario)) / 100;
      novo.valor_mensal -= valorAtualizado;

      api.put(`/editavalormensal/${novo.id}`, {
        valor_mensal: valorAtualizado,
      });
    }
  }
  function NovosValores() {}
  async function encodeBasic(event: FormEvent) {
    event.preventDefault();
    const v = encode.substring(0, 47);
    // console.log(v);
    try {
      const response = await api.post("/f2b", {
        basic: v,
        salario: salarioEditado,
        user_id: idUser, //setar id parceiro do localstorage
      });

      setBasic("");
      setSalario("");
      //navigate("/boleto");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    api.get(`/getf2b/${idUser}`).then((response) => {
      const [{ id }] = response.data;
      setId(id);
    });
  }, []);
  async function updateSalarioVigente(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.put(`/configput/${id}`, {
        salario: parseFloat(salarioEditado),
      });
      alert("Editado com sucesso");
      //console.log(response.data);
    } catch (error) {
      alert(
        "Não foi possível editar salario verifique se os campo estão corretos"
      );
    }
  }
  async function trocarSenha(event: FormEvent) {
    event.preventDefault();
    try {
      if (senha != senhaConfirmada) {
        alert("É necessário digitar uma senha igual, tente novamente");
      }
      if (senha === senhaConfirmada) {
        const response = await api.put("/updatesenha", {
          id: idUser,
          senha: senha,
        });
        Logout();
        //alert("Senha alterada com sucesso 🎉🙌🤩😃");
      }
    } catch (error) {
      alert("Erro ao tentar trocar a senha 😢");
    }
  }
  return (
    <div className="grid text-cyan-900 place-items-center">
      <div className="flex flex-col justify-center items-center w-[60%] mt-32">
        <HeaderClient />
      </div>
      <div className="ml-32 font-bold text-2xl mt-24 text-cyan-900">
        <h1>Configurações</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              id="configcontador"
              name="configcontador"
              className={`flex gap-2 justify-center items-center  w-72 rounded px-2.5 py-2.5 text-write bg-cyan-700`}
              title="Criar configurações do Sistema"
            >
              <Gear size={24} />
              Criar
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
                        Criar Configurações
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
                          <div className="flex flex-col justify-start items-start">
                            <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                              Salário Base para gerar as mensalidades dos
                              clientes
                            </label>
                            <input
                              type="text"
                              name="name"
                              title="Preencher este campo para alterar as mensalidades e o novo salário para calcular as mensalidades"
                              className="bg-gray-50 border w-[100%] py-2 rounded text-cyan-900 mb-3 outline-none"
                              placeholder=""
                              required={true}
                              value={salario}
                              onChange={(e) => {
                                setSalario(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex flex-col justify-start items-start">
                            <label
                              htmlFor=""
                              className="font-medium text-md mb-3"
                            >
                              Cole e salve o token de acesso da F2b.
                            </label>
                            <input
                              type="text"
                              className="border py-3 px-3 outline-none border-cyan-900 text-cyan-900 rounded w-[100%]"
                              value={basic}
                              placeholder="Token"
                              title="Copie e cole seu token de acesso a f2b para ter acesso direto aos seus boletos nessa plataforma"
                              onChange={(e) => setBasic(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <!-- Modal footer --> */}
                      <div className="flex items-center space-x-2 rounded-b">
                        <button
                          type="submit"
                          className="border-none rounded bg-cyan-900 text-write w-40 py-2"
                          title="Registrar basic de acesso a F2b"
                          onClick={encodeBasic}
                        >
                          Registrar
                        </button>
                      </div>
                      <div className="flex justify-start items-start border-t mt-4 mb-3"></div>
                      <div className="flex flex-col justify-start items-start">
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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              id="configcontador"
              name="configcontador"
              className={`flex mt-4 gap-2 justify-center items-center  w-72 rounded px-2.5 py-2.5 text-write bg-cyan-700`}
              title="Atualizar para o novo salário vigente"
            >
              <Money size={24} className="rotate-90" />
              Trocar
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
                        Atualizar o salário e as mensalidades dos clientes
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
                          <div className="flex flex-col justify-start items-start">
                            <label>Novo Salário:</label>
                            <input
                              type="text"
                              name="salario"
                              title="Preencher este campo para alterar as mensalidades"
                              className="border w-[100%] py-2 px-2 rounded text-cyan-900 mb-3 outline-none "
                              required={true}
                              value={salarioEditado}
                              onChange={(e) => {
                                setSalarioEditado(e.target.value);
                              }}
                            />
                            <button
                              className="border-none rounded bg-cyan-900 text-write w-40 py-2 mt-4"
                              onClick={(e) => {
                                updateMensal();
                                updateSalarioVigente(e);
                              }}
                            >
                              Alterar
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Modal footer --> */}

                      <div className="flex justify-start items-start border-t mt-4 mb-3"></div>
                      <div className="flex flex-col justify-start items-start">
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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              id="configcontador"
              name="configcontador"
              className={`flex mt-4 gap-2 justify-center items-center  w-72 rounded px-2.5 py-2.5 text-write bg-cyan-700 outline-none`}
              title="Trocar a sua Senha do Sistema"
            >
              <Lock size={24} />
              Senha
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
                      <h3 className="text-xl font-semibold text-gray-900 text-write ml-4 border-b-write">
                        Nova Senha
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

                    <div className="flex justify-start items-start border-t mt-4 mb-3"></div>
                    <div className="p-6 space-y-6">
                      {/* <!-- Modal footer --> */}

                      <div className="flex flex-col justify-start items-start">
                        <label className="flex flex-col mb-2 text-md font-medium text-gray-900 dark:text-white gap-2">
                          Digite sua nova senha:
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
                          Digite novamente:
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
                          onClick={trocarSenha}
                        >
                          Salvar
                        </button>
                        <div className="flex flex-col justify-start items-start">
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
                    </div>
                  </form>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div>
          <button
            className={`flex mt-4 gap-2 justify-center items-center  w-72 rounded px-2.5 py-2.5 text-write bg-cyan-700 outline-none`}
            title="Vizualizar últimos logins realizados"
            onClick={() => setAparecer(true)}
          >
            <Eye size={24}/>Acessos
          </button>
        </div>
      </div>
      {(() => {
        switch (aparecer) {
          case true:
            return (
              <span className="flex justify-start items-start w-[100%] ml-32 mr-32">
                <ConsultarLogins />
              </span>
            );
        }
      })()}
      <Siderbar />
    </div>
  );
}
