import { api } from "../services/api";

export default async function DeleteBoleto(id: number) {
  document.getElementById("delete");
  addEventListener("submit", (e) => {
    e.preventDefault();
  });
  try {
    const response = await api.delete(`/boletodelete/${id}`);
    JSON.stringify({
      id: Number,
    });
    alert("Tem certeza que vai excluir esse cliente ");
    return window.location.reload();
  } catch (error) {
    console.log("algo deu errado");
  }
}