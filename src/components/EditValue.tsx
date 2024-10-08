import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { CalculateTotalAPagar } from "./CalculateTotalAPagar";
import { useNavigate } from "react-router-dom";

export default function EditValue() {
  const [perc, setPerc] = useState("");
  const [valor, setValor] = useState("");
  const [salario, setSalario] = useState(0);
  const clienteId = localStorage.getItem("idCliente");
  const navigate = useNavigate();
  async function updateDadosCliente() {
    try {
      const response = await api.post(`/cliente/updateperc/${clienteId}`, {
        perc_mensal: perc,
        valor_mensal: valor,
      });
      navigate("/editclient");
      //alert("ok")
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    api.get("/configsalario").then((response) => {
      const [{ salario }] = response.data;
      setSalario(salario);
      //console.log(salario);
    });
  }, []);
  useEffect(() => {
    const val = CalculateTotalAPagar(perc, salario);
    setValor(val);
  }, [perc, salario]);
  return (
    <div className="grid h-screen place-content-center">
      <label className=" flex flex-col text-cyan-900 text-xl font-semibold mb-2">
        Digite o Percentual a ser cobrado do cliente
        <input
          className="w-[100%] h-8 py-6 border font-light border-cyan-600 outline-none rounded mr-2 px-3"
          type="text"
          id="perc"
          title="Valor do percentual pago pelo cliente em cima do salário"
          value={perc}
          onChange={(e) => setPerc(e.target.value)}
        />
      </label>
      <label className=" flex flex-col text-cyan-900 text-xl font-semibold">
        Novo valor que será cobrado do cliente:
        <input
          className="w-[100%] h-8 py-6 border font-light border-cyan-600 outline-none rounded mr-2 px-3"
          type="text"
          id="valor"
          title="Valor do percentual pago pelo cliente em cima do salário"
          value={valor}
        />
      </label>
      <Button
        className="ml-24"
        type="submit"
        onClick={() => updateDadosCliente()}
      >
        Salvar
      </Button>
    </div>
  );
}
