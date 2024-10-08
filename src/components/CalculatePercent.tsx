export function CalculatePercent(valor: string, salario: number) {
  const valorPercentual = ((parseFloat(valor.replace(",", ".")) * 100) / salario).toFixed(2);
console.log(valorPercentual)  
  return valorPercentual
}
