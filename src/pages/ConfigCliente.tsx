import { useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContadorProps } from "../types/ContadorProps";
import { app } from "../services/app";
import { Button } from "../components/Button";
import * as Dialog from "@radix-ui/react-dialog";

export default function ConfigCliente() {
  const [busca, setBusca] = useState<ContadorProps[]>([]);

  const [ip, setIp] = useState<number | null>();
  const [id, setId] = useState<number>();
  const [name, setName] = useState("");
  //console.log("Id", id)
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  const cnpj = `${p6}${p5}${p7}`;
  //console.log(cnpj)
  const { Nivel } = useParams();
  const getIPAddress = async () => {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;
    setIp(ip);
  };
  useEffect(() => {
    api.get(`/contador/all`).then((response) => {
      setBusca(response.data);
    });
  }, []);
  //console.log(nivel)
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/clienteidb/${cnpj}`).then((response) => {
        //console.log(response.data);
        const { id } = response.data;
        setId(id);
      });
    }
    getIPAddress();
  }, [cnpj]);
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/clienteb/${cnpj}`).then((response) => {
        //console.log(response.data);
        const { n_fantasia } = response.data;
        setName(n_fantasia);
      });
    }
  }, [cnpj, Nivel]);
  useEffect(() => {
    if (!ip) {
      return;
    }
    if (ip && id && name) {
      try {
        const response = app.post(`/loginurl/2`, {
          ip: ip.toString(),
          cliente_id: id,
          cnpj: cnpj,
          nome: name,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [ip, id]);

  function DefinirContador(contador_id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.reload();
    });
    try {
      app.put(`/clientescontador/${id}`, {
        contador_id: contador_id,
      });
      alert(`Contador definido com sucesso 🤩🎉`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <HeaderClient />
      <div className="mt-32 ml-20 border-b text-2xl text-cyan-900 font-bold">
        <h2>Defina o Contador que pode ter acesso aos seus arquivos fiscais</h2>
      </div>
      <div>
        <table className="w-full max-w-[95%] ml-20 mt-6 text-cyan-900">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360">
            <tr className="border-b text-md">
              <th>
                <div className="sr-only">
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
              <th scope="col" className="flex">
                Contador
              </th>
              <th scope="col" className="">
                Cnpj
              </th>
              <th scope="col" className="flex">
                Telefone
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
                className="bg-write border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="">
                  <div className="flex items-center justify-center sr-only">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="uppercase font-semibold">{busca.nome}</td>
                <td className="flex justify-center mb-7">{busca.cnpj}</td>
                <td className="">{busca.telefone}</td>

                <td className=" flex justify-center items-center">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button
                        type="button"
                        data-modal-toggle="editUserModal"
                        className="flex gap-2 font-normal text-cyan-900 rounded py-3 px-4 tracking-wider leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                        title="Aceite a política de privacidade"
                      >
                        Definir
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
                              Política de Privacidade
                            </Dialog.DialogTitle>
                            <div className="flex flex-col justify-self-start">
                              <span className="text-cyan-900 mt-60 w-[100%] text-xs">
                               <p>Nós, da SIAD SISTEMAS, somos uma empresa [tipo
                                de empresa], inscrita no CNPJ sob o nº [número
                                do CNPJ], com sede na [endereço da empresa].</p>
                               <p>Estamos sujeitos às obrigações fiscais previstas
                                na legislação brasileira, tais como:</p><p> - Emissão
                                de documentos fiscais eletrônicos, como NF-e,
                                NFC-e, NFS-e, CT-e, MDF-e, etc., sempre que
                                realizarmos operações de venda de produtos,
                                prestação de serviços, entre outras;</p><p> -
                                Escrituração fiscal digital, que consiste no
                                registro e na transmissão dos documentos fiscais
                                eletrônicos e das demais informações de
                                interesse do Fisco, por meio de sistemas
                                informatizados, como o SPED Fiscal, o SPED
                                Contribuições, o EFD-Reinf, o eSocial, entre
                                outros;</p><p>- Apuração e recolhimento dos tributos
                                federais, estaduais e municipais, de acordo com
                                o regime tributário escolhido pela empresa, que
                                pode ser o Simples Nacional, o Lucro Presumido
                                ou o Lucro Real, e com as respectivas alíquotas,
                                prazos e formas de pagamento;</p><p> - Declaração e
                                entrega das obrigações acessórias, que são as
                                informações complementares exigidas pelo Fisco,
                                como a DCTF, a DIRF, a ECD, a ECF, a GIA, a
                                DASN-SIMEI, entre outras. Para cumprir com essas
                                obrigações fiscais, nós contamos com a
                                assessoria de uma empresa de contabilidade, que
                                nos auxilia na emissão, no armazenamento, na
                                escrituração, na apuração, no recolhimento e na
                                declaração dos dados fiscais da nossa empresa.</p>
                                <p> Nós também utilizamos o
                                [Arquivei](https://arquivei.com.br/blog/escrita-fiscal/),
                                uma plataforma online que nos permite capturar,
                                gerenciar e analisar 100% dos documentos fiscais
                                eletrônicos emitidos contra o nosso CNPJ,
                                diretamente da Secretaria da Fazenda. Com o
                                Arquivei, nós temos acesso rápido e fácil aos
                                arquivos XML e PDF das nossas notas fiscais,
                                evitando multas, penalidades e problemas com o
                                Fisco.</p><p> Nós respeitamos as normas de segurança da
                                informação e adotamos medidas técnicas,
                                administrativas e organizacionais adequadas para
                                proteger os dados fiscais da nossa empresa
                                contra perda, uso indevido, acesso não
                                autorizado, divulgação, alteração ou destruição.
                                Você, como nosso cliente, tem o direito de obter
                                informações sobre os dados fiscais da nossa
                                empresa que sejam relevantes para a sua relação
                                conosco, bem como de solicitar a correção, a
                                atualização ou a exclusão de eventuais dados
                                fiscais incorretos ou desatualizados.</p><p>Se você
                                tiver alguma dúvida, reclamação, solicitação ou
                                feedback sobre os dados fiscais da nossa
                                empresa, por favor, entre em contato conosco
                                pelo e-mail [e-mail da empresa] ou pelo telefone
                                [telefone da empresa], click no campo abaixo
                                para permitir o acesso do seu contador aos seus
                                arquivos.</p>
                              </span>
                              <span className="flex gap-2 text-cyan-700 text-xs">
                                <input
                                  type="checkbox"
                                  onClick={() => {
                                    DefinirContador(busca.id);
                                  }}
                                  className="px-2 py-2 bg-write border"
                                />
                                <p>
                                  Aceitar todos os termos e permitir ao Contador
                                  acessar meus dados ficais
                                </p>
                              </span>
                            </div>
                            <Dialog.Close asChild>
                              <button
                                className="border-none rounded bg-red-600 text-write w-[80%] py-3"
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
      </div>
      <Siderbar />
    </div>
  );
}
