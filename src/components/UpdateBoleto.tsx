import { api } from "../services/api";

export async function updateBoleto(id: number, status: string, email: string) {
  addEventListener("submit", (e) => {
    e.preventDefault();
    if(email != email){
      return
    }
    
    //window.location.reload();
  });
  try {
    const response = await api.put(`/upboleto/${id}`, {
      
      status: status,
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}