import axios from "axios";
import { api } from "../services/api";
//import { f2b } from "../services/f2b";
import { updateStatusBoleto } from "./UpdateStatusBoleto";
import { useMemo, useState } from "react";

export default async function GerarBoleto(
  email: string,
  data_vencimento: string,
  valor_documento: number,
  obs_corpo: string,
  id: number,
  cep: string,
  bairro: string,
  cnpj: string,
  ibge: string,
  endereco: string,
  cidade: string,
  rz_social: string,
  numero: string,
  estado: string,
  basic: string,
) {
  
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  
  try {
    const response = await f2b.post("/cobrancas/", {
     
      objeto_sacado: [
        {
          nome: `${rz_social}`,
          email: `${email}`,
          logradouro_endereco: `${endereco}`,
          numero_endereco: `${numero}`,
          complemento_endereco: `${ibge}`,
          bairro: `${bairro}`,
          cidade: `${cidade}`,
          estado: `${estado}`,
          cep: `${cep}`,
          cnpj: `${cnpj}`,
        },
      ],
      data_vencimento: `${data_vencimento}`,
      valor_cobranca: `${valor_documento}`,
      demonstrativo: [
        {
          "@type": "item",
          numero_demonstrativo: 1,
          texto_demonstrativo: `Boleto Siad Sistemas referente ao mês ${obs_corpo}`,
          qtde_item: 1,
          valor_item: `${valor_documento}`,
        },
      ],
      tipo_envio: "E",
      valor_desconto: 0,
      tipo_desconto: 0,
      numero_dias_desconto: 0,
      parcelas_carne: "1",
      valor_multa: 2,
      tipo_multa: 1,
      valor_mora_dia: 0.33,
      tipo_mora_dia: 0,
      maximo_dias_pagamento: 20,
    });
    //alert(`O boleto do ${rz_social} foi enviado com sucesso`)
    updateStatusBoleto(id)
  } catch (error) {
    alert(`Não foi possível gravar o boleto do ${rz_social}`);
    // alert(error);
    console.log(error);
  }
}
