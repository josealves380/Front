import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { Button } from "../components/Button";
//import { f2b } from "../services/f2b";
import { api } from "../services/api";
import moment from "moment";
import axios from "axios";

interface valoresProps {
  id: string;
  produto: {
    valor: number;
  };
}

export default function Financeiro() {
  const [cli, setCli] = useState("");
  //console.log("cliente", cli);
  const [numeroCli, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [data_pag, setData_pag] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  //console.log("valor mensal", valorMensal);
  const [salario, setSalario] = useState("");
  const [valorProd, setValorProd] = useState("");
  const [agenda, setAgenda] = useState("");
  const [valores, setValores] = useState(0);
  //console.log("valor prodito", valores);
  const [basic, setBasic] = useState("")
  const [perc, setPerc] = useState("");
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  
  const user = localStorage.getItem("Id");
  
  const nivel = localStorage.getItem("Nivel");

  const datainicial = `${data_pag}/${mes + 1}/${ano}`;
  //console.log(datainicial)
  const vlTotal = (
    parseFloat(salario) * (parseFloat(perc) / 100) +
    valores
  ).toFixed(2);
  //console.log("valor total", vlTotal);
  useEffect(() => {
    api.get(`/ultimo`).then((response) => {
      const [{ id }] = response.data;
      const [{ cnpj }] = response.data;
      const [{ email }] = response.data;
      const [{ data_pag }] = response.data;
      const [{ n_fantasia }] = response.data;
      response.data;
      setCli(id);
      setNumero(cnpj);
      setEmail(email);
      setData_pag(data_pag);
      setN_fantasia(n_fantasia);
    });
  }, []);
  useMemo(() => {
    api.get(`/getf2b/${user}`).then((response) => {
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
  useEffect(() => {
    api.get(`/getf2b/${user}`).then((response) => {
      const [{ salario }] = response.data;
      setSalario(salario);
    });
  }, []);
  useEffect(() => {
    api.get(`/getProduto`).then((response) => {
      const [{ valor }] = response.data;
      setValorProd(valor);
    });
  }, [agenda]);
  // useEffect(() => {
  //   api.get(`/sumProduto/${cli}`).then((response) => {
  //     const { valor } = response.data;
  //     setValores(valor);
  //   });
  // }, [agenda]);
  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month") + 1);
    setAno(agora.year());
  }, []);
  async function gerarBoleto() {
    try {
      f2b.post("/cobrancas/", {
        objeto_sacado: [
          {
            nome: n_fantasia,
            email: email,
          },
        ],
        data_vencimento: datainicial,
        valor_cobranca: vlTotal,
        demonstrativo: [
          {
            "@type": "item",
            numero_demonstrativo: 1,
            texto_demonstrativo: "Boleto Siad Sistemas",
            qtde_item: 1,
            valor_item: vlTotal,
          },
        ],

        valor_desconto: 0,
        tipo_desconto: 0,
        numero_dias_desconto: 0,
        parcelas_carne: "1",
        valor_multa: 2,
        tipo_multa: 1,
        valor_mora_dia: 0.33,
        tipo_mora_dia: 0,
        maximo_dias_pagamento: 20,
      });
      //handleMensalidadeCliente();
      console.log("enviado");
    } catch (error) {
      console.log("error");
    }
  }
  async function handleMensalidadeCliente() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(`/financeiro/${cli}/mensalidade/1/`, {
        valor: parseFloat(valorMensal),
      });
      //alert("criado com sucesso");
      console.log(response);
      //setValorMensal("");
    } catch (error) {
      console.log(error);
      //alert("error");
    }
  }
  function Logged() {
    if (nivel == "1") {
      return (
        <>
          
            <Button
              className="w-[100%] uppercase bg-cyan-900 mb-4 px-16"
              title="Enviar para F2b"
              onClick={() => {
                gerarBoleto();
                
              }}
            >
              Gravar
            </Button>
          
          <Link to={"/PesquisaCliente"}>
            <Button
              className="w-[100%] uppercase bg-cyan-900 mb-4 px-20"
              title="Não enviar para F2b"
              onClick={()=>handleMensalidadeCliente()}
            >
              Sair
            </Button>
          </Link>
        </>
      );
    } else if (nivel == "2" || nivel == "3") {
      return (
        <>
          <Link to={"/PesquisaClienteParceiro"}>
            <Button
              className="w-[100%] uppercase bg-cyan-900 mb-4 px-16"
              title="Enviar para F2b"
              onClick={() => {
                gerarBoleto();
              }}
            >
              Gravar
            </Button>
          </Link>
          <Link to={"/PesquisaClienteParceiro"}>
            <Button
              className="w-[100%] uppercase bg-cyan-900 mb-4 px-20"
              title="Não enviar para F2b"
              onClick={()=> handleMensalidadeCliente()}
            >
              Sair
            </Button>
          </Link>
        </>
      );
    }
  }

  return (
    <div className="grid grid-cols-1">
      <header>
        <HeaderClient />
      </header>
      <div className="grid grid-cols-1 text-cyan-900 text-md place-items-center h-screen">
        <div className="flex flex-col w-[80%] justify-center items-center ml-20 rounded">
          <div className="flex justify-start items-start">
            <h2 className="font-bold text-2xl mb-4">Boletos</h2>
          </div>
          <div className="flex justify-center items-center ml-2">
            <label htmlFor="">
              Digite o valor do salário
              <input
                type="text"
                id="salario"
                name="salario"
                value={salario}
                disabled
                className="w-[60%] rounded border px-2 py-3 outline-none border-cyan-900 mt-3 mb-8 placeholder:text-cyan-900 placeholder:false font-bold"
                onChange={(e) => setSalario(e.target.value)}
              />
            </label>
            <label htmlFor="">
              Porcentagem
              <input
                type="text"
                id="perc"
                name="perc"
                value={perc}
                className="w-[80%] rounded border px-2 py-3 outline-none border-cyan-900 mt-3 mb-8 placeholder:text-cyan-900 placeholder:false font-bold"
                onChange={(e) => setPerc(e.target.value)}
              />
            </label>
            <label className="flex flex-col justify-center items-center text-md m-2 ">
              Mensalidade:
              <input
                id="mensalidade"
                type="text"
                name="mensalidade"
                value={vlTotal}
                disabled
                className="w-[100%] rounded border px-2 py-3 outline-none border-cyan-900 mt-3 mb-8 placeholder:text-cyan-900 placeholder:false font-bold"
              />
            </label>
            <label className="flex flex-col w-[60%] mb-6 ml-6 mr-2 px-2">
              Quantidade de boletos a serem gerados
              <input
                type="text"
                className="w-[40%] border font-light border-cyan-900 outline-none rounded ml-3 px-1 py-3 mt-2"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
              />
            </label>
          </div>
          <div className="flex gap-3">
            {/* <Link to={"/PesquisaCliente"}>
              <Button
                className="w-[100%] uppercase bg-cyan-900 mb-4 px-16"
                title="Enviar para F2b"
                onClick={() => {
                  gerarBoleto();
                }}
              >
                Gravar
              </Button>
            </Link>
            <Link to={"/PesquisaCliente"}>
              <Button
                className="w-[100%] uppercase bg-cyan-900 mb-4 px-20"
                title="Não enviar para F2b"
              >
                Sair
              </Button>
            </Link> */}
            {Logged()}
          </div>
        </div>
      </div>

      <div>
        <Siderbar />
      </div>
    </div>
  );
}
