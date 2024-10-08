import { FormEvent, useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "../components/Button";
import { f2b } from "../services/f2b";
import moment from "moment";
import Financeiro from "./Financeiro";

interface produtoProps {
  id: number;
  nome: string;
  valor: number;
}

export default function CadastroProdutos() {
  const [produto, setProduto] = useState<produtoProps[]>([]);
  const [prod, setProd] = useState(0);
  const [email, setEmail] = useState("");
  const [data_pag, setData_pag] = useState("");
  const [n_fantasia, setN_fantasia] = useState("");
  const [valorProd, setValorProd] = useState<number>();
  const [agenda, setAgenda] = useState("");
  //console.log("valor produto", valorProd);
  const [cli, setCli] = useState("");
  console.log("id", cli)
  const [numeroCli, setNumero] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);

  const nivel = localStorage.getItem("Nivel");
  const basic = localStorage.getItem("basic");
  const vlTotal = parseFloat(valorMensal);
  const datainicial = `${data_pag}/${mes + 1}/${ano}`;
  const diaExpirar = "_SIAD";
  const codigo = `0${cli}`;
  const numero = `${numeroCli}`;
  const ndav = "1";
  const npdv = "1";
  const tiposistema = "0";

  const codInit = codigo.substring(-3, 1);

  const codFin = codigo.substring(1);
  const num = numero.substring(-6, 10);
  const novoNdav = ndav.padStart(2, "0");
  const novoNpdv = npdv.padStart(2, "0");
  const novoTipo = tiposistema.padStart(2, "0");
  const finTipo = diaExpirar.slice(3);
  const novoDia = diaExpirar.substring(1, 3);
  const final = numero.substring(2, -10);
  const parte = `${novoNdav}${novoNpdv}${novoTipo}`;

  useEffect(() => {
    api.get(`/getproduto`).then((response) => {
      const produto = response.data;
      setProduto(produto);
      // setValorProd(valor)
    });
  }, []);

  useEffect(() => {
    api.get(`/valorproduto/${prod}`).then((response) => {
      const { valor } = response.data;
      setValorProd(valor);
    });
  }, []);

  useEffect(() => {
    api.get(`/ultimo`).then((response) => {
      const [{ id }] = response.data;
      const [{ cnpj }] = response.data;
      const [{ email }] = response.data;
      const [{ data_pag }] = response.data;
      const [{ n_fantasia }] = response.data;
      console.log(response.data);
      setCli(id);
      setNumero(cnpj);
      setEmail(email);
      setData_pag(data_pag);
      setN_fantasia(n_fantasia);
    });
  }, []);

  async function handleProdutosCliente(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(`/quantidade/${cli}/${id}`, {
        valor: valorProd,
      });
      alert("criado com sucesso");
      console.log("Criado com sucesso", response);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleMensalidadeCliente() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.post(`/financeiro/${cli}/mensalidade/3/`, {
        valor: parseFloat(valorMensal),
      });
      //alert("criado com sucesso");
      console.log(response);
      setValorMensal("");
    } catch (error) {
      console.log(error);
      //alert("error");
    }
  }
  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month") + 1);
    setAno(agora.year());
  }, []);

  const chave = `${codigo}${numero}${parte}${codInit}${novoDia}${codFin}${num}${finTipo}${novoNpdv}${final}${parte}`;

  let c = encripto(chave);

  function encripto(chave: string) {
    const chaveMaiusculo = "QAZXSWEDCVFRTGBNHYUJMKIOLP6402831957";
    const maius = chaveMaiusculo.split("");

    const chaveMinusculo = "qazxswedcvfrtgbnhyujmkiolp6402831957";
    const minus = chaveMinusculo.split("");

    const maiusculo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const m = maiusculo.split("");

    const minusculo = "abcdefghijklmnopqrstuvwxyz0123456789";
    const min = minusculo.split("");

    const cha = chave.split("");

    let chaveEncrypt = "";
    for (let i = 0; i < cha.length; i++) {
      for (let x = 0; x < m.length; x++) {
        if (cha[i] == m[x] || cha[i] == min[x]) {
          if (cha[i] == cha[i].toUpperCase()) {
            chaveEncrypt += maius[x];
          } else {
            chaveEncrypt += minus[x];
          }
        }
      }
    }
    return chaveEncrypt.substring(23);
  }

  async function handleCreateChaveCliente(event: FormEvent) {
    event.preventDefault();
    // window.location.reload();
    try {
      const response = await api.put(`/cliente/chave/${cli}`, {
        chave: c,
      });
      const { id } = response.data;
      console.log(response);
      await navigator.clipboard.writeText(id);
    } catch (err) {
      console.log(err);
    }
  }
  async function gerarBoleto() {
    try {
      f2b.post("/cobrancas/", {
        headers: {
          Authorization: `Basic ${basic}`,
        },
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
        parcelas_carne: agenda,
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
  
  function Logged() {
    if (nivel == "1") {
      return (
        <>
          <div className="flex justify-center items-center gap-2 opacity-90">
            <Button
              onClick={handleCreateChaveCliente}
              className="flex justify-center item-center h-12 gap-2  rounded  text-write bg-cyan-900 w-72"
            >
              <Link
                to={"/financeiro"}
                className="flex justify-center items-center gap-2 opacity-90 w-[100%]"
              >
                <span className="text-xl font-normal">Próximo</span>
                <ArrowRight size={32} />
              </Link>
            </Button>
          </div>
        </>
      );
    } else if (nivel == "2" || nivel == "3") {
      return (
        <>
          <div className="flex justify-center items-center gap-2 opacity-90">
            <button
              onClick={handleCreateChaveCliente}
              className="flex justify-center items-center h-12 gap-2 mt-0 rounded ml-24  text-cyan-900 w-28"
            >
              <Link
                to={"/financeiro"}
                className="flex justify-center items-center gap-2 opacity-90 border w-[100%]"
              >
                <ArrowRight size={32} />
                <span className="text-xl font-normal"> Proximo</span>
              </Link>
            </button>
          </div>
        </>
      );
    }
  }

  return (
    <div className="text-cyan-900 mt-24 gap-2">
      <HeaderClient />
      <div className="grid grid-cols-1">
        <div className="flex justify-center items-center ">
          <h2 className="text-2xl font-semibold mb-8">Cadastro de Produtos</h2>
        </div>
      </div>
      <form className="grid md:grid-cols-1 ml-4 md:ml-28 mt-3">
        <div className="flex flex-col justify-start items-start w-[90%] border-2 rounded-xl ">
          <h2 className="font-bold border-b-2 w-[100%] flex justify-center items-center text-lg py-6 mt-4 max-h-full">
            Crie ou selecione o produto
          </h2>
          {produto.map((produto, id) => (
            <div key={id} className="flex justify-center items-center ml-32">
              <div className="flex mt-2 p-2 ml-96">
                <input
                  id="prod"
                  name="prod"
                  type="checkbox"
                  className="py-2 px-2"
                  value={produto.id}
                  onChange={() => setProd(produto.id)}
                  onClick={() => handleProdutosCliente(produto.id)}
                />
                <span className="ml-2 text-md">
                  {produto.nome} {produto.valor},00
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center w-[80%] ml-28">
              <Button
                onClick={handleCreateChaveCliente}
                className="flex justify-center items-center  gap-2 mt-3 rounded bg-cyan-900 text-write mb-4 "
              >
            <Link to={"/nvproduto"} className="flex justify-center items-center gap-2 w-[100%]">
              <span className="py-1"> Novo</span> produto
            </Link>
              </Button>
          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center border-2 rounded-xl w-[90%] ">
          <h2 className="mb-16 font-bold border-b-4 w-[100%] flex justify-center items-center text-lg pb-8 max-w-full">
          2º Cadastro de Mensalidade
          </h2>
          <label className="flex justify-center items-center text-md m-2 ">Valor da mensalidade: </label>
          <div className="flex justify-center items-center">
          <input
          id="mensalidade"
          type="text"
          name="mensalidade"
          value={valorMesal}
          className="w-[60%] rounded border-l border-b border-t px-2 py-3 outline-none border-cyan-900 mt-3 mb-8 placeholder:text-cyan-900 placeholder:false font-bold"
          onChange={(e) => setValorMensal(e.target.value)}
          />
          <span className="p-3 mb-5 border-r border-t border-b rounded font-bold">,00</span>
          </div>
          
          <Button
          onClick={handleMensalidadeCliente}
          className="w-[80%] py-3 gap-2 mt-10 mb-6 rounded bg-cyan-900 text-write "
          >
          Gravar Mensalidade
          </Button>
        </div> */}
        {/* <div className="border-2 rounded-xl w-[90%] flex flex-col justify-center items-center text-lg mb-3">
          <span className="font-bold text-md border-b-2 w-[100%] flex justify-center items-center p-6 mb-20 mt-4 max-h-full">
          Agendar Mensalidades do cliente
          </span>
          <div className="">
          <label className="flex justify-center items-center m-2 ">
          Valor da mensalidade
          </label>
          <div className="flex justify-center items-center">
          <input
          id="mensalidade"
          type="text"
          name="mensalidade"
                value={valorMensal}
                className="w-[60%] rounded border border-t px-2 py-3 outline-none border-cyan-900 mt-3 mb-8 placeholder:text-cyan-900 placeholder:false font-bold"
                onChange={(e) => setValorMensal(e.target.value)}
                />
                </div>
                <div className="flex flex-col items-center justify-center mb-6">
                <label className="ml-8 mb-4">
                Quantidade de boletos a serem gerados
                </label>
                <input
                type="text"
                className="w-[60%] border font-light border-cyan-900 outline-none rounded mr-3 px-1 py-3 mb-6"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                />
                <div className="flex flex-col items-center justify-center w-[100%] mb-8">
                <Button className=" bg-cyan-900 w-[80%] mb-8" onClick={Finalizar}><Link to={"/boleto"}>Finalizar</Link></Button>
                </div>
            </div>
          </div>
        </div> */}
      </form>
      <div className="flex justify-end items-end mr-36 m-12">{Logged()}</div>
    </div>
  );
}
