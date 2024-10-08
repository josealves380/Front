import { useEffect, useState } from "react";
import { ClientesProps } from "../types/ClientesProps";
import { api } from "../services/api";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { Button } from "../components/Button";
import { ConvertNumber } from "../components/ConvertNumber";
import GerarBoleto from "../components/TesteBoletos";
import moment from "moment";
import { Plus } from "phosphor-react";

import { Link } from "react-router-dom";

export default function BoletosClientesparceiro() {
  const [clientes, setClientes] = useState<ClientesProps[]>([]);
  //console.log(clientes)
  const [parceiroId, setParceiroId] = useState("");
  //console.log("parceiroid", parceiroId);
  const [boletos, setBoletos] = useState("");
  const [mespag, setMespag] = useState("");
  const [email, setEmail] = useState("");
  //console.log("email", email)
  const [name, setName] = useState("");
  const [valor, setValor] = useState("");
  //console.log("valor", valor);
  const [valorTotal, setValorTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [ano, setAno] = useState(0);
  const [mes, setMes] = useState(0);
  //console.log("mes",mes)
  const [dia, setDia] = useState(0);
  //console.log("dia", dia);
  const userParceiro = localStorage.getItem("Id");
  //console.log(userParceiro)
  const data_vencimento = `${dia}/${mes + 1}/${ano}`;

  //console.log("valor total", valorTotal);

  function pad(str: string, length: number) {
    const resto = length - String(str).length;
    return "0".repeat(resto > 0 ? resto : 0) + str;
  }
  useEffect(() => {
    if (valor != "0") {
      const valorTotal = count * parseFloat(valor);
      setValorTotal(valorTotal);
    }
  }, [mespag]);
  useEffect(() => {
    if (userParceiro) {
      api.get(`/userparceiro/${userParceiro}`).then((response) => {
        const {
          parceiro: { id },
          email,
          name,
        } = response.data;
        //console.log("parceiro", response.data);
        setParceiroId(id);
        setEmail(email);
        setName(name);
      });
    }
  }, []);

  useEffect(() => {
    if (parceiroId) {
      api
        .get(`/parceiropagar/${parceiroId}/cliente/${parceiroId}`)
        .then((response) => {
          const [{ cliente }] = response.data;
          //console.log("cliente", cliente);
          setClientes(cliente);
        });
    }
  }, [parceiroId]);

  useEffect(() => {
    if (parceiroId) {
      api.get(`/valor/${parceiroId}`).then((response) => {
        const [{ valor_cliente }] = response.data;
        //console.log(valor_cliente);
        setValor(valor_cliente);
      });
    }
  }, [count]);
  useEffect(() => {
    const agora = moment();
    const r = agora.date(); // Imprimindo o dia
    setMes(agora.get("month"));
    setAno(agora.year());
    const result = pad(r.toString(), 2);
    setDia(parseInt(result));
  }, []);

  function increment() {
    setCount(count + 1);
  }

  async function updateStatusCliente(id: number) {
    try {
      const response = await api.put(`/clientestatus/${id}`, {
        statusCliente: "pagando",
      });
      //console.log(response.data);
      //navigate("/PesquisaCliente");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-cyan-900 mt-32">
      <div className="flex gap-2 ml-24 mb-2 text-2xl font-bold">
        <h2>Gerar Boleto</h2>
        <Link to={"/boletopagar"}>
          <button
            type="button"
            data-modal-toggle="editUserModal"
            className="font-normal hover:underline bg-cyan-700 text-write rounded px-1 p-2 tracking-wider uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
            title="Adicionar clientes para gerar boleto"
          >
            <Plus size={24} weight="light" />
          </button>
        </Link>
      </div>

      <HeaderClient />
      <table className="w-[90%] text-sm text-left text-gray-500 dark:text-gray-400 mt-4 text-cyan-900 ml-24">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 border-b-2">
          <tr className="border-b text-sm">
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
          {clientes.map((cliente, id) => (
            <tr key={id} className="border-b">
              <td>
                <input
                  id="cliente"
                  type="checkbox"
                  name="parceiro"
                  value={cliente.n_fantasia}
                  title="Incluir este cliente para gerar seu boleto"
                  aria-required
                  required
                  onChange={() => updateStatusCliente(cliente.id)}
                  onClick={increment}
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
      </table>
      {/* <div className="md:grid md:grid-cols-1 flex flex-col text-cyan-900 justify-center items-center md:p-4 md:max-w-screen-lg md:ml-40 gap-2">
        
          <div key={id} className="flex col-span-3">
            <div className="flex justify-center items-center">
              <input
                id="cliente"
                type="checkbox"
                name="parceiro"
                value={cliente.n_fantasia}
                title="Incluir este cliente para gerar seu boleto"
                aria-required
                required
                onChange={() => updateStatusCliente(cliente.id)}
                onClick={increment}
              />
              
            </div>
          </div>
        
      </div> */}
      <main>
        <div className="ml-28">
          <span className="flex text-lg w-72 mt-3 ml-16 text-cyan-900">
            Quantidade de clientes: {count}
          </span>
        </div>
      </main>
      <table className="w-[90%] text-sm text-left text-gray-500 dark:text-gray-400 mt-4 text-cyan-900 ml-24">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:w-360 border-b-2">
          <tr>
            <th scope="col"></th>
            <th scope="col" className="flex ">
              Nome
            </th>

            <th scope="col" className="px-2">
              Email
            </th>
            <th>Referente</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            className={`bg-write border-b data-[success=true]:text-orange data-[danger=true]:text-green-500 data-[primary=true]:text-cyan-900 data-[secondary=true]:text-red-500`}
          >
            <td className="sr-only">
              <input type="text" />
            </td>

            <td className=" uppercase font-bold">
              <span>{name}</span>
            </td>

            <td className="px-3">{email}</td>
            <td>
              <select
                id="mes_pag"
                name="mes_pag"
                className="h-10 w-48 border-b  outline-none px-1 font-bold "
                value={mespag}
                onChange={(e) => {
                  localStorage.setItem("mespag", e.target.value);
                  setMespag(e.target.value);
                }}
                aria-required
                required={true}
                title="É necessário definir o mês referente"
              >
                <option>Referente ao mês</option>
                <option value="Janeiro">Janeiro</option>
                <option value="Fervereiro">Fervereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
                <option value="Julho">Julho</option>
                <option value="Agosto">Agosto</option>
                <option value="Setembro">Setembro</option>
                <option value="Outubro">Outubro</option>
                <option value="Novembro">Novembro</option>
                <option value="Dezembro">Dezembro</option>
              </select>
            </td>
            <td>{ConvertNumber(valorTotal.toString())}</td>
            <td>{data_vencimento}</td>
            <td className="flex justify-center items-center gap-2">
              <Button
                className="w-24 mb-2"
                // onClick={() =>
                //   GerarBoleto(name, email, data_vencimento, valorTotal, mespag)
                // }
              >
                Gravar
              </Button>
              <Link to={"/boletoliberado"}>
                <button
                  data-danger={dia == 1}
                  type="button"
                  data-modal-toggle="editUserModal"
                  className={`font-normal hover:underline text-cyan rounded px-1 p-2 tracking-wider data-[danger=false]:sr-only uppercase leading-normal text-white transition duration-150 ease-in-out`}
                  title="Liberar clientes para gerar boleto"
                >
                  <Plus size={24} weight="light" />
                </button>
              </Link>

              {/* <!-- Modal footer --> */}
            </td>
          </tr>
        </tbody>
      </table>

      <Siderbar />
    </div>
  );
}
