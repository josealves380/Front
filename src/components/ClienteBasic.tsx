import { api } from "../services/api";

export async function ClienteBasic(basic: string, id:number) {
  addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.reload();
  });
  try {
    const response = await api.put(`/clientebasic/${id}`, {
      basic: basic,
      
       //setar id parceiro do localstorage
    });

   console.log(`O acesso aos boletos foi liberado para o cliente ${response}` )
  } catch (error) {
    alert(`Não foi possível liberar o acesso para esse cliente`);
  }
}