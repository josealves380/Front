import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";


interface valorFormProps {
  valor_documento: (id: string) => void;
}
export default function EditBoleto() {
  const [id, setId] = useState(0);
  const [n_fantasia, setN_fantasia] = useState("");
  const [email, setEmail] = useState("");
  const [data_vencimento, setData_vencimento] = useState("");
  const [reais, setReais] = useState("");
  console.log("r", reais);
  const [cent, setCent] = useState("");
  const [obs_corpo, setObs_corpo] = useState("");
  const [valor_documento, setValor_ducumento] = useState("");
  
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const idParceiro = localStorage.getItem("idParceiro");
  const boletoid = localStorage.getItem("boletoid");

  const valorTeste = parseInt(reais) + "," + parseInt(cent);

  useEffect(() => {
    api.get(`/boletoone/${idParceiro}/${boletoid}`).then((response) => {
      const {
        id,
        n_fantasia,
        email,
        data_vencimento,
        obs_corpo,
        valor_documento,
        status,
      } = response.data;
      setId(id);
      setN_fantasia(n_fantasia);
      setEmail(email);
      setData_vencimento(data_vencimento);
      setObs_corpo(obs_corpo);
      setValor_ducumento(valor_documento);
      setStatus(status);
    });
  }, [idParceiro, boletoid]);
  async function updateBoleto(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });

    try {
      await api.put(`/upboleto/${id}`, {
        valor_documento: valor_documento,
        data_vencimento: data_vencimento,
        rz_social: n_fantasia,
        obs_corpo: obs_corpo,
        email: email,
        status: status,
      });
      //alert("Deletado com sucesso")
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  function editValor() {
    if (edit == false) {
      return (
        <>
          {/* <input
          disabled
          type="text"
          className="w-[100%] border rounded py-3 px-2 outline-none"
          value={reais}
          onChange={(e)=>setReais(e.target.value)}
        />
        <input
        disabled
           type="text"
          className="w-[100%] border  rounded py-3 px-2  outline-none"
          value={cent}
          onChange={(e)=>setCent(e.target.value)}
        /> */}
        </>
      );
    }
    if (edit == true) {
      return (
        <div className="flex items-center justify-center gap-2">
          <label htmlFor="">Reais:</label>
          <input
            type="text"
            className="w-[20%] mt-3 border border-t-0 border-r-0 rounded text-lg px-1 outline-none"
            value={reais}
            onChange={(e) => setReais(e.target.value)}
          />
          <span className="font-extrabold mt-3 ">,</span>
          <label htmlFor="">Centavos:</label>
          <input
            type="text"
            className="w-[20%] mt-3 border border-t-0 border-l-0 text-lg rounded px-2 outline-none"
            value={cent}
            onChange={(e) => setCent(e.target.value)}
          />
        </div>
      );
    }
  }
  function editTrue() {
    setEdit(true);
  }
  return (
    <div className="grid grid-cols-1 place-content-center max-h-screen ml-16 text-cyan-900">
      <div className="flex justify-start items-center mt-16">
        <Link to={"/boletosApi"}>
          <button className="flex bg-write text-cyan-900 gap-2 text-lg">
            <ArrowLeft size={32} />
            Voltar
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-16 font-bold underline text-lg">
        <h2>Editar boleto</h2>
      </div>
      <form action="" name="valorDoc" >
        <div className="grid grid-cols-3 gap-3 max-w-[95%] place-content-center mt-16">
          <label className="mt-4 flex flex-col">
            Nome Fantasia:
            <input
              type="text"
              className="w-[100%] border rounded py-3 px-2  outline-none"
              value={n_fantasia}
              onChange={(e) => setN_fantasia(e.target.value)}
            />
          </label>

          <label className="mt-4 flex flex-col">
            Email:
            <input
              type="text"
              className="w-[100%] border rounded py-3 px-2  outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="mt-4 flex flex-col">
          
            Vencimento:
            <input
              type="text"
              className="w-[100%] border rounded py-3 px-2 outline-none"
              value={data_vencimento}
              onChange={(e) => setData_vencimento(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-[95%]">
          <label className="mt-4 flex flex-col">
            Referente ao mês:
            <input
              type="text"
              className="w-[100%] border rounded py-3 px-2  outline-none"
              value={obs_corpo}
              onChange={(e) => setObs_corpo(e.target.value)}
            />
          </label>

          <label className="mt-4 flex flex-col">
            Valor cobrado:
            <input
              type="text"
              name=""
              id=""
              className="w-[100%] border rounded py-3 px-2  outline-none"
              value={valor_documento}
              onChange={(e) => setValor_ducumento(e.target.value)}
              title="Valor não pode ser inferior a R$ 20,00 "
            />
          </label>
          <label className="mt-4 flex flex-col">
            Status:
            <input
              type="text"
              className="w-[100%] border rounded py-3 px-2  outline-none"
              value={status}
              readOnly
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
        </div>
        <Link to={"/boletosApi"}>
          <Button
            onClick={() => {
              //substituir(valor_documento)
              updateBoleto(id);
            }}
          >
            Gravar
          </Button>
        </Link>
      </form>
    </div>
  );
}
