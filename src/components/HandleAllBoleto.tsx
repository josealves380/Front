import { api } from "../services/api";

export default async function HandleAllBoletos(
  cliente_id: number,
  parceiro_id: number,
  valor_mensal: string,
  data_vencimento: string,
  mespag: string,
  n_fantasia: string,
  email: string,
  envio: number,
  cep: string,
  bairro: string,
  cnpj: string,
  ibge: string,
  endereco: string,
  cidade: string,
  rz_social: string,
  numero: string,
  estado: string,
  status: string
  ) {
  addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.reload();
  });
  try {
    const response = await api.post(
      `/boleto/${cliente_id}/${envio}/${parceiro_id}`,
      {
        valor_documento: valor_mensal,
        data_vencimento: data_vencimento,
        obs_corpo: mespag,
        n_fantasia: n_fantasia,
        email: email,
        cep: cep,
        bairro: bairro,
        cnpj: cnpj,
        ibge: ibge,
        endereco: endereco,
        cidade: cidade,
        rz_social: rz_social,
        numero: numero,
        estado: estado,
        status: status
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
