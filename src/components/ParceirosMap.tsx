import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ParceiroProps } from "../types/ParceiroProps";

export default function ParceirosMap(){
  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);
  const [idParceiro, setIdParceiro] = useState(0);
  const [nivel, setNivel] = useState<any>();
  const userId = localStorage.getItem("Id");
  const idParsa = idParceiro.toString();

  if (nivel == "1") {
    localStorage.setItem("idParceiro", idParsa);
  }

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);
  useEffect(() => {
    api.get("/parceiro").then((response) => {
      setParceiro(response.data);
    });
  }, []);

  return(
    <div className="grid grid-cols-12 border rounded p-4 max-w-screen-xl gap-2">
    {parceiro.map((parceiro, id) => (
      <div key={id} className="flex col-span-3">
        <div className="flex justify-center items-center">
          <input
            id="parceiro"
            type="checkbox"
            name="parceiro"
            value={parceiro.id}
            onChange={(e) => {
              setIdParceiro(parceiro.id);

              //localStorage.setItem("mespag", e.target.value);
            }}
            title="Escolher o parceiro antes de consultar e enviar os boletos"
            aria-required
            required
          />
          <span className="ml-2 text-xl uppercase">
            {parceiro.nome}
          </span>
        </div>
      </div>
    ))}
  </div>
  )
}