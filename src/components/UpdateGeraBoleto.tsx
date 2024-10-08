import { api } from "../services/api";

export async function UpdateStateGeraBoleto(cliente_id: number) {
  document.getElementById("geraBoleto");
  addEventListener("submit", (e) => {
    e.preventDefault();
  });
  try {
    const response = await api.put(`/clientegeraBoleto/${cliente_id}`);
    JSON.stringify({
      id: Number,
      geraBoleto: true,
    });
    //alert("up")
    //return window.location.reload();
  } catch (error) {
    alert("algo deu errado");
  }
}