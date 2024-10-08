import { api } from "../services/api";

export async function updateStatusBoleto(id: number) {
  addEventListener("submit", (e) => {
    e.preventDefault();
    //window.parent.location = window.parent.location.href
    window.location.reload();
  });
  try {
    const response = await api.put(`/upstatusboleto/${id}`, {
      status: "enviado",
    });
    return response;
    
  } catch (error) {
    console.log(error);
  }
}