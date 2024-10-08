import React, { FormEvent, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "react-router-dom";

import { HeaderClient } from "../components/HeaderClient";

import { Siderbar } from "../components/SiderBar";
import { Button } from "../components/Button";
import { api } from "../services/api";
import axios from "axios";

import { MyBreadCrumbs } from "../components/MyBreadCrumbs";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { f2b } from "../services/f2b";

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

export default function CadastroCompleto() {
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
  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);
  const [idParceiro, setIdParceiro] = useState(0);
  console.log(idParceiro);
  const [data_pag, setData_pag] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [nivel, setNivel] = useState("");
  const [data_impl, setData_impl] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [valor, setValor] = useState("");
  const [ativar, setAtivar] = useState(false);
  const [ativarValor, setAtivarValor] = useState(false);
  const [tipo_envio, setTipo_Envio] = useState("");
  const [basic, setBasic] = useState("");
  const [salario, setSalario] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("Id");
  const idParsa = localStorage.getItem("idParceiro");

  useEffect(() => {
    api.get("/configsalario").then((response) => {
      const [{ salario }] = response.data;
      setSalario(salario);
      console.log(salario);
    });
  }, []);
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
  // função para setar o parceiro id
  useEffect(() => {
    if (idParsa) {
      const id_parceiro = parseInt(idParsa);
      setIdParceiro(id_parceiro);
    }
  }, [idParsa]);
  //função para buscar id do usuário
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);
  //função para gravar dados dos clientes na bd e setar o usuário com nivel de acesso
  async function handleInfoCLiente(event: FormEvent) {
    event.preventDefault();
    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await api.post("/cliente", {
        cnpj: cnpj,
        insc_estadual: insc_estadual,
        rz_social: rz_social,
        n_fantasia: n_fantasia,
        email: email,
        senha: senha,
        tecnico: tecnico,
        name: name,
        cep: cep,
        cidade: cidade,
        bairro: bairro,
        endereco: endereco,
        numero: numero,
        telefone: telefone,
        tel_contato: tel_contato,
        data_impl: data_impl,
        ibge: ibge,
        uf: uf,
        id: idParceiro,
        data_pag: data_pag,
        perc_mensal: valor,
        valor_mensal: parseFloat(valorTotal),
        tipo_envio: tipo_envio,
        basic: basic,
      });
      const { id } = response.data;
      //const clienteId = response.data.cliente.id;

      //console.log(clienteId);
      navigate("/cadproduto");
      await navigator.clipboard.writeText(id);
      cadastraBoleto();
      setName("");
      setEmail("");
      setSenha("");
      setCep("");
      setIns_estadual("");
      setCnpj("");
      setTecnico("");
      setTelefone("");
      setTel_contato("");
      setEndereco("");
      setN_fantasia("");
      setRz_social("");
      setIbge("");
      setNumero("");
      setUf("");
      setCidade("");
      setBairro("");
      setTipo_Envio("");
    } catch (error) {
      console.log(error);
      //alert("Falha ao criar user tente novamente");
    }
    try {
      const user = await api.post("/user/parceiro", {
        email: email,
        name: n_fantasia,
        senha: senha,
        nivel: "4",
        id: idParceiro,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //cadastro de boletos na f2b
  async function cadastraBoleto() {
    try {
      f2b.post("/sacados/", {
        nome: n_fantasia,
        email: email,
        logradouro_endereco: endereco,
        numero_endereco: numero,
        complemento_endereco: "loja",
        bairro: bairro,
        cidade: cidade,
        estado: uf,
        cep: cep,
        cnpj: cnpj,
        grupo: "api",
        codigo_sacado: "000001",
        tipo_envio: "E",
      });
    } catch (error) {
      console.log(error);
    }
  }
  //buscando parceiro
  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
    });
  }, []);
  //consultando dados para cadastro de clientes na api da viacep
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
  //consultando cnpj
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
  //função para criar parceiro
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
      console.log(response);
      await navigator.clipboard.writeText(id);

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
      //alert("Falha ao criar parceiro tente novamente");
    }
  }
  async function handleIdParceiro() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      console.log(idParceiro);
    } catch (error) {}
  }
  async function gerarBoleto() {
    try {
      const response = await f2b.post("/cobrancas/", {
        objeto_sacado: [
          {
            nome: "jose alves",
            email: "neto464@outlook.com",
          },
        ],
        data_vencimento: "30/05/2023",
        valor_cobranca: 56.0,
        demonstrativo: [
          {
            "@type": "item",
            numero_demonstrativo: 1,
            texto_demonstrativo: "Teste linha 1",
            qtde_item: 1,
            valor_item: 60.59,
          },
        ],
        valor_desconto: 0,
        tipo_desconto: 0,
        numero_dias_desconto: 0,
        valor_multa: 10,
        tipo_multa: 1,
        valor_mora_dia: 0.1,
        tipo_mora_dia: 0,
        maximo_dias_pagamento: 20,
      });
      console.log("enviado");
    } catch (error) {
      console.log("error");
    }
  }
  //calcular valor do boleto
  const valorTotal = (
    (parseFloat(valor.replace(",", ".")) * salario) /
    100
  ).toFixed(2);
  //calcular o valor do percentual
  const valorPercentual = (
    (salario - parseFloat(valor)) /
    100
  ).toFixed(2);
  //ativa campo para inserir valor do percentual
  function ativarPercente() {
    if(ativar == false){

      setAtivarValor(true);
    }
  }
  //ativa campo para inserir valor pago pelo cliente
  function ativarVal() {
    //alert("executou")
    if(ativarValor == false){
      setAtivar(true);
    }
  }
  return (
    <div>
      <HeaderClient />
      <div className="ml-28 mt-24">
        <MyBreadCrumbs />
      </div>

      <form
        onSubmit={handleInfoCLiente}
        className="max-w-full h-screen md:ml-28 gap-4 m-4 text-cyan-900"
        action=""
      >
        <h2 className="mb-6 mt-8 text-xl font-normal from-cyan-900 ml-3 ">
          Cliente
        </h2>
        <div className="grid grid-cols-1 w-[100%] rounded p-4">
          <div className="grid md:grid-cols-3 gap-2">
            <div className="grid grid-cols-2">
              <label className="flex flex-col">
                {" "}
                CNPJ:
                <input
                  id="cnpj"
                  className="w-[90%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                  type="text"
                  title="Digite somente números"
                  value={cnpj}
                  maxLength={14}
                  onChange={(event) => setCnpj(event.target.value)}
                  aria-required
                  required
                />
              </label>
              <label htmlFor="" className="">
                Inscrição estadual:
                <input
                  className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  id="insc_estadual"
                  type="text"
                  value={insc_estadual}
                  title="Inscrição Estadual"
                  onChange={(event) => setIns_estadual(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div className="grid">
              <label className="flex flex-col">
                Razão social:
                <input
                  id="rz_social"
                  className="w-[96%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                  type="text"
                  title="Razão Social"
                  value={rz_social}
                  onChange={(event) => setRz_social(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                Nome fantasia:
                <input
                  id="n_fantasia"
                  title="Nome Fantasia"
                  className="w-[96%] h-8 border font-light border-cyan-600 rounded outline-none mr-2 px-1"
                  type="text"
                  value={n_fantasia}
                  onChange={(event) => setN_fantasia(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 mt-3">
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                Email:
                <input
                  id="email"
                  className="w-[95%] h-8 border font-light border-cyan-600 rounded outline-none px-1 mr-2"
                  type="email"
                  title="E-mail Válido"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="" className="flex flex-col">
                Senha:
                <input
                  id="password"
                  className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                  type="password"
                  title="Senha com 6 dígitos"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  aria-required
                  required
                />
              </label>
              <label className="flex flex-col">
                Técnico:
                <input
                  id="tecnico"
                  className="w-[90%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                  type="text"
                  value={tecnico}
                  onChange={(event) => setTecnico(event.target.value)}
                  title="Técnico instalador"
                  aria-required
                  required
                />
              </label>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="flex flex-col">
                Telefone adicional:
                <input
                  id="tel_contato"
                  className="w-[45%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  type="text"
                  value={tel_contato}
                  onChange={(event) => setTel_contato(event.target.value)}
                  title="Opcional"
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
                    title="cep válido"
                    value={cep}
                    onChange={(event) => setCep(event.target.value)}
                    aria-required
                    required
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
                    aria-required
                    required
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
                  aria-required
                  required
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
                  title="Nome da rua"
                  onChange={(event) => setEndereco(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                Bairro:
                <input
                  id="bairro"
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2 "
                  type="text"
                  value={bairro}
                  title="bairro"
                  onChange={(event) => setBairro(event.target.value)}
                  aria-required
                  required
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
                    title="Número"
                    value={numero}
                    onChange={(event) => setNumero(event.target.value)}
                    aria-required
                    required
                  />
                </label>
                <label htmlFor="" className="flex flex-col ml-6">
                  UF:
                  <input
                    id="uf"
                    type="text"
                    className="w-[50%] h-8 border font-light border-cyan-600 outline-none rounded px-1 mr-2"
                    value={uf}
                    title="Estado com 2 letras"
                    onChange={(event) => setUf(event.target.value)}
                    aria-required
                    required
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
                  title="Telefone de contato"
                  onChange={(event) => setTelefone(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                {" "}
                Nome Contato:
                <input
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                  type="name"
                  id="name"
                  value={name}
                  title="Nome do Contato"
                  onChange={(event) => setName(event.target.value)}
                  aria-required
                  required
                />
              </label>
            </div>
            <div className="grid">
              <label htmlFor="" className="flex gap-2">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => ativarPercente()}
                />
                Percentual pago pelo cliente:
              </label>
              {(() => {
                switch (ativarValor) {
                  case false:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        id="perc"
                        title="Valor do percentual pago pelo cliente em cima do salário"
                        disabled
                        value={valorPercentual}
                      />
                    );
                  case true:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        id="perc"
                        title="Valor do percentual pago pelo cliente em cima do salário"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    );
                }
              })()}
            </div>
            <div className="grid">
              <label htmlFor="" className="flex gap-2">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => ativarVal()}
                />
                Valor pago pelo cliente:
              </label>
              {(() => {
                switch (ativar) {
                  case false:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        title="Valor da mensalidade do cliente não pode ser menor que R$ 25,00"
                        id="valor_mensal"
                        value={valorTotal}
                        disabled
                      />
                    );
                  case true:
                    return (
                      <input
                        className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1"
                        type="text"
                        title="Valor da mensalidade do cliente não pode ser menor que R$ 25,00"
                        id="valor_mensal"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    );
                }
              })()}
            </div>
            <div className="grid">
              <label htmlFor="" className="flex flex-col">
                {" "}
                Tipo de Envio
                <select
                  className="w-[95%] h-8 border font-light border-cyan-600 outline-none rounded mr-2 px-1 appearance-none"
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
          </div>
          <h2 className="mb-2 mt-5 text-xl font-normal from-cyan-900">
            Parceiro/Sistema
          </h2>

          <div className="grid grid-cols-1 rounded p-1 max-w-screen-xl gap-2">
            {(() => {
              switch (nivel) {
                case "1":
                  return (
                    <>
                      <div className="flex col-span-3">
                        <div className="md:inline-block flex flex-col justify-center items-center">
                          <div className="flex justify-center items-center">
                            <table className="mb-2">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {parceiro.map((parceiro, id) => (
                                  <tr key={id}>
                                    <td>
                                      {" "}
                                      <input
                                        id="parceiro"
                                        type="checkbox"
                                        name="parceiro"
                                        value={parceiro.id}
                                        onChange={() =>
                                          setIdParceiro(parceiro.id)
                                        }
                                        onSubmit={handleIdParceiro}
                                        title="Difinir este como parceiro responsável"
                                        aria-required
                                        required
                                      />
                                    </td>
                                    <td>
                                      <span className="flex flex-col ml-2 text-xl uppercase">
                                        {parceiro.nome}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                case "2":
                  return (
                    <>
                      <p>Número Cadastrado no sistema :</p>
                      <input
                        type="text"
                        readOnly
                        className="border-none w-4 rounded-sm px-0.5 ml-0.5"
                        defaultValue={idParceiro}
                        aria-required
                        required
                      />
                    </>
                  );
                case "3":
                  return (
                    <>
                      <p>Número de Cadastrado no sistema :</p>
                      <input
                        type="text"
                        readOnly
                        className="border-none w-4 rounded-sm px-0.5 ml-0.5"
                        defaultValue={idParceiro}
                        aria-required
                        required
                      />
                    </>
                  );
              }
            })()}
          </div>
          <div className="flex">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  data-modal-toggle="editUserModal"
                  className="font-medium border text-xs border-cyan-900 h-10 rounded text-cyan-900 dark:text-blue-500 hover:underline px-5"
                  title="É necessário definir uma data de implementação"
                >
                  Click para definir data de implementação:
                </button>
              </Dialog.Trigger>

              <Dialog.Portal accessKey="id">
                <Dialog.Overlay className="w-full inset-0 fixed bg-cyan-900/80" />

                <Dialog.Content className="top-1/2 left-1/2 -translate-x-1/2 bg-write -translate-y-1/2 border border-cyan-900  fixed focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900">
                  <Dialog.Title className="text-cyan-900 bold text-2xl">
                    Data de implementação
                  </Dialog.Title>
                  <form
                    onSubmit={handleCreateUse}
                    className="flex flex-col items-center "
                  >
                    <div>
                      <label className="flex flex-col items-center justify-center">
                        <DatePicker
                          selected={data_impl}
                          onChange={(date: any) => setData_impl(date)}
                          dateFormat="dd/MM/yyyy"
                          id="data"
                          shouldCloseOnSelect={true}
                          aria-required
                          required
                        />
                      </label>
                    </div>

                    <Dialog.Close className="flex py-3  mt-72 w-72 justify-center items-center bg-cyan-700 rounded font-bold  text-write text-sm transition-colors hover:bg-cyan-600 focus:ring-2 ring-white cursor-pointer">
                      Definida
                    </Dialog.Close>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div>
            <select
              id="data_pag"
              name="data_pag"
              className="h-10 w-48 border font-light border-cyan-900 rounded outline-none  mt-4 px-1 appearance-none"
              value={data_pag}
              onChange={(e) => {
                setData_pag(e.target.value);
              }}
              aria-required
              required={true}
              title="É necessário definir uma data de pagamento"
            >
              <option selected>Dia de Vencimento</option>
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
          </div>

          <div className="flex items-center justify-center gap-4 mr-32 md:ml-0 mb-12">
            <Button
              onClick={handleInfoCLiente}
              title="Confira se tudo foi preenchido corretamente"
            >
              Continuar
            </Button>
          </div>
          <Siderbar />
        </div>
      </form>
      {/*  */}
    </div>
  );
}
