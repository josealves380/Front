import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { ConvertNumber } from "../components/ConvertNumber";
import { CalculatePercent } from "../components/CalculatePercent";
import { CalculateTotalAPagar } from "../components/CalculateTotalAPagar";

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
export interface ClientesProps {
  id: number;
  senha: string;
  parceiro_id: number;
  name: string;
  email: string;
  cnpj: string;
  statusCliente: string;
  insc_estadual: string;
  n_fantasia: string;
  ativo: boolean;
  cep: string;
  telefone: string;
  tel_contato: string;
  cidade: string;
  rz_social: string;
  bloqueado: boolean;
  bairro: string;
  endereco: string;
  uf: string;
  numero: string;
  ibge: string;
  data_pag: string;
  perc_mensal: string;
  valor_mensal: string;
  tipo_envio: string;
  paceiro: {
    id: number;
    nome: string;
  };
}

export default function EditarCliente() {
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
  const [perc_mensal, setPerc_mensal] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [ibge, setIbge] = useState("");
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState();
  const [tipo, setTipo] = useState("");
  const [data_pag, setData_pag] = useState("");
  const [valor, setValor] = useState("");
  console.log("valor", valor);
  const [valor_mensal, setValor_mensal] = useState("");
  const [newperc_mensal, setNewPerc_Mensal] = useState("");
  const [valorEdit, setValorEdit] = useState("");
  console.log("percent", valorEdit);
  const [valorPag, setValorPag] = useState("");
  const [ativar, setAtivar] = useState(false);
  const [ativarValor, setAtivarValor] = useState(false);
  const [tipo_envio, setTipo_Envio] = useState("");
  const [salario, setSalario] = useState(0);
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
        perc_mensal,
        valor_mensal,
        data_pag,
        tipo_envio,
        paceiro: { nome },
      } = response.data;
      //console.log(response.data)
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
      setNome(nome);
      setData_pag(data_pag);
      setPerc_mensal(perc_mensal);
      setValor_mensal(valor_mensal);
      setTipo_Envio(tipo_envio);
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
        insc_estadual: insc_estadual,
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
        tipo_sist: tipo,
        nome: nome,
        data_pag: data_pag,
        perc_mensal: perc_mensal,
        valor_mensal: parseFloat(valor_mensal),
        tipo_envio: tipo_envio,
      });
      //console.log(response.data);

      navigate("/geratodosboletos");
    } catch (error) {
      alert(
        "Não foi possível editar os dados do cliente verifique se os campo estão corretos"
      );
    }
  }

  function Logged() {
    if (nivel == 1) {
      return (
        <form>
          <input
            id="nome"
            name="nome"
            value={nome}
            className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-4 uppercase"
            onChange={(e) => setNome(e.target.value)}
          />
        </form>
      );
    } else if (nivel == 2 || nivel == 3) {
      return (
        <input
          id="nome"
          name="nome"
          className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-4 appearance-none uppercase"
          value={nome}
        />
      );
    } else {
      return;
    }
  }
  //calcular valor do boleto
  // const valorTotal = (
  //   (parseFloat(valor.replace(",", ".")) * 1320) /
  //   100
  // ).toFixed(2);
  useEffect(() => {
    api.get("/configsalario").then((response) => {
      const [{ salario }] = response.data;
      setSalario(salario);
      //console.log(salario);
    });
  }, []);
  useEffect(() => {
    const cal = CalculatePercent(valorPag, salario);
    setValorEdit(cal);
  }, [valorPag, salario]);
  useEffect(() => {
    if (ativar == true) {
      const val = CalculateTotalAPagar(valorEdit, salario);
      setValor(val);
    }
  }, [valorEdit, salario]);
  //console.log("total",valorTotal)
  //calcular o valor do percentual
  //const valorPercentual = ((100 * parseFloat(valor)) / 1320).toFixed(2);
  //ativa campo para inserir valor do percentual
  function ativarPercente() {
    setAtivarValor(true);
  }
  //ativa campo para inserir valor pago pelo cliente
  function ativarVal() {
    //alert("executou")
    setAtivar(true);
  }

  return (
    <div>
      <HeaderClient />
      <form
        onSubmit={updateDadosCliente}
        className="max-w-full h-screen md:ml-28 mt-8 gap-4 ml-4 text-cyan-900"
        action=""
      >
        <h1 className="flex justify-center items-center mt-24 font-bold underline text-xl">
          Editar dados cliente
        </h1>
        <h2 className="mb-2 ml-3 text-xl font-normal from-cyan-900">Empresa</h2>
        <div className="grid grid-cols-1 w-[100%] rounded p-4">
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <label className="flex flex-col">
                CNPJ:
                <input
                  id="cnpj"
                  className="w-[90%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                  type="text"
                  value={cnpj}
                  maxLength={14}
                  onChange={(event) => setCnpj(event.target.value)}
                />
              </label>

              <label className="" htmlFor="">
                Inscrição estadual:
                <input
                  className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  id="insc_estadual"
                  type="text"
                  value={insc_estadual}
                  onChange={(event) => setIns_estadual(event.target.value)}
                />
              </label>
            </div>
            <div className="grid">
              <label className="flex flex-col">
                Razão social:
                <input
                  id="rz_social"
                  className="w-[96%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1 uppercase"
                  type="text"
                  value={rz_social}
                  onChange={(event) => setRz_social(event.target.value)}
                />
              </label>
              <div></div>
            </div>
            <label className="flex flex-col">
              Nome fantasia:
              <input
                id="n_fantasia"
                className="w-[96%] h-8 border font-light border-cyan-600 rounded outline-none mr-3 px-1 uppercase"
                type="text"
                value={n_fantasia}
                onChange={(event) => setN_fantasia(event.target.value)}
              />
            </label>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            <div>
              <label htmlFor="">Email:</label>
              <input
                id="email"
                className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="flex flex-col">
                Telefone adicional:
                <input
                  id="tel_contato"
                  className="w-[45%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                  type="text"
                  value={tel_contato}
                  onChange={(event) => setTel_contato(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <h2 className="mb-5 mt-5 text-xl font-normal from-cyan-900">
              Endereço
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <label htmlFor="" className="flex flex-col">
                  Cep:
                  <input
                    id="cep"
                    className="w-[90%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                    type="text"
                    placeholder="36800-000"
                    value={cep}
                    onChange={(event) => setCep(event.target.value)}
                  />
                </label>
                <label htmlFor="" className="flex flex-col">
                  Cód.Cidade:
                  <input
                    id="ibge"
                    className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded px-1  mr-2 "
                    type="text"
                    value={ibge}
                    onChange={(event) => setIbge(event.target.value)}
                  />
                </label>
              </div>

              <label htmlFor="" className="flex flex-col">
                Cidade:
                <input
                  id="cidade"
                  type="text"
                  className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                  value={cidade}
                  onChange={(event) => setCidade(event.target.value)}
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="" className="flex flex-col">
                Rua:
                <input
                  id="endereco"
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  type="text"
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
                />
              </label>
            </div>
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                Bairro:
                <input
                  id="bairro"
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2  uppercase"
                  type="text"
                  value={bairro}
                  onChange={(event) => setBairro(event.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-2 mt-3">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <label htmlFor="" className="flex flex-col">
                  Número:
                  <input
                    id="numero"
                    className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                    type="text"
                    value={numero}
                    onChange={(event) => setNumero(event.target.value)}
                  />
                </label>
                <label htmlFor="" className="flex flex-col ml-6">
                  UF:
                  <input
                    id="uf"
                    type="text"
                    className="w-[50%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                    value={uf}
                    onChange={(event) => setUf(event.target.value)}
                  />
                </label>
              </div>
              <label className="flex flex-col">
                Telefone:
                <input
                  id="telefone"
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-1 "
                  type="text"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                />
              </label>
            </div>
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                {" "}
                Nome Contato:
                <input
                  data-danger={"Campo obrigatório"}
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1 uppercase"
                  type="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="grid">
              <Link to={"/editvalue"}>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    className=""
                    onChange={() => ativarPercente()}
                  />
                  Percentual pago pelo cliente:
                </label>
              </Link>
              {(() => {
                switch (ativarValor) {
                  case false:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        id="perc"
                        title="Valor do percentual pago pelo cliente em cima do salário"
                        value={perc_mensal}
                        onChange={(e) => setPerc_mensal(e.target.value)}
                        disabled
                      />
                    );
                  case true:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        id="perc"
                        title="Valor do percentual pago pelo cliente em cima do salário"
                        value={valorEdit}
                        onChange={(e) => setValorEdit(e.target.value)}
                      />
                    );
                }
              })()}
            </div>

            <div className="grid">
              <Link to={"/editvaluemensal"}>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    className=""
                    onChange={() => ativarVal()}
                  />
                  Valor pago pelo cliente:
                </label>
              </Link>
              {(() => {
                switch (ativar) {
                  case false:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light required:border-red-600 border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        title="Valor da mensalidade do cliente não pode ser menor que R$ 20,00"
                        id="valor_mensal"
                        disabled
                        value={ConvertNumber(valor_mensal)}
                        onChange={(event) => setValor(event.target.value)}
                      />
                    );
                  case true:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        title="Valor da mensalidade do cliente não pode ser menor que R$ 25,00"
                        id="valor_mensal"
                        value={valorPag}
                        onChange={(e) => setValorPag(e.target.value)}
                      />
                    );
                }
              })()}
            </div>
            <div className="flex gap-4">
              <label htmlFor="" className="flex flex-col">
                {" "}
                Dia de Vencimento:
                <select
                  className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1 appearance-none"
                  title="Dia de vencimento dois digitos"
                  id="data_vencimento"
                  value={data_pag}
                  onChange={(event) => setData_pag(event.target.value)}
                >
                  <option value={"01"}>1</option>
                  <option value={"02"}>2</option>
                  <option value={"03"}>3</option>
                  <option value={"04"}>4</option>
                  <option value={"05"}>5</option>
                  <option value={"06"}>6</option>
                  <option value={"07"}>7</option>
                  <option value={"08"}>8</option>
                  <option value={"09"}>9</option>
                  <option value={"10"}>10</option>
                  <option value={"11"}>11</option>
                  <option value={"12"}>12</option>
                  <option value={"13"}>13</option>
                  <option value={"14"}>14</option>
                  <option value={"15"}>15</option>
                  <option value={"16"}>16</option>
                  <option value={"17"}>17</option>
                  <option value={"18"}>18</option>
                  <option value={"19"}>19</option>
                  <option value={"20"}>20</option>
                  <option value={"21"}>21</option>
                  <option value={"22"}>22</option>
                  <option value={"23"}>23</option>
                  <option value={"24"}>24</option>
                  <option value={"25"}>25</option>
                  <option value={"26"}>26</option>
                  <option value={"27"}>27</option>
                  <option value={"28"}>28</option>
                  <option value={"29"}>29</option>
                  <option value={"30"}>30</option>
                </select>
              </label>
              <label htmlFor="" className="flex flex-col">
                {" "}
                Tipo de Envio
                <select
                  className="w-[98%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1 appearance-none"
                  id="tipo"
                  value={tipo_envio}
                  title="Nome do Contato"
                  onChange={(event) => setTipo_Envio(event.target.value)}
                  aria-required
                  required
                >
                  <option value=""></option>
                  <option value="E-mail">E-mail</option>
                  <option value="Impressão">Impressão</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </label>
            </div>
            <div className="grid"></div>
          </div>

          <h2 className="mb-5 mt-5 text-xl font-normal from-cyan-900">
            Parceiro/Sistema
          </h2>
          <div className="flex mb-5">
            <label>
              Nome:
              {Logged()}
            </label>
          </div>
          <div className="flex items-center justify-center gap-4 ml-10 mr-4 mb-8">
            <Button
              type="submit"
              onClick={updateDadosCliente}
              //title="troque os pontos dos valores por vírgula antes de gravar"
            >
              Gravar
            </Button>
          </div>
          <Siderbar />
        </div>
      </form>
    </div>
  );
}
