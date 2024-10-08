import { Envelope, User, Lock } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderClient } from "../components/HeaderClient";
import { TextInput } from "../components/TextInput";
import { Siderbar } from "../components/SiderBar";
import { Button } from "../components/Button";
import { api } from "../services/api";
import axios from "axios";

interface ViaCepResponse {
  cep: string;
  localidade: string;
  ibge: string;
  uf: string;
}

export default function NewParsa() {
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
  const [userName, setUserName] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [id, setId] = useState<number>();
  console.log(id)
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/parceirofind").then((response) => {
      const [{id}]=(response.data);
      setId(id + 1)
    });
  }, []);
  async function handleCreateUse(event: FormEvent) {
    event.preventDefault();

    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await api.post("/parceiro", {
        email: userEmail,
        nome: userName,
        senha: userSenha,
        cnpj,
        rz_social,
        n_fantasia,
        insc_estadual,
        cep,
        bairro,
        endereco,
        numero,
        uf,
        cidade,
        telefone,
        ibge,
      });
      const { id } = response.data;
      navigate("/pesquisaParceiro");

      await navigator.clipboard.writeText(id);
      //console.log(response.data);
      setUserEmail("");
      setUserName("");
      setUserSenha("");
      setCep("");
      setIns_estadual("");
      setCnpj("");
      setTelefone("");
      setEndereco("");
      setN_fantasia("");
      setRz_social("");
      setIbge("");
      setNumero("");
      setUf("");
      setCidade("");
      setBairro("");
    } catch (err) {
      console.log(err);
    }
    try {
      if (id) {
        const user = await api.post("/user/parceiro", {
          name: n_fantasia,
          email: userEmail,
          nivel: "2",
          senha: userSenha,
          id: id
        });
        return user;
      }
    } catch (error) {
      console.log("este é o erro", error);
    }
  }
  useEffect(() => {
    axios
      .get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { cep, localidade, ibge, uf } = response.data;
        setCep(cep);
        setCidade(localidade);
        setIbge(ibge);
        setUf(uf);
      });
  }, [cep]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://consulta-cnpj-gratis.p.rapidapi.com/office/${cnpj}`,
      params: { simples: "false" },
      headers: {
        "X-RapidAPI-Key": "b970ed6aacmsh5232260dbd1e5fep1b9914jsne79a2508b059",
        "X-RapidAPI-Host": "consulta-cnpj-gratis.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const {
          address: { city },
          address: { district },
          address: { number },
          address: { state },
          address: { street },
          address: { zip },
          company: { name },
          taxId,
        } = response.data;
        setCep(zip);
        setCidade(city);
        setBairro(district);
        setCnpj(taxId);
        setNumero(number);
        setRz_social(name);
        setEndereco(street);
        setUf(state);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [insc_estadual]);
  return (
    <div>
      <HeaderClient />
      <form
        onSubmit={handleCreateUse}
        className="max-w-full h-screen md:ml-28 mt-8 gap-4 ml-4 text-cyan-900"
        action=""
      >
        <h2 className="mb-6 mt-32 text-xl font-normal from-cyan-900 ml-3">
          Empresa Parceira
        </h2>
        <div className="grid grid-cols-1 w-[100%] p-4 rounded">
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <label htmlFor="" className="flex flex-col">
                CNPJ:
                <input
                  id="cnpj"
                  className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                  required
                  aria-required
                  type="text"
                  value={cnpj}
                  maxLength={14}
                  placeholder="14 caracteres"
                  onChange={(event) => setCnpj(event.target.value)}
                />
              </label>
              <label className="flex flex-col" htmlFor="">
                Inscrição estadual:
                <input
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  id="insc_estadual"
                  required
                  aria-required
                  type="text"
                  value={insc_estadual}
                  onChange={(event) => setIns_estadual(event.target.value)}
                />
              </label>
            </div>

            <div className="grid">
              <label htmlFor="" className="">
                Razão social:
              </label>
              <input
                id="rz_social"
                className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                required
                aria-required
                type="text"
                value={rz_social}
                onChange={(event) => setRz_social(event.target.value)}
              />
            </div>
            <div>
              <label>Nome fantasia:</label>
              <input
                id="n_fantasia"
                className="w-[100%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                required
                aria-required
                type="text"
                value={n_fantasia}
                onChange={(event) => setN_fantasia(event.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid">
              <label htmlFor="" className="flex">
                Email:
              </label>
              <input
                id="email"
                className="w-[98%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                required
                aria-required
                type="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="flex">
                Senha:
              </label>
              <input
                id="password"
                className="w-[50%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                required
                aria-required
                type="password"
                value={userSenha}
                onChange={(event) => setUserSenha(event.target.value)}
              />
            </div>
          </div>
          <div className="items-center">
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
                    required
                    aria-required
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
                    required
                    aria-required
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
                  required
                  aria-required
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
                required
                aria-required
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
                required
                aria-required
                type="text"
                value={bairro}
                onChange={(event) => setBairro(event.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <label htmlFor="" className="flex flex-col">
                  Número:
                  <input
                    id="numero"
                    className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                    required
                    aria-required
                    type="text"
                    value={numero}
                    onChange={(event) => setNumero(event.target.value)}
                  />
                </label>
                <label className="flex flex-col ml-8">
                  UF:
                  <input
                    id="uf"
                    required
                    aria-required
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
                  required
                  aria-required
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
                required
                aria-required
                type="name"
                id="name"
                placeholder="8 caracteres"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
          </div>

          <Button type="submit" onClick={handleCreateUse}>
            Cadastrar
          </Button>
          <Siderbar />
        </div>
      </form>
    </div>
  );
}
