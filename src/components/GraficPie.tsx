import React, { useCallback, useEffect, useState } from "react";

import * as V from "victory";
import { api } from "../services/api";
import { ParceiroProps } from "../types/ParceiroProps";

interface GrafiPieProps{
  cliente:[  nome: string],
  _count:[
    cliente: number
  ]
}

export function GraficPie() {
  const [parceiro, setParceiro] = useState<ParceiroProps[]>([]);
  const [data, setData] = useState<GrafiPieProps[]>([])
  //console.log(data)
  const [cliente, setCliente] = useState(0);
  //console.log("nome",cliente)
  const [clienteEvaldo, setClienteEvaldo] = useState(0);
  const [clienteFrancisco, setClienteFrancisco] = useState(0);
  const [clienteMicroleste, setClienteMicroleste] = useState(0);
  //const [clienteMarden, setClienteMarden] = useState(0);
  const [clienteItsistema, setClienteItsistemas] = useState(0);
  //const [clienteMutum, setClienteMutum] = useState(0);
  const [clienteAlex, setClienteAlex] = useState(0);
  //const [clienteConselheiro, setClienteConselheiro] = useState(0);

  
  useEffect(() => {
    api.get("/clienteparceiro/count/1").then((response) => {
      setClienteEvaldo(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/clienteparceiro/count/2").then((response) => {
      setClienteFrancisco(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/clienteparceiro/count/3").then((response) => {
      setClienteMicroleste(response.data);
    });
  }, []);
  
 
  useEffect(() => {
    api.get("/clienteparceiro/count/6").then((response) => {
      setClienteItsistemas(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/clienteparceiro/count/8").then((response) => {
      setClienteAlex(response.data);
    });
  }, []);
  // useEffect(() => {
  //   api.get("/clienteparceiro/count/9").then((response) => {
  //     setClienteConselheiro(response.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   api.get("/clienteparceiro/count/10").then((response) => {
  //     setClienteMarden(response.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   api.get("/clienteparceiro/count/11").then((response) => {
  //     setClienteMutum(response.data);
  //   });
  // }, []);
  
  
// const dados = useCallback(()=>{
//   function dataprev(){
//     data.map((data)=>{
//      const d = data.cliente.push()
//      setCliente(d)
//     })
//   }
//   return dataprev 
// },[]) 
// {dados}
useEffect(() => {
  api.get("/parceiro").then((response) => {
    setParceiro(response.data);
    //console.log(response.data)
  });
}, []);
  return (
    <div className="grid grid-cols-1 max-w-md text-cyan-900">
     <h2 className="ml-12 font-bold text-md">Quantidade de cliente por parceiro</h2>
      <V.VictoryLabel
        style={[
          { fill: "green", fontSize: 20 },
          { fill: "green", fontFamily: "monospace"},
        ]}
        x={50}
        y={20}
        
      ></V.VictoryLabel>
      <V.VictoryPie
        width={450}
        height={400}
        colorScale={["gold", "blue", "green", "#652545", "#ff2309", "#3399ff", "#226677", "#012543"]}
        padAngle={({ datum }) => 2}
        innerRadius={100}
        animate={{
          duration: 2000
        }}
        data={[
          { x: "Francisco", y: clienteFrancisco },
          { x: "Microleste", y: clienteMicroleste },
          { x: "Siad Aymores", y: clienteEvaldo },
          { x: "ItSistemas", y: clienteItsistema },
          { x: "Alex", y: clienteAlex },
          // { x: "Gabriel", y: clienteConselheiro },
          // { x: "Marden", y: clienteMarden },
          // { x: "Siad Mutum", y: clienteMutum },
        ]}
        
      ></V.VictoryPie>
        {/* <div>
          <table className="ml-32 mb-2 w-[50%]">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {parceiro.map((parceiro, id) => (
                  <tr>
                    <td>
                      {" "}
                      <input
                    id="parceiro"
                    type="checkbox"
                    name="parceiro"
                    value={parceiro.id}
                    // onChange={(e) => {
                    //   setIdParceiro(parceiro.id);
                    //   consulta(parceiro.id);
                    //   localStorage.setItem(
                    //     "idParceiro",
                    //     parceiro.id.toString()
                    //   );
                    // }}
                    title="Escolher o parceiro antes de consultar e enviar os boletos"
                    aria-required
                    required
                  />
                    </td>
                    <td className="flex">
                      <span className="flex w-full text-xl uppercase">
                        {parceiro.nome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div> */}
    </div>
  );
}
