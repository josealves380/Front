export interface ClientesProps {
  id: number;
  cliente_id: number;
  senha: string;
  parceiro_id: number;
  name: string;
  email: string;
  cnpj: string;
  statusCliente: string;
  insc_estadual: string;
  n_fantasia: string;
  ativo: boolean;
  cep: string;
  telefone: string;
  tel_contato: string;
  cidade: string;
  rz_social: string;
  bloqueado: boolean;
  tipo: string;
  bairro: string;
  endereco: string;
  gera_online: boolean;
  uf: string;
  numero: string;
  ibge: string;
  data_pag: string;
  data_impl: string;
  perc_mensal: string;
  valor_mensal: string;
  geraBoleto: boolean;
  status: string;
  tipo_envio: string;
  paceiro: {
    id: number;
    nome: string;
  };
}
