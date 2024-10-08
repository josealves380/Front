import { api } from "../services/api";

export async function UpdateStateCliente(id: number) {
  document.getElementById("botao_ativar");
  addEventListener("submit", (e) => {
    e.preventDefault();
    //window.parent.location = window.parent.location.href
    window.location.reload();
  });
  try {
    const response = await api.put(`/cliente/${id}`);
    JSON.stringify({
      id: Number,
      //ativo: true,
    });
    localStorage.setItem("idCliente", id.toString());
    //return window.location.reload();
  } catch (error) {
    alert("algo deu errado");
  }
}