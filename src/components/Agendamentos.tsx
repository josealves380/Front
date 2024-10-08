import { f2b } from "../services/f2b";

export default function Agendamentos(n_fantasia: string, email: string, datainicial: string, vlTotal: string, agenda: string, mult: number, jur: number, data_pag: string){
  try {
  f2b.post("/cobrancas/", {    
    objeto_sacado: [
      {
        nome: `${n_fantasia}`,
        email: `${email}`,
      },
    ],
    data_vencimento: `${datainicial}`,
    valor_cobranca: `${vlTotal}`,
    demonstrativo: [
      {
        "@type": "item",
        numero_demonstrativo: 1,
        texto_demonstrativo: `Boleto Siad Sistemas referente ao mês anterior`,
        qtde_item: 1,
        valor_item: `${vlTotal}`,
      },
    ],

    valor_desconto: 0,
    tipo_desconto: 0,
    numero_dias_desconto: 0,
    antecedencia_agendamento:10,
    periodicidade_agendamento: `${agenda}`,
    valor_multa: `${mult}`,
    tipo_multa: 1,
    valor_mora_dia: `${jur}`,
    tipo_mora_dia: 0,
    maximo_dias_pagamento: 20,
  });
  
  alert("enviado");
} catch (error) {
  alert(error);
  console.log(error);
}
}