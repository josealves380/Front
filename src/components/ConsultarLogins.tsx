import { useEffect, useState } from "react";
import { api } from "../services/api";

interface loginProps {
  ip: string;
  nome: string;
  email: string;
  cnpj: string;
  data: string;
}

export function ConsultarLogins() {
  const [logins, setLogins] = useState<loginProps[]>([]);
  useEffect(() => {
    api.get("/getlogin").then((response) => {
      const logins = response.data;
      setLogins(logins);
    });
  }, []);
  return (
    <div className="flex w-full items-center justify-center mt-24 text-cyan-900">
      <div className="w-full overflow-x-auto relative shadow-sm sm:align-baseline">
        <table className="w-full ml-16 mr-2 max-w-[95%]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 font-bold">
            <tr className="border-b">
              <td>Ip Usuário</td>
              <td>Nome Usuário</td>
              <td className="sr-only">E-mail</td>
              <td>Cnpj</td>
              <td>Data Acesso</td>
            </tr>
          </thead>
          <tbody>
            {logins.map((logins, id) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{logins.ip}</td>
                <td className="font-bold uppercase">{logins.nome}</td>
                <td className="sr-only">{logins.email}</td>
                <td>{logins.cnpj}</td>
                <td>{logins.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
