import { api } from "../services/api";


export async function UpdateStateClienteBloqueio(id: number) {
  
  addEventListener("submit", (e) => {
    e.preventDefault();
  });
  try {
    const response = await api.put(`/clienteBloqueado/${id}`);
    JSON.stringify({
      id: Number,
      ativo: true,
    });
   
   //return window.location.reload();
  } catch (error) {
    alert("algo deu errado");
  }
}