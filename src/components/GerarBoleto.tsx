import { useMemo, useState } from "react";

//import { api } from "../services/api";
import axios from "axios";

export default function GerarBoleto(
  n_fantasia: string,
  email: string,
  datainicial: string,
  vlTotal: string,
  //agenda: string,
  mult: number,
  jur: number,
  mespag: string,
  cnpj: string,
  bairro: string,
  cep: string,
  cidade: string,
  endereco: string,
  ibge: string,
  numero: string,
  uf: string,
  basic: string
) {
  
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  try {
    f2b.post("/cobrancas/", {
      objeto_sacado: [
        {
          nome: `${n_fantasia}`,
          email: `${email}`,
          cnpj: `${cnpj}`,
          bairro: `${bairro}`,
          cep: `${cep}`,
          cidade: `${cidade}`,
          endereco: `${endereco}`,
          ibge: `${ibge}`,
          numero: `${numero}`,
          uf: `${uf}`,
        },
      ],
      data_vencimento: `${datainicial}`,
      valor_cobranca: `${vlTotal}`,
      demonstrativo: [
        {
          "@type": "item",
          numero_demonstrativo: 1,
          texto_demonstrativo: `Boleto Siad Sistemas referente ao mês ${mespag}`,
          qtde_item: 1,
          valor_item: `${vlTotal}`,
        },
      ],

      valor_desconto: 0,
      tipo_desconto: 0,
      numero_dias_desconto: 0,
      parcelas_carne: 1,
      valor_multa: `${mult}`,
      tipo_multa: 1,
      valor_mora_dia: `${jur}`,
      tipo_mora_dia: 0,
      maximo_dias_pagamento: 20,
    });
    alert(`O boleto do ${n_fantasia} foi enviado com sucesso`);
  } catch (error) {
    alert(`Não foi possível gravar o boleto do ${n_fantasia}`);
    console.log(error);
  }
}
