import { useEffect, useState } from "react";
import { api } from "../services/api";

interface ParceiroProps {
  nome: string;
  id: string;
}

export function SelectedParceiro() {
  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);

  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
    });
  }, []);
  return (
    <select
      id="nome"
      className="h-8 border font-light border-cyan-600 outline-none rounded px-1 ml-2 w-60 mr-4"
    >
      <option value={0}>Selecione</option>
      {parceiro.map((parceiro) => (
        <option selected value={parceiro.id} key={parceiro.id}>
          {parceiro.nome}
        </option>
      ))}
    </select>
  );
}
