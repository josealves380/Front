import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import moment from "moment";
//import { f2b } from "../services/f2b";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { UpdateStateCliente } from "./UpdateStateCliente";
import axios from "axios";

export default function GravaFb() {
  const [data_pag, setDatapag] = useState("");
  const [data_status, setData_status] = useState("");
  let datas = parseInt(data_status.substring(8, 10));
  const [email, setEmail] = useState("");
  const [clienteAtivo, setCLienteAtivo] = useState(false);
  const [n_fantasia, setN_fantasia] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [qtd, setQtd] =useState("")
  //console.log(valorMensal);
  const [total, setTotal] = useState("");
  //console.log("total", total);
  const [id_cliente, setId_cliente] = useState(0);
  const [dia, setDia] = useState(0);
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [basic, setBasic]= useState("")

  const [nivel, setNivel] = useState<any>();
  const userId = localStorage.getItem("Id");
  const emailParsa = localStorage.getItem("email");
  const nomeParceiro = localStorage.getItem("name");
  localStorage.setItem("Nivel", nivel);
 // const [basic, setBasic] = useState("")
 // const userId = localStorage.getItem("Id");
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
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);

  const idCLiente = localStorage.getItem("idCliente");
  console.log("id cliente", idCLiente);
  useEffect(() => {
    if (idCLiente) {
      const id_cliente = parseInt(idCLiente);
      setId_cliente(id_cliente);
    }
  }, [idCLiente]);

  const datainicial = `${data_pag}/${mes + 2}/${ano}`;
  console.log(datainicial);
  useEffect(() => {
    api.get(`/clienteId/${id_cliente}`).then((response) => {
      const { email } = response.data;
      const { data_pag } = response.data;
      const { ativo } = response.data;
      const { n_fantasia } = response.data;
      const { valor_mensal } = response.data;

      setValorMensal(valor_mensal);
      setEmail(email);
      setN_fantasia(n_fantasia);
      setCLienteAtivo(ativo);
      setDatapag(data_pag);
    });
  }, [id_cliente]);

  useEffect(() => {
    api.get(`/qativacao`).then((response) => {
      const [{ data_status }] = response.data;
      setData_status(data_status);
    });
  }, []);

  useEffect(() => {
    const agora = moment();
    setDia(agora.date()); // Imprimindo o dia
    setMes(agora.get("month"));
    setAno(agora.year());
  }, []);
  function clientesAtivos() {
    if (clienteAtivo == false) {
      if (
        (datas < parseInt(data_pag) && mes == 1) ||
        mes == 3 ||
        mes == 5 ||
        mes == 7 ||
        mes == 8 ||
        mes == 10 ||
        mes == 12
      ) {
        const cont = 31 - parseInt(data_pag) + dia;
        console.log("Os dias ativos no sistema são", cont);
        setQtd(cont.toString())
        const total = (cont * (parseFloat(valorMensal) / 30)).toFixed(2);
        setTotal(total);
      }
      if (
        (datas < parseInt(data_pag) && mes == 4) ||
        mes == 6 ||
        mes == 9 ||
        mes == 11
      ) {
        const cont = 30 - parseInt(data_pag) + dia;
        console.log("Os dias ativos no sistema são", cont);
        setQtd(cont.toString())
        const total = (cont * (parseFloat(valorMensal) / 30)).toFixed(2);
        setTotal(total);
      } else if (datas < parseInt(data_pag) && mes == 2) {
        const cont = 28 - parseInt(data_pag) + dia;
        console.log("Os dias ativos no sistema são", cont);
        setQtd(cont.toString())
        const total = (cont * (parseFloat(valorMensal) / 30)).toFixed(2);
        setTotal(total);
      } else {
        const cont = datas - parseInt(data_pag);
        console.log("Os dias ativos no sistema são", cont);
        setQtd(cont.toString())
        const total = (cont * (parseFloat(valorMensal) / 30)).toFixed(2);
        setTotal(total);
      }
    }
  }
  useEffect(() => {
    clientesAtivos();
  }, [email]);
  useEffect(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic);
    });
  }, []);
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
        valor_cobranca: total,
        demonstrativo: [
          {
            "@type": "item",
            numero_demonstrativo: 1,
            texto_demonstrativo: "Teste linha 1",
            qtde_item: 1,
            valor_item: total,
          },
        ],

        valor_desconto: 0,
        tipo_desconto: 0,
        numero_dias_desconto: 0,
        valor_multa: 2,
        tipo_multa: 1,
        valor_mora_dia: 0.1,
        tipo_mora_dia: 0,
        maximo_dias_pagamento: 20,
      });
      console.log("enviado");
    } catch (error) {
      alert("error");
    }
  }
  async function gerarBoletoParceiro() {
    try {
      f2b.post("/cobrancas/", {
        objeto_sacado: [
          {
            nome: nomeParceiro,
            email: emailParsa,
          },
        ],
        data_vencimento: datainicial,
        valor_cobranca: total,
        demonstrativo: [
          {
            "@type": "item",
            numero_demonstrativo: 1,
            texto_demonstrativo: "Teste linha 1",
            qtde_item: 1,
            valor_item: total,
          },
        ],

        valor_desconto: 0,
        tipo_desconto: 0,
        numero_dias_desconto: 0,
        valor_multa: 2,
        tipo_multa: 1,
        valor_mora_dia: 0.2,
        tipo_mora_dia: 0,
        maximo_dias_pagamento: 20,
      });
      console.log("enviado");
    } catch (error) {
      alert("error");
    }
  }
  // async function updateStateCliente(id: number) {
  //   document.getElementById("botao_ativar");
  //   addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     //window.parent.location = window.parent.location.href
  //     //window.location.reload();
  //   });
  //   try {
  //     const response = await api.put(`/cliente/${id_cliente}`);
  //     JSON.stringify({
  //       id: Number,
  //       //ativo: true,
  //     });
  //     localStorage.setItem("idCliente", id.toString());
  //     return window.location.reload();
  //   } catch (error) {
  //     console.log("algo deu errado");
  //   }
  // }
  function Logged() {
    if (nivel == 1) {
      return (
        <div className="flex gap-2">
          <Link to={"/pesquisaCliente"}>
            <Button onClick={gerarBoleto}>Gravar</Button>
          </Link>
          <Link to={"/pesquisaCliente"}>
            <Button
              onClick={() => {
                UpdateStateCliente(id_cliente);
              }}
            >
              Desistir
            </Button>
          </Link>
          <Link to={"/pesquisaCliente"}>
            <Button title="Voltar sem Gravar na F2b">Voltar</Button>
          </Link>
        </div>
      );
    } else if (nivel == 2 || nivel == 3) {
      return (
        <>
          <Link to={"/pesquisaClienteParceiro"}>
            <Button onClick={gerarBoletoParceiro}>Gravar</Button>
          </Link>
          <Link to={"/pesquisaClienteParceiro"}>
            <Button
              onClick={() => {
                UpdateStateCliente(id_cliente);
              }}
            >
              Desistir
            </Button>
          </Link>
        </>
      );
    }
  }
  return (
    <div className="grid  text-md  h-screen w-[90%] ml-24 place-content-center text-cyan-900 gap-2 border-2 rounded-3xl m-3 p-4">
      <div className="grid grid-cols-1 place-content-center">
        <div className="mb-4 text-2xl font-bold">
          <h2>Desativar</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          <label className="flex flex-col">Cliente
          <input
            type="text"
            value={n_fantasia}
            className="border mb-2 rounded px-2 uppercase py-3"
          />
          </label>
         
          <label className="flex flex-col">Email
          <input
            type="text"
            value={email}
            className="border mb-2 rounded px-2 uppercase py-3 "
            />
            </label>
            <label className="flex flex-col">Data da Desativação
          <input
            type="text"
            value={data_status}
            className="border mb-2 rounded px-2 uppercase py-3 "
          />
          </label>
          <label className="flex flex-col">Data de Pagamento
          <input
            type="text"
            value={data_pag}
            className="border mb-2 rounded px-2 uppercase py-3 "
          />
          </label>
          <label className="flex flex-col">Valor Mensal
          <input
            type="text"
            value={valorMensal}
            className="border mb-2 rounded px-2 uppercase py-3 "
          />
          </label>
          <label className="flex flex-col">Data Atual
          <input
            type="text"
            value={dia}
            className="border mb-2 rounded px-2 uppercase py-3 "
          />
          </label>
          
          <label className="flex flex-col">Total
          <input
            type="text"
            value={total}
            className="border mb-2 rounded px-2 uppercase py-3"
          />
          </label>
           <label className="flex flex-col">Valor Cobrado
          <input
            type="text"
            value={total}
            className="border mb-2  rounded px-2  uppercase py-3"
          />
          </label>
          
          <label className="flex flex-col">Dias Ativos
          <input
            type="text"
            value={qtd}
            className="border mb-2 rounded px-2 uppercase py-3 "
          />
          </label>
        </div>
      </div>

     <div className="flex flex-col justify-center items-center rounded p-4">
     <span className="flex w-[68%] ">
        <p>
          Você esta desativando o cliente{" "}
          <em className="text-cyan-700 uppercase ">{n_fantasia} </em>e gerando
          um boleto no valor de <em className="text-red-500">R${total}</em> que
          será enviado para o email <em className="text-cyan-700">{email}</em>.
        </p>
      </span>
      {Logged()}
     </div>
    </div>
  );
}
