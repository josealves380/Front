import { api } from "../services/api";

async function handleBoletosCliente(
  cliente_id: string,
  vlTotal: string,
  datainicial: string,
  mespag: string,
  n_fantasia: string,
  email: string,
  status: string,
  envio: string,
  parceiro_id: number,
  
) {
  addEventListener("submit", (e) => {
    e.preventDefault();
    //window.parent.location = window.parent.location.href
    window.location.reload();
  });
  try {
    const response = await api.post(`/boleto/${cliente_id}/${envio}/${parceiro_id}`, {
      valor_documento: parseFloat(vlTotal),
      data_vencimento: datainicial,
      obs_corpo: mespag,
      n_fantasia: n_fantasia,
      email: email,
      status: `${status}`,
    });
    console.log(response.data);
    alert("criado com sucesso")
  } catch (error) {
    alert(`Não foi possível gravar o boleto do ${n_fantasia}`)
    console.log(error);
  }
}

export default handleBoletosCliente;
