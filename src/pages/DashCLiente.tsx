import { useParams } from "react-router-dom";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../services/api";
import { app } from "../services/app";

interface loginProps {
  ip: string;
}


export default function DashCliente() {
  const [login, setLogin] = useState<loginProps[]>([]);
  const [ip, setIp] = useState<number | null>();
  const [id, setId] = useState<number>();
  const [name, setName] = useState("");
  const [boleto, setBoleto] = useState<number>();
  const [rz_social, setRz_social] = useState("");
  const [cnpjContador, setCnpjContador] = useState("")
  //console.log(rz_social);
  const [telefoneContador, setTelefoneContador] = useState("")
  const [idContador, setIdContador] = useState<number>();
  //console.log("Id", idContador);
  const[cepContador, setCepContador]= useState("")
  const[cidadeContador, setCidadeContador]= useState("")
  const[emailContador, setEmailContador]= useState("")
  const[enderecoCont,setEnderecoCont]= useState("")
  const[insc_cont, setInsc_Contador]= useState("")
  const[numero, setNumero]= useState("")
  const[ufCont, setUfCont]= useState("")
  const [bairro, setBairroCont]= useState("")
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  const cnpj = `${p6}${p5}${p7}`;
  //console.log(cnpj);
  const { nivel } = useParams();
  const getIPAddress = async () => {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;
    setIp(ip);
  };
  useEffect(() => {
    app.get(`/getlogincnpj/${cnpj}`).then((response) => {
      setLogin(response.data);
    });
  }, [cnpj]);

  //console.log(nivel)
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/clienteidb/${cnpj}`).then((response) => {
        //console.log("id",response.data);
        const { id } = response.data;
        setId(id);
      });
    }
    getIPAddress();
  }, [cnpj]);
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/clienteb/${cnpj}`).then((response) => {
        //console.log(response.data);
        const { n_fantasia } = response.data;
        setName(n_fantasia);
      });
    }
  }, [cnpj, id]);
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/qtdboletocliente/${cnpj}`).then((response) => {
        const boleto = response.data;
        setBoleto(boleto);
      });
    }
  }, [cnpj, id]);
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/getcontadorcliente/${cnpj}`).then((response) => {
        const { contador_id } = response.data;
        setIdContador(contador_id);
        //console.log(response.data)
      });
    }
  }, [cnpj, id]);
  useEffect(() => {
    if (!cnpj) {
      return;
    }
    if (cnpj) {
      api.get(`/getcontadoridid/${idContador}`).then((response) => {
        const {rz_social} = response.data;
       setRz_social(rz_social);
       const {cnpj} = response.data;
       setCnpjContador(cnpj);
       const {telefone} = response.data;
       setTelefoneContador(telefone)
       const {cidade} =(response.data)
       setCidadeContador(cidade)
       const {cep} = response.data
       setCepContador(cep)
       const {email} = response.data
       setEmailContador(email)
       const {numero} = response.data
       setNumero(numero)
       const {insc_estadual} = response.data
       setInsc_Contador(insc_estadual)
       const {uf} = response.data
       setUfCont(uf)
       const {endereco}= response.data
       setEnderecoCont(endereco)
       const {bairro} = response.data
       setBairroCont(bairro)
            });
    }
  }, [cnpj, idContador]);
  useEffect(() => {
    if (!ip) {
      return;
    }
    if (ip && id && name) {
      try {
        const response = app.post(`/loginurl/2`, {
          ip: ip.toString(),
          cliente_id: id,
          cnpj: cnpj,
          nome: name,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [ip, id]);

  function DefinirContador(contador_id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.reload();
    });
    try {
      app.put(`/clientescontador/${id}`, {
        contador_id: contador_id,
      });
      alert(`Contador definido com sucesso 🤩🎉`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex ml-40 mt-32 text-cyan-900 gap-3">
      <HeaderClient />
      <div className="flex flex-col justify-center items-center border p-2 bg-cyan-600 text-write bg-opacity-70 sr-only">
      <span className="mb-4 font-light text-md">Quantidade de boletos enviado por E-mail:</span><span>{boleto}</span>
      </div>
      <table className="border text-cyan-600 rounded bg-cyan-300 bg-opacity-5 sr-only">
        <thead>
          <tr className="border-b w-[100%]">
            <th className="font-extralight mb-3 p-4 ">
              Últimos logins realizado com seguintes IPs:
            </th>
          </tr>
        </thead>
        <tbody>
          {login.map((login, id) => (
            <tr key={id}>
              <td className="mt-6 pt-4 pl-4">{login.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col bg-cyan-700 p-4 text-write w-[38%] bg-opacity-80 sr-only">
        
        <span className="mb-4 font-bold text-md "> Informações do seu Contador</span>
        <ul>
          <li className="mb-2 w-[100%]">Razão Social: {rz_social}</li>
          <li className="mb-2 w-[100%]">Cnpj: {cnpjContador}</li>
          <li className="mb-2 w-[100%]">Telefone: {telefoneContador}</li>
          <li className="mb-2 w-[100%]">Cep:{cepContador}</li>
          <li className="mb-2 w-[100%]">Cidade: {cidadeContador}</li>
          <li className="mb-2 w-[100%]">Endereço: {enderecoCont}</li>
          <li className="mb-2 w-[100%]">Número: {numero}</li>
          <li className="mb-2 w-[100%]">Bairro: {bairro}</li>
          <li className="mb-2 w-[100%]">UF: {ufCont}</li>

        </ul>
      </div>

      <Siderbar />
    </div>
  );
}
