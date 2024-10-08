export function CalculateTotalAPagar(valor: string, salario: number){

  const valorTotal = (
    (parseFloat(valor.replace(",", ".")) * salario) /
    100
  ).toFixed(2);
    return(valorTotal)
  
}