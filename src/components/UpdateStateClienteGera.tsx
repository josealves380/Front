import { api } from "../services/api";

export async function UpdateStateClienteGera(id: number) {
  document.getElementById("gera");
  addEventListener("submit", (e) => {
    e.preventDefault();
  });
  try {
    const response = await api.put(`/clientegeraOnline/${id}`);
    JSON.stringify({
      id: Number,
      gera_online: true,
    });
    //return window.location.reload();
  } catch (error) {
    alert("algo deu errado");
  }
}