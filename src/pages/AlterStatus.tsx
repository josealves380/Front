import { useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { ArrowsCounterClockwise } from "phosphor-react";
import { f2b } from "../services/f2b";
import TesteBoletos from "../components/TesteBoletos";
import { updateStatusBoleto } from "../components/UpdateStatusBoleto";
import { useNavigate } from "react-router-dom";

export default function EnviarBoletos() {
  const [cliente_id, setCliente_id] = useState(0);
  const [id, setId] = useState(0);
  console.log("id boleto",id);
  const [basico, setBasico] = useState("");
  const [data_vencimento, setData_vencimento] = useState("");
  const [email, setEmail] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [obs_corpo, setObs_corpo] = useState("");
  const [status, setStatus] = useState("");
  const [valor_documento, setValor_ducumento] = useState(0);
  const id_parceiro = localStorage.getItem("idParceiro");
  const basic = localStorage.getItem("basic");
  const navigate = useNavigate()

  const nivel = localStorage.getItem("Nivel");

  useEffect(() => {
    api.get(`/boletos/${id_parceiro}`).then((response) => {
      const [{ id }] = response.data;
      setId(id);
      const [{ cliente_id }] = response.data;
      setCliente_id(cliente_id);
      const [{ data_vencimento }] = response.data;
      setData_vencimento(data_vencimento);
      const [{ email }] = response.data;
      setEmail(email);
      const [{ n_fantasia }] = response.data;
      setN_fantasia(n_fantasia);
      const [{ obs_corpo }] = response.data;
      setObs_corpo(obs_corpo);
      const [{ status }] = response.data;
      setStatus(status);
      const [{ valor_documento }] = response.data;
      setValor_ducumento(valor_documento);
    });
  }, []);
 

  async function updateStateGeraBoleto(cliente_id: number) {
    document.getElementById("geraBoleto");
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
    try {
      const response = await api.put(`/clientegeraBoleto/${cliente_id}`);
      JSON.stringify({
        id: Number,
        geraBoleto: true,
      });
      return window.location.reload();
    } catch (error) {
      alert("algo deu errado");
    }
  }

  async function updateStatusBoleto(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.put(`/upboleto/${id}`, {
        status: "enviado",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
// useEffect(()=>{
  if(status=="ativo"){
    updateStatusBoleto(id)
    updateStateGeraBoleto(cliente_id)
  }
// },[status])
  // async function geraTudo() {
  //   if (status == "ativo") {
  //     updateStatusBoleto();

  //     updateStateGeraBoleto(cliente_id);
  //   }
  // }

  return (
    <div className="text-cyan-900">
      <HeaderClient />
      <div className="mt-32 ml-16">
        {/* <div className="flex ml-32 gap-2">
        <label className="flex flex-col ml-6 mb-3 ">
          Juros diário %
          <input
            id="mes_pag"
            name="mes_pag"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-2 font-bold "
            value={jur}
            onChange={(e) => {
              localStorage.setItem("jur", e.target.value);
              setJur(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês referente"
          />
           </label>
      </div> */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b">
              <th>status</th>
              <th scope="col" className="md:px-32 py-3">
                Nome Fantasia
              </th>
              <th scope="col" className="px-2 py-3">
                email
              </th>
              <th scope="col" className="px-2 py-3">
                valor
              </th>
              <th scope="col" className="px-2 py-3">
                data pagamento
              </th>
              <th scope="col" className="px-28 py-3">
                Referente ao Mês
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>{status}</td>
              <td className="px-32">{n_fantasia}</td>
              <td>{email}</td>
              <td className="px-4">{valor_documento}</td>
              <td className="px-6">{data_vencimento}</td>
              <td className="px-32">{obs_corpo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Siderbar />
    </div>
  );
}
