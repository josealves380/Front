import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { ClientesProps } from "../types/ClientesProps";

interface ViaCepResponse {
  cep: string;
  localidade: string;
  ibge: string;
  uf: string;
}

interface ParceiroProps {
  id: number;
  nome: string;
}

export default function ViewClient() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [insc_estadual, setIns_estadual] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [rz_social, setRz_social] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tel_contato, setTel_contato] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [ibge, setIbge] = useState("");
  const [nome, setNome] = useState<ParceiroProps[]>([]);
  const [valor_mensal, setValor_mensal] = useState("");
  const [perc_mensal, setPerc_mensal] = useState("");
  const [parceiro, setParceiro] = useState<any>();
  const [tipo_envio, setTipo_envio] = useState("");
const [data_pag, setData_pag] = useState("")
const [data_impl, setData_impl] = useState("")
  const [nivel, setNivel] = useState();

  const navigate = useNavigate();
  const userId = localStorage.getItem("Id");
  const clienteId = localStorage.getItem("idCliente");

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);
  useEffect(() => {
    api.get<ClientesProps>(`/clienteId/${clienteId}`).then((response) => {
      console.log(response.data);
      const {
        cnpj,
        insc_estadual,
        rz_social,
        n_fantasia,
        email,
        senha,
        tel_contato,
        cep,
        cidade,
        ibge,
        uf,
        endereco,
        numero,
        bairro,
        name,
        telefone,
        valor_mensal,
        perc_mensal,
        tipo_envio,
        data_pag,
        data_impl,
        paceiro: { nome },
      } = response.data;
      setCnpj(cnpj);
      setIns_estadual(insc_estadual);
      setRz_social(rz_social);
      setN_fantasia(n_fantasia);
      setEmail(email);
      setSenha(senha);
      setTel_contato(tel_contato);
      setCep(cep);
      setCidade(cidade);
      setIbge(ibge);
      setUf(uf);
      setEndereco(endereco);
      setNumero(numero);
      setBairro(bairro);
      setName(name);
      setTelefone(telefone);
      setParceiro(nome);
      setPerc_mensal(perc_mensal);
      setValor_mensal(valor_mensal);
      setTipo_envio(tipo_envio);
      setData_pag(data_pag)
      setData_impl(data_impl)
    });
  }, []);

  async function updateDadosCliente(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post(`/cliente/update/${clienteId}`, {
        email: email,
        name: name,
        cnpj: cnpj,
        rz_social: rz_social,
        tel_contato: tel_contato,
        telefone: telefone,
        cidade: cidade,
        bairro: bairro,
        cep: cep,
        endereco: endereco,
        uf: uf,
        ibge: ibge,
        numero: numero,
        n_fantasia: n_fantasia,
        nome: parceiro,
      });
      console.log(response.data);
      navigate("/PesquisaCliente");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setNome(response.data);
    });
  }, []);

  function Logged() {
    if (nivel == 1) {
      return (
        <form>
          <input
            id="nome"
            disabled={true}
            name="nome"
            value={parceiro}
            className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 w-48 mr-4 uppercase"
          />
        </form>
      );
    } else if (nivel == 2) {
      return (
        <input
          id="nome"
          disabled={true}
          name="nome"
          value={parceiro}
          className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 w-52 mr-4 appearance-none uppercase"
        />
      );
    } else {
      return;
    }
  }
  function LoggedButton() {
    if (nivel == 1) {
      return (
        <>
          <Link to={"/pesquisaCliente"}>
            <button
              type="button"
              data-modal-toggle="editUserModal"
              className=" w-72 font-bold hover:underline bg-cyan-900 text-write rounded px-1 p-2 tracking-wider"
              onClick={() => {}}
            >
              Voltar
            </button>
          </Link>
        </>
      );
    } else if (nivel == 2 || nivel == 3) {
      return (
        <>
          <Link to={"/pesquisaClienteParceiro"}>
            <button
              type="button"
              data-modal-toggle="editUserModal"
              className=" w-72 font-bold hover:underline bg-cyan-900 text-write rounded px-1 p-2 tracking-wider"
              onClick={() => {}}
            >
              Voltar
            </button>
          </Link>
        </>
      );
    } else {
      return;
    }
  }

  return (
    <div>
      <HeaderClient />
      <form
        onSubmit={updateDadosCliente}
        className="flex flex-col mt-8 gap-4 ml-56 text-cyan-900"
        action=""
      >
        <h1 className="flex justify-center items-center mt-24 font-bold underline text-xl">
          Visualização de cliente
        </h1>
        <h2 className="mb-2  text-xl font-normal from-cyan-900 ">Empresa</h2>
        <div className="flex">
          <label className="" htmlFor="">
            CNPJ:
          </label>
          <input
            id="cnpj"
            disabled={true}
            className="h-8 border font-light border-cyan-600 rounded outline-none w-40 ml-1 mr-2 px-1"
            type="text"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
          />
          <label className="" htmlFor="">
            Inscrição estadual:
          </label>
          <input
            className="h-8 border font-light border-cyan-600 outline-none rounded w-36 ml-2 px-1 mr-2 "
            disabled={true}
            id="insc_estadual"
            type="text"
            value={insc_estadual}
            onChange={(event) => setIns_estadual(event.target.value)}
          />
          <label htmlFor="">Razão social:</label>
          <input
            id="rz_social"
            disabled={true}
            className="h-8 border font-light border-cyan-600 outline-none rounded w-[365px] ml-2 mr-2 px-1"
            type="text"
            value={rz_social}
            onChange={(event) => setRz_social(event.target.value)}
          />
        </div>
        <div>
          <label className="">Nome fantasia:</label>
          <input
            id="n_fantasia"
            disabled={true}
            className="h-8 border font-light border-cyan-600 rounded outline-none w-72 ml-2 mr-3 px-1"
            type="text"
            value={n_fantasia}
            onChange={(event) => setN_fantasia(event.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            id="email"
            disabled={true}
            className="h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-3 ml-2 w-56"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="">Telefone adicional:</label>
          <input
            id="tel_contato"
            disabled={true}
            className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2  mr-3 w-32"
            type="text"
            value={tel_contato}
            onChange={(event) => setTel_contato(event.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center">
            <h2 className="mb-5 mt-5 text-xl font-normal from-cyan-900">
              Endereço
            </h2>
          </div>
          <div>
            <label htmlFor="">Cep:</label>
            <input
              id="cep"
              disabled={true}
              className="h-8 border font-light border-cyan-600 rounded outline-none ml-2 mr-2 px-1 w-28"
              type="text"
              placeholder="36800-000"
              value={cep}
              onChange={(event) => setCep(event.target.value)}
            />
            <label htmlFor="">Cidade:</label>
            <input
              id="cidade"
              disabled={true}
              type="text"
              className="h-8 w-40 border font-light border-cyan-600 rounded outline-none ml-1 px-1 mr-2"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
            />
            <label htmlFor="">Cód.Cidade:</label>
            <input
              id="ibge"
              disabled={true}
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2  mr-2 w-20"
              type="text"
              value={ibge}
              onChange={(event) => setIbge(event.target.value)}
            />
            <label htmlFor="">UF: </label>
            <input
              id="uf"
              disabled={true}
              type="text"
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-1 mr-2 w-10"
              value={uf}
              onChange={(event) => setUf(event.target.value)}
            />
            <label htmlFor="">Rua:</label>
            <input
              id="endereco"
              disabled={true}
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 mr-2 w-72"
              type="text"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Número:</label>
            <input
              id="numero"
              disabled={true}
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2  mr-2 w-14"
              type="text"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
            />

            <label htmlFor="">Bairro:</label>
            <input
              id="bairro"
              disabled={true}
              className="h-8 w-52 border font-light border-cyan-600 rounded outline-none ml-2 mr-2 px-1"
              type="text"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
            />
            <label htmlFor=""> Nome Contato:</label>
            <input
              className="h-8 border font-light border-cyan-600 outline-none rounded w-40 ml-2 mr-3 px-1"
              disabled={true}
              type="name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Telefone:</label>
            <input
              id="telefone"
              disabled={true}
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 mr-1 w-52"
              type="text"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
            />
          </div>
          <div className="flex mt-4">
            <label htmlFor="" className="flex flex-col">
              Percentual pago pelo cliente:
              <input
                className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="text"
                id="perc"
                title="Valor do percentual pago pelo cliente em cima do salário"
                value={perc_mensal}
                disabled
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Valor pago pelo cliente:
              <input
                className="w-48 h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="text"
                title="Valor da mensalidade do cliente não pode ser menor que R$ 20,00"
                id="valor_mensal"
                value={valor_mensal}
                disabled
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Data de Vencimento:
              <input
                className="w-40 h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="text"
                title="Data de vencimento todos os meses"
                id="data de vencimento"
                value={data_pag}
                disabled
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Data de Implementação:
              <input
                className="w-48 h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="text"
                title="Valor da mensalidade do cliente não pode ser menor que R$ 20,00"
                id="data implementação"
                value={data_impl}
                disabled
              />
            </label>
          </div>
          <div className="grid">
            <label htmlFor="" className="flex flex-col">
              {" "}
              Tipo de Envio
              <input
                className="w-[45%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="tipo de envio"
                id="tipo"
                value={tipo_envio}
                title="Nome do Contato"
                onChange={(event) => setTipo_envio(event.target.value)}
                aria-required
                required
              />
            </label>
          </div>
          <h2 className="mb-5 mt-5 text-xl font-normal from-cyan-900">
            Parceiro/Sistema
          </h2>
          <div className="flex mb-5">
            <label>Nome:</label>
            {Logged()}
          </div>

          {/* <h2 className="mb-5 mt-5 text-xl font-normal from-cyan-900">
            Certificado Digital
          </h2> */}
          <div>
            {/* <label>Data de Validade:</label>
            <input 
              id="certificado"              
              disabled={true}
              className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 mr-1 w-52"
              type="text"
            /> */}
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* <Link to={"/pesquisaCliente"}>
          <button
            type="button"
            data-modal-toggle="editUserModal"
            className=" w-72 font-bold hover:underline bg-cyan-900 text-write rounded px-1 p-2 tracking-wider"
            onClick={() => {

            }}
          >
              Voltar
          </button>
              </Link> */}
          {LoggedButton()}
        </div>
        <Siderbar />
      </form>
      {/*  */}
    </div>
  );
}
