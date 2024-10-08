import { useEffect, useState } from "react";
import { contasProps } from "../components/ContasAPagar";
//import { f2b } from "../services/f2b";
import { Button } from "../components/Button";
import { Siderbar } from "../components/SiderBar";
import { HeaderClient } from "../components/HeaderClient";
import { api } from "../services/api";
import axios from "axios";

export default function BoletosCli() {
  const [contas, setContas] = useState<contasProps[]>([]);
  const email = localStorage.getItem("emailboleto");
  const [basic, setBasic] = useState("");
//  console.log(basic)
  const [status, setStatus] = useState("");
  //console.log(basic)
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, [userId]);
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  useEffect(() => {
    if(email){
      f2b
        .get(`/cobrancas/`, {
          headers: {
            Authorization: `Basic ${basic}`,
          },
          params: {
            cpf_cnpj: `${email}`,
          },
        })
        .then((response) => {
          try {
            setContas(response.data);
          } catch (error) {
            console.log(error);
          }
        });
    }
  }, [basic, userId]);
  function segundaVia() {
    addEventListener("submit", (e) => {
      e.preventDefault();

      window.location.reload();
    });
    f2b
      .get(`/cobrancas/segunda-via`, {
        params: {
          cpf_cnpj: "05351887000186",
          email: "zema@gmail.com",
        },
      })
      .then(function (response) {
        try {
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }
  async function updateBoleto(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();

      window.location.reload();
    });
    try {
      const response = await api.put(`/upboleto/${id}`, {
        status: status,
      });
      //alert("Deletado com sucesso")
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      id="editUserModal"
      tabIndex={1}
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden bg-write outline-none fixed top-0 right-0 left-0 z-50 mt-24 ml-14 p-4 w-[100%] md:inset-0 h-modal md:h-full sm:rounded-sm"
    >
      <div className="relative w-[100%] max-w-2xl h-full md:h-auto">
        <div>
          <HeaderClient />
        </div>
        {/* <!-- Modal content --> */}
        <form className="relative rounded-lg shadow">
          <div className="font-black text-md mb-4">
            <table className="w-full max-w-[90%] ">
              <thead className="text-xs text-gray-700 text-cyan-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 border-b-2">
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="flex mr-16 px-3">
                    CNPJ
                  </th>

                  <th scope="col" className="px-3">
                    Nome
                  </th>
                  <th className="px-32">Referente</th>

                  <th className="px-3">Vencimento</th>
                  <th>Status</th>

                  <th scope="col" className="px-32">
                    Multa
                  </th>
                  <th scope="col" className="px-32">
                    <span>Ações</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {contas.map((contas, id) => (
                  <tr
                    key={id}
                    className={`bg-write border-b ${
                      contas.texto_status == "Cancelada"
                        ? "text-red-500 bg-write"
                        : " text-cyan-900"
                    } ${
                      contas.texto_status == "Registrada"
                        ? "  text-cyan-700"
                        : "  text-cyan-900"
                    }${
                      contas.texto_status == "Paga"
                        ? "text-green-500"
                        : "text-green-300"
                    }${
                      contas.texto_status == "Vencida"
                        ? "text-yelow"
                        : "text-green-300"
                    }`}
                  >
                    <td className="sr-only">
                      <input type="text" />
                    </td>
                    <td>
                      <div className="flex items-center px-3">
                        <span>{contas.cnpj}</span>
                      </div>
                    </td>

                    <td className="px-5">
                      <span className="uppercase">{contas.nome}</span>
                      <br />
                      <span className="lowercase font-light text-xs">
                        {contas.email}
                      </span>
                    </td>
                    <td className="font-light text-sm">
                      {contas.demonstrativo_1}
                    </td>

                    <td className="px-3 text-md font-normal">
                      {contas.data_vencimento}
                      <br />
                      <span className="font-bold text-md">
                        {contas.texto_valor}
                      </span>
                    </td>
                    <td className="font-extrabold text-lg">
                      {contas.texto_status}
                    </td>
                    <td>
                      <form className="flex gap-4 px-3 text-sm font-light">
                        <span>{contas.texto_multa}</span>
                      </form>
                    </td>
                    <td className="flex justify-center items-center mb-3 px-4 gap-2">
                      <a href={contas.url_cobranca} target="_blank">
                        <Button
                          id="segundavia"
                          name="segundavia"
                          className="bg-cyan-900 w-32 rounded py-3 text-write"
                          onClick={segundaVia}
                        >
                          Segunda-via
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Siderbar />
        </form>
      </div>
    </div>
  );
}
