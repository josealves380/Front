import { api } from "../services/api";

export default function UpdateBoleto(){
  async function updateBoleto(id: number) {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    try {
      const response = await api.put(`/upboleto/${id}`, {
      //   valor_documento: 
      // data_vencimento:
      // n_fantasia:
      // obs_corpo:
      // email:
      });
      //alert("Deletado com sucesso")
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <div>Update Boleto</div>
  )
}