export function ConvertNumber(valor: string){

  const options = { minimumFractionDigits: 2, maximumFractionDigits: 3 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  let numero = (valor);
  return formatNumber.format(parseFloat(numero));
  
}
  