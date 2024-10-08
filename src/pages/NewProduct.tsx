import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { api } from "../services/api";

export default function NewProduct(){
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("")
  const navigate = useNavigate();

  async function handleCreateProduto(event: FormEvent) {
    event.preventDefault();
    window.location.reload();
    try {
      const response = await api.post("/produto", {
        nome: nome,
        valor: parseInt(valor),
      });
      const { id } = response.data;
      console.log(response);
      await navigator.clipboard.writeText(id);    
      
    } catch (err) {
      console.log(err);
      //alert("Falha ao criar produto tente novamente");
    }
  }
  return(
    <div className="grid grid-cols-1 justify-center items-center">
      <form onSubmit={handleCreateProduto} className="grid grid-cols-1">
        <h2 className="flex justify-center items-center font-bold text-cyan-900 text-2xl mt-16" >Cadastro de Produtos</h2>
      <div className="flex flex-col justify-center items-center gap-2 mt-16 text-xl text-cyan-900 md:ml-32 ml-10">
         <div>
         <label htmlFor="">Informe o nome do produto:</label>
          <input
            id="nome"
            type="text"
            className="w-[80%] border rounded border-cyan-700 outline-none"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
         </div>
          <div>
          <label htmlFor="">Informe o valor do produto:</label>
          <input
            id="valor"
            type="text"
            className="w-[80%] border rounded border-cyan-700 outline-none"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
          />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button className="md:w-[33%]" onClick={handleCreateProduto}>Gravar</Button>
        
          <Button className="md:w-[33%]">  <Link to={"/cadproduto"}>Voltar</Link></Button>
          </div>
      </form>
    </div>
  )
}