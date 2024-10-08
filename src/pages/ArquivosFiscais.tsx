import { useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";

import { Siderbar } from "../components/SiderBar";

import { app } from "../services/app";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { DownloadSimple } from "phosphor-react";

interface arqProps {
  nome: string;
}
export default function ArquivosFiscais() {
  const [arquivo, setArquivo] = useState([]);
  const [nome, setNome] = useState("");
  const [doc, setDoc] = useState("");
  const { cnpj } = useParams();
  useEffect(() => {
    if (cnpj) {
      setDoc(cnpj);
    }
  }, []);
  useEffect(() => {
    if (doc) {
      app.get(`/arquivoficais/${doc}`).then((response) => {
        const { arquivos } = response.data;
        setArquivo(arquivos);
      });
    }
  }, [doc]);

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
      
      <div className="sr-only">
      <div className="flex justify-center items-center mt-32">
        Arquivos fiscais enviados pelo SIAD (NF-e, NFC-e e SINTEGRA) todo mês.
      </div>
      <div className="flex justify-center items-center mt-8">
        Cada nível de usuário terá opções diferentes:
      </div>
      <div className="flex justify-center items-center mt-4">
        Cliente/Contador - só tem acesso aos seus arquivos
      </div>
      <div className="flex justify-center items-center mt-2">
        Parceiro - só tem acesso aos arquivos de seus clientes
      </div>
      <div className="flex justify-center items-center mt-2">
        Suporte/Adm - acesso a todos arquivos
      </div>
      </div>
      <div className="ml-32 font-bold text-2xl mt-24 text-cyan-900">
        <h1>Arquivos Fiscais</h1>
      </div>
      <table className="w-full text-sm text-left ml-32 mt-2 text-cyan-900 text-gray-500 dark:text-gray-400">
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
            <th>Arquivo</th>
            <th className="flex justify-center items-center">Baixar</th>
          </tr>
        </thead>
        <tbody>
          {arquivo.map((arquivo, id) => (
            <tr key={id}>
              <td>
              <div className="flex items-center justify-center ml-16">
                  <input                    
                    type="checkbox"
                    onChange={()=>setNome(arquivo)}
                    className="w-4 h-4 border border-cyan-900 rounded focus:ring-cyan-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
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
      <Siderbar />
    </div>
  );
}
