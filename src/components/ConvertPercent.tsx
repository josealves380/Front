export function ConvertPercent(perc_mensal: string){

  const options = { minimumFractionDigits: 2, maximumFractionDigits: 3 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  let numero = (perc_mensal);
  return formatNumber.format(parseFloat(numero));
  
}