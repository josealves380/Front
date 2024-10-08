export interface ParceiroProps {
  id: number;
  senha: string;
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
  bairro: string;
  endereco: string;
  uf: string;
  numero: string;
  nome:string;
  ibge: string;
  paceiro: {
        id: number;
        nome: string;
      };
}
// export interface ParceiroProps {
//   id: number;
//   parceiro_id: number;
//   nome: string;
//   email: string;
//   cnpj: string;
//   statusCliente: string;
//   ativo: boolean;
//   telefone: string;
//   rz_social: string;
//   bloqueio: boolean;
//   cidade: string;
//   
// }