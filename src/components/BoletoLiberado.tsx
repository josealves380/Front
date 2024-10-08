import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ClientesProps } from "../types/ClientesProps";
import { Link } from "react-router-dom";
import { HeaderClient } from "./HeaderClient";
import { Siderbar } from "./SiderBar";

export default function BoletoLiberado() {
  const [clientesPag, setClientesPag] = useState<ClientesProps[]>([]);
  const [parceiroId, setParceiroId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [valor, setValor] = useState("");
  const userParceiro = localStorage.getItem("Id");
  useEffect(() => {
    if (parceiroId) {
      api
        .get(`/parceiro/${parceiroId}/cliente/${parceiroId}`)
        .then((response) => {
          const [{ cliente }] = response.data;
          //console.log("cliente", cliente);
          setClientesPag(cliente);
        });
    }
  }, [parceiroId]);
  useEffect(() => {
    if (userParceiro) {
      api.get(`/userparceiro/${userParceiro}`).then((response) => {
        const {
          parceiro: { id },
          email,
          name,
        } = response.data;
        // console.log("parceiro", response.data);
        setParceiroId(id);
        setEmail(email);
        setName(name);
      });
    }
  }, []);
  async function updateStatusClienteLiberar(id: number) {
    try {
      const response = await api.put(`/clientestatus/${id}`, {
        statusCliente: "liberado",
      });
      //console.log(response.data);
      //navigate("/PesquisaCliente");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div><HeaderClient/></div>
      <div className="flex justify-between ml-24 mt-32 mb-6 font-bold  text-cyan-900">
      
      <h2 className="text-2xl" >Liberar cliente</h2>
       <div className="mr-24">
       <Link to={"/boletosclientesparceiro"}>
        <button
          type="submit"
          className="border-none rounded bg-cyan-900 text-write w-40 py-2"
          >
          Gravar
        </button>
          </Link>
       </div>
      </div>
      

       
      
      <table className="w-[94%] text-sm text-left text-gray-500 dark:text-gray-400 text-cyan-900 overflow-y-scroll ml-20 mr-1">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 border-b-2">
          <tr>
            <th>
              {/* <input
                id="cliente"
                type="checkbox"
                name="parceiro"
                //value={cliente.n_fantasia}
                title="Ao clicar aqui, inclui este cliente na lista, para gerar o seu boleto"
                aria-required
                required
                //onChange={() => updateStatusClientePagar(cliente.id)}
              /> */}
            </th>
            <th>Razão Social/cnpj</th>
            <th className="flex justify-start items-start uppercase">
              Nome fantasia
            </th>
            <th>Contato</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {clientesPag.map((cliente, id) => (
            <tr key={id} className="border-b">
              <td>
                <input
                  id="cliente"
                  type="checkbox"
                  name="parceiro"
                  value={cliente.n_fantasia}
                  title="Ao clicar aqui, inclui este cliente na lista, para gerar o seu boleto"
                  aria-required
                  required
                  onChange={() => updateStatusClienteLiberar(cliente.id)}
                />
              </td>
              <td>
                <span className="uppercase font-bold">{cliente.rz_social}</span>
                <br />
                <span>{cliente.cnpj}</span>
              </td>
              <td>
                <span className="uppercase font-bold">
                  {cliente.n_fantasia}
                </span>
                <br />
                <span className="font-light">{cliente.email}</span>
              </td>
              <td className="uppercase">
                <span className="font-semibold">{cliente.name}</span>
                <br />
                {cliente.telefone}
              </td>
              <td>{cliente.cidade}</td>
            </tr>
          ))}
        </tbody>
        <Siderbar/>
      </table>
      
    </>
  );
}
