import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Siderbar } from "./SiderBar";
import { HeaderClient } from "./HeaderClient";
import { MagnifyingGlass } from "phosphor-react";

//import { f2b } from "../services/f2b";
import { api } from "../services/api";

import { Button } from "./Button";
import { ClientesProps } from "../types/ClientesProps";


interface contasProps {
  bairro: string;
  cep: string;
  cidade: string;
  cnpj: string;
  codigo_sacado: string;
  complemento_endereco: string;
  data_limite_pagamento: string;
  data_registro: string;
  data_vencimento: string;
  data_primeiro_vencimento: string;
  logradouro_endereco: string;
  numero_cobranca: number;
  numero_documento: number;
  numero_endereco: string;
  texto_desconto: string;
  texto_limite_pagamento: string;
  texto_multa: string;
  texto_status: string;
  texto_valor: string;
  url_cobranca: string;
  valor_cobranca: number;
  sacados: {
    nome: string;
    email: string;
  };
}
// interface ClientesProps {
//   id: number;
//   senha: string;
//   parceiro_id: number;
//   name: string;
//   email: string;
//   cnpj: string;
//   statusCliente: string;
//   insc_estadual: string;
//   n_fantasia: string;
//   ativo: boolean;
//   cep: string;
//   telefone: string;
//   tel_contato: string;
//   cidade: string;
//   rz_social: string;
//   bloqueado: boolean;
//   tipo: string;
//   bairro: string;
//   endereco: string;
//   gera_online: boolean;
//   uf: string;
//   numero: string;
//   ibge: string;
//   paceiro: {
//     id: number;
//     nome: string;
//   };
// }

export function ContasAreceber() {
  const [contas, setContas] = useState<contasProps[]>([]);
  const [busca, setBusca] = useState<ClientesProps[]>([]);
  const [name, setName] = useState("");
  const emailParsa = localStorage.getItem("email");
  useEffect(() => {
    api.get(`/cliente`).then((response) => {
      setBusca(response.data);
    });
  }, []);
  const [basic, setBasic] = useState("")
  const userId = localStorage.getItem("Id");
  useMemo(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic) 
    });
  }, []);
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  function PesquisarAgendamentos() {
    f2b
      .get(`/agendamentos/`, {
        params: {
          nome_sacado: name,
          data_inicial: "01/05/2023",
          data_final: "31/12/2023",
        },
      })
      .then(function (response) {
        try {
          setContas(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      });
  }

  function contasAgendadas() {}
  return (
    <div className="grid grid-cols-1 mt-32 place-content-center ml-16 w-[80%] text-cyan-900">
      <HeaderClient />
      <div>
        <h2 className="flex justify-center items-center m-2 text-2xl font-bold">Agendamentos</h2>
      </div>
      <div className="flex justify-center gap-3">
      <select
      className="flex outline-none border h-12 mt-6 rounded border-cyan-900 appearance-none px-2"
        onChange={(e) => {
          setName(e.target.value);
        }}
      >
        <option selected>Selecione o nome para pesquisa</option>
        {busca.map((busca, id) => (
          <option key={id} value={busca.n_fantasia}>
            {busca.n_fantasia}
          </option>
        ))}
      </select>
      <div>
      <Button onClick={PesquisarAgendamentos}>Pequisar</Button>
      </div>
      </div>
      {contas.map((contas, id) => (
        <ul key={id} className="flex justify-center items-center gap-4 mt-4 border rounded py-2">
          <li>Data de vencimento: {contas.data_primeiro_vencimento}</li>
          <li>{contas.valor_cobranca},00</li>
          <li>{contas.texto_status}</li>
          <li>{contas.sacados.email}</li>
        </ul>
      ))}

      <Siderbar />
    </div>
  );
}
