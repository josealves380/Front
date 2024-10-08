import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { ParceiroProps } from "../types/ParceiroProps";

export default function EditParceiro() {
  const [cnpj, setCnpj] = useState("");
  const [insc_estadual, setIns_estadual] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [ibge, setIbge] = useState("");
  const [rz_social, setRz_social] = useState("");
  const [telefone, setTelefone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [nome, setNome] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [parsa, setParsa] = useState(0);
  const navigate = useNavigate();

  const parceiroId = localStorage.getItem("idParceiro");
  console.log(parceiroId);

  useEffect(() => {
    if (parceiroId != null) {
      const parsa = parseInt(parceiroId);
      setParsa(parsa);
    }
  }, []);
  useEffect(() => {
    api.get<ParceiroProps>(`/parceiroId/${parceiroId}`).then((response) => {
      const {
        cnpj,
        insc_estadual,
        nome,
        rz_social,
        n_fantasia,
        email,
        senha,
        cep,
        cidade,
        ibge,
        uf,
        endereco,
        numero,
        bairro,
        telefone,
      } = response.data;
      setCnpj(cnpj);
      setIns_estadual(insc_estadual);
      setRz_social(rz_social);
      setN_fantasia(n_fantasia);
      setUserEmail(email);
      setUserSenha(senha);
      setCep(cep);
      setCidade(cidade);
      setIbge(ibge);
      setUf(uf);
      setNome(nome);
      setEndereco(endereco);
      setNumero(numero);
      setBairro(bairro);
      setTelefone(telefone);
    });
  }, []);
  async function updateDadosParceiro(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post(`/parceiroup/${parsa}`, {
        email: userEmail,
        cnpj: cnpj,
        rz_social: rz_social,
        insc_estadual: insc_estadual,
        telefone: telefone,
        cidade: cidade,
        bairro: bairro,
        cep: cep,
        endereco: endereco,
        uf: uf,
        ibge: ibge,
        numero: numero,
        n_fantasia: n_fantasia,
        nome: nome,
      });
      console.log(response.data);
      navigate("/PesquisaParceiro");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <HeaderClient />
      <form
        onSubmit={updateDadosParceiro}
        className="fmax-w-full h-screen md:ml-28 mt-8 gap-4 ml-4 text-cyan-900"
        action=""
      >
        <h2 className="mb-3 mt-28 ml-4 text-xl font-normal from-cyan-900">
          Editar Dados Parceiro
        </h2>
        <div className="grid grid-cols-1 w-[100%] rounded p-4">
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <label className="flex flex-col" htmlFor="">
                {" "}
                CNPJ:
                <input
                  id="cnpj"
                  className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                  type="text"
                  value={cnpj}
                  maxLength={14}
                  onChange={(event) => setCnpj(event.target.value)}
                />
              </label>

              <label className="flex flex-col">
                Inscrição estadual:
                <input
                  className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  id="insc_estadual"
                  type="text"
                  value={insc_estadual}
                  onChange={(event) => setIns_estadual(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="" className="flex">
                Razão social:
              </label>
              <input
                id="rz_social"
                className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="text"
                value={rz_social}
                onChange={(event) => setRz_social(event.target.value)}
              />
              <div></div>
            </div>
            <label className="flex flex-col">
              Nome fantasia:
              <input
                id="n_fantasia"
                className="w-[100%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                type="text"
                value={n_fantasia}
                onChange={(event) => setN_fantasia(event.target.value)}
              />
            </label>
          </div>

          <div className="grid md:grid-cols-3 gap-2 mt-4">
            <div>
              <label htmlFor="">Email:</label>
              <input
                id="email"
                className="w-[100%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                type="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
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
                    className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
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
                    className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                    type="text"
                    value={ibge}
                    onChange={(event) => setIbge(event.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="" className="flex">
                  Cidade:
                </label>
                <input
                  id="cidade"
                  type="text"
                  className="w-[100%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                  value={cidade}
                  onChange={(event) => setCidade(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="flex">
                Rua:
              </label>
              <input
                id="endereco"
                className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                type="text"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="" className="flex ">
                Bairro:
              </label>
              <input
                id="bairro"
                className="w-[100%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                type="text"
                value={bairro}
                onChange={(event) => setBairro(event.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-2 mt-3">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <label htmlFor="" className="flex flex-col">
                  Número:
                  <input
                    id="numero"
                    className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                    type="text"
                    value={numero}
                    onChange={(event) => setNumero(event.target.value)}
                  />
                </label>
                <label className="flex flex-col ml-8">
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
              <div>
                <label className="flex">Telefone:</label>
                <input
                  id="telefone"
                  className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                  type="text"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="flex">
                {" "}
                Nome Parceiro:
              </label>
              <input
                className="w-[100%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                type="nome"
                id="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="ml-4" onClick={updateDadosParceiro}>
            Gravar
          </Button>
          <Siderbar />
        </div>
      </form>
    </div>
  );
}
