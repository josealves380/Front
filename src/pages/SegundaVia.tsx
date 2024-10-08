import { useState } from "react";
import { Button } from "../components/Button";
import { f2b } from "../services/f2b";
import { Siderbar } from "../components/SiderBar";
import axios from "axios";
import { HeaderClient } from "../components/HeaderClient";

import Barcode from "react-barcode";


export default function SegundaVia() {
  const [cnpj, setCnpj] = useState(""); 
  const [text, setText] = useState('');
  const [barcode, setBarcode] = useState('');
  const [boleto , setBoleto] = useState([])
  const [email, setEmail] = useState("");
  const emailParsa = localStorage.getItem("email");

  const BarCodeGen=()=>{
    setBarcode(text)
  }
  function contasAgendadas(){ 
    f2b.get(`/agendamentos/`, {
      
      params:{
       
        data_inicial: "01/05/2023",
        data_final: "31/12/2023",
        
      }
    }).then(function(response){
      try{
        
        
        console.log(response.data)
      }catch(error){
        console.log(error)
      }
    });
  }
  function segundaViaClientesParceiro() {
    addEventListener("submit", (e) => {
      e.preventDefault();
      //window.parent.location = window.parent.location.href
      window.location.reload();
    });
    f2b
      .get(`/cobrancas/segunda-via`, {
        params: {
          cpf_cnpj: cnpj,
          email: email,
        },
      })
      .then(function (response) {
        try {
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      });
  }
  function gerarCodBarra(){
   

  }
  return (
    <div className="flex justify-center items-center mt-24 text-cyan-900">
      <HeaderClient/>
      <form action="" onSubmit={segundaViaClientesParceiro}>
        <h1 className="font-bold text-xl">Segunda-via</h1>
       <div className="flex gap-3 justify-center items-center">
       <label htmlFor="" className="flex flex-col mt-4">Linha digitável:
        <input
          type="text"
          className="border border-cyan-900 w-[542px] cursor-pointer p-3 outline-none text-cyan-900 rounded"
          placeholder="email@gmail.com"
          value={email}
          onChange={(event)=>setEmail(event.target.value)}
        />
        <input
          type="text"
          className="border border-cyan-900 w-[542px] cursor-pointer p-3 outline-none text-cyan-900 rounded"
          placeholder="cnpj"
          value={cnpj}
          onChange={(event)=>setCnpj(event.target.value)}
        />
        </label>
        
        <Button onClick={segundaViaClientesParceiro} className="mt-10">Gerar</Button>
       </div>
       <input
          type="text"
          className="border border-cyan-900 w-[542px] cursor-pointer p-3 outline-none text-cyan-900 rounded"
          placeholder="EX. 99999.99999 99999.999999 99999.999999 9 99999999999999"
          value={text}
          onChange={(event)=>setText(event.target.value)}
        />
        <Button onClick={BarCodeGen}>Example</Button>
        <div className="row mt-40 ml-32">
          <Barcode value={barcode}/>
        </div>
       <table>

       </table>
      </form>
      <Siderbar/>
    </div>
  );
}
