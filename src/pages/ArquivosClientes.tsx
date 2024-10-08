import { useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { app } from "../services/app";
import { useParams } from "react-router-dom";
import { DownloadSimple, MagnifyingGlass } from "phosphor-react";
import { Button } from "../components/Button";
import { ClientesProps } from "../types/ClientesProps";
import * as Dialog from "@radix-ui/react-dialog";

export default function ArquivosClientes() {
  const [cliente, setCliente] = useState<ClientesProps[]>([]);
  const [arquivo, setArquivo] = useState([]);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  console.log(cnpj)

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      app.get(`/getcontador/${id}`).then((response) => {
        const cliente = response.data;
        setCliente(cliente);
      });
    }
  }, [id]);
  useEffect(() => {
    if (cnpj) {
      app.get(`/arquivoficais/${cnpj}`).then((response) => {
        const { arquivos } = response.data;
        setArquivo(arquivos);
      });
    }
  }, [cnpj]);
  const downloadXmlFile = () => {
    const link = document.createElement("a");
    link.href = `/public/arquivos/${cnpj}/${nome}`;
    link.download = `${nome}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <HeaderClient />
      <div>Arquivos Clientes</div>
      <table className="w-full text-sm text-left ml-32 mt-32 text-cyan-900 text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th>
              <div className="flex items-end  justify-end sr-only">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th>Cliente</th>
            <th>Cnpj</th>
            <th>Cidade</th>
            <th className="flex justify-center items-center">Pesquisar</th>
          </tr>
        </thead>
        <tbody>
          {cliente.map((cliente, id) => (
            <tr key={id}>
              <td>
                <div className="flex items-center justify-center ml-16">
                  <input
                    type="checkbox"
                    title="Selecione para pesquisar os arquivos deste cliente"
                    onChange={()=>setCnpj(cliente.cnpj)}
                    className="w-4 h-4 border border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td>{cliente.n_fantasia}</td>
              <td>{cliente.cnpj}</td>
              <td>{cliente.cidade}</td>
              <td className="flex justify-center items-center">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button
                      type="button"
                      data-modal-toggle="editUserModal"
                      className="flex gap-2 font-normal text-cyan-900 rounded py-3 px-4 tracking-wider leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                      title="Pesquisar os arquivos ficais"
                    >
                      <MagnifyingGlass
                        size={16}
                        weight="light"
                        className="z-50 font-bold"
                      />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal accessKey="id">
                    <Dialog.Overlay className="w-full inset-8 fixed" />

                    <Dialog.Content className="focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                      <div
                        id="editUserModal"
                        tabIndex={1}
                        aria-hidden="true"
                        className="flex overflow-y-auto overflow-x-hidden fixed top-32 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full sm:rounded-sm"
                      >
                        <div className="relative w-[50%] max-w-2xl h-full md:h-auto bg-write p-4 text-cyan-900 text-md font-bold">
                          {/* <!-- Modal content --> */}
                          <Dialog.DialogTitle>
                            Baixar Arquivos
                          </Dialog.DialogTitle>
                          <div className="flex flex-col justify-self-start">
                            <table className="w-full text-sm text-left ml-32 mt-32 text-cyan-900 text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="border-b">
                                  <th>
                                    <div className="flex items-end  justify-end sr-only">
                                      <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      />
                                      <label
                                        htmlFor="checkbox-all-search"
                                        className="sr-only"
                                      >
                                        checkbox
                                      </label>
                                    </div>
                                  </th>
                                  <th>Arquivo</th>
                                  <th className="flex justify-center items-center">
                                    Baixar
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {arquivo.map((arquivo, id) => (
                                  <tr key={id}>
                                    <td>
                                      <div className="flex items-center justify-center ml-16">
                                        <input
                                          type="checkbox"
                                          onChange={() => setNome(arquivo)}
                                          title="Selecione aqui para baixar esse arquivo"
                                          className="w-4 h-4 border border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          htmlFor="checkbox-table-search-1"
                                          className="sr-only"
                                        >
                                          checkbox
                                        </label>
                                      </div>
                                    </td>
                                    <td>{arquivo}</td>
                                    <td className="flex justify-center items-center">
                                      <Button
                                        onClick={() => {
                                          setNome(arquivo);
                                          downloadXmlFile();
                                        }}
                                      >
                                        <DownloadSimple size={24} />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <Dialog.Close asChild>
                            <button
                              className="ml-52 border-none rounded bg-red-600 text-write w-[50%] py-3"
                              type="submit"
                            >
                              sair
                            </button>
                          </Dialog.Close>
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
      <Siderbar />
    </div>
  );
}
