import * as V from "victory";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import moment from "moment";

export function Grafic() {
  const [jan, setJan] = useState(0);
  const [fev, setFev] = useState(0);
  const [mar, setMar] = useState(0);
  const [abr, setAbr] = useState(0);
  const [mai, setMai] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [ago, setAgo] = useState(0);
  const [set, setSet] = useState(0);
  const [out, setOut] = useState(0);
  const [nov, setNov] = useState(0);
  const [dez, setDez] = useState(0);
  const [janDes, setJanDes] = useState(0);
  const [fevDes, setFevDes] = useState(0);
  const [marDes, setMarDes] = useState(0);
  const [abrDes, setAbrDes] = useState(0);
  const [maiDes, setMaiDes] = useState(0);
  const [junDes, setJunDes] = useState(0);
  const [julDes, setJulDes] = useState(0);
  const [agoDes, setAgoDes] = useState(0);
  const [setDes, setSetDes] = useState(0);
  const [outDes, setOutDes] = useState(0);
  const [novDes, setNovDes] = useState(0);
  const [dezDes, setDezDes] = useState(0);
  const [ano, setAno]= useState<number>()
  //console.log(ano)

  useEffect(() => {
    const agora = moment();
   // setDia(agora.date()); // Imprimindo o dia
    // setMes(agora.get("month"));
    setAno(agora.year());
  }, []);
  useEffect(()=>{
    if(ano){
      api
      .post("/qativacao/group", {
        data_inicial: `${ano}-01-01`,
        data_final: `${ano}-01-30`,
      })
      .then((response) => {
        setJan(response.data);
      });
    } 
  },[ano])
  useEffect(()=>{
    if(ano) {
      api
      .post("/qativacao/group", {
        data_inicial: `${ano}-02-01`,
        data_final: `${ano}-02-30`,
      })
      .then((response) => {
        setFev(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
      api
      .post("/qativacao/group", {
        data_inicial: `${ano}-03-01`,
        data_final: `${ano}-03-31`,
      })
      .then((response) => {
        setMar(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
         api
    .post("/qativacao/group", {
      data_inicial: `${ano}-04-01`,
      data_final: `${ano}-04-30`,
    })
    .then((response) => {
      setAbr(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {
    api
    .post("/qativacao/group", {
      data_inicial: `${ano}-05-01`,
      data_final: `${ano}-05-31`,
    })
    .then((response) => {
      setMai(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {
    api
      .post("/qativacao/group", {
        data_inicial: `${ano}-06-01`,
        data_final: `${ano}-06-31`,
      })
      .then((response) => {
        setJun(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
    api
      .post("/qativacao/group", {
        data_inicial: `${ano}-07-01`,
        data_final: `${ano}-07-31`,
      })
      .then((response) => {
        setJul(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
    api
      .post("/qativacao/group", {
        data_inicial: `${ano}-08-01`,
        data_final: `${ano}-08-31`,
      })
      .then((response) => {
        setAgo(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
    api
      .post("/qativacao/group", {
        data_inicial: `${ano}-09-01`,
        data_final: `${ano}-09-31`,
      })
      .then((response) => {
        setSet(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {
      api
      .post("/qativacao/group", {
        data_inicial: `${ano}-10-01`,
        data_final: `${ano}-10-31`,
      })
      .then((response) => {
        setOut(response.data);
      });
    }
  },[ano])
  useEffect(()=>{
    if(ano){
      api
        .post("/qativacao/group", {
          data_inicial: `${ano}-11-01`,
          data_final: `${ano}-11-31`,
        })
        .then((response) => {
          setNov(response.data);
        });
    }
  },[ano])
  useEffect(()=>{
    if(ano){
      api
      .post("/qativacao/group", {
        data_inicial: `${ano}-12-01`,
        data_final: `${ano}-12-31`,
      })
      .then((response) => {
        setDez(response.data);
      });
    }
  },[ano])
  function ConsultaJan() {}
  function ConsultaFev() {}
  function ConsultaMar() {}
  function ConsultaAbr() {}
  function ConsultaMai() {}
  function ConsultaJun() {}
  function ConsultaJul() {}
  function ConsultaAgo() {}
  function ConsultaSet() {}
  function ConsultaOut() {}
  function ConsultaNov() {}
  function ConsultaDez() {}
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-01-01`,
        data_final: `${ano}-01-30`,
      })
      .then((response) => {
        setJanDes(response.data);
        //console.log("clientes desativados", response.data)
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-02-01`,
        data_final: `${ano}-02-30`,
      })
      .then((response) => {
        setFevDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
    .post("/qativacao/grouptwo", {
      data_inicial: `${ano}-03-01`,
      data_final: `${ano}-03-31`,
    })
    .then((response) => {
      setMarDes(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
    .post("/qativacao/grouptwo", {
      data_inicial: `${ano}-04-01`,
      data_final: `${ano}-04-30`,
    })
    .then((response) => {
      setAbrDes(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
    .post("/qativacao/grouptwo", {
      data_inicial: `${ano}-05-01`,
      data_final: `${ano}-05-31`,
    })
    .then((response) => {
      setMaiDes(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-06-01`,
        data_final: `${ano}-06-31`,
      })
      .then((response) => {
        setJunDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-07-01`,
        data_final: `${ano}-07-31`,
      })
      .then((response) => {
        setJulDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-08-01`,
        data_final: `${ano}-08-31`,
      })
      .then((response) => {
        setAgoDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-09-01`,
        data_final: `${ano}-09-31`,
      })
      .then((response) => {
        setSetDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
      .post("/qativacao/grouptwo", {
        data_inicial: `${ano}-10-01`,
      data_final: `${ano}-10-31`,
      })
      .then((response) => {
        setOutDes(response.data);
      });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
    .post("/qativacao/group", {
      data_inicial: `${ano}-11-01`,
      data_final: `${ano}-11-31`,
    })
    .then((response) => {
      setNovDes(response.data);
    });}
  },[ano])
  useEffect(()=>{
    if(ano) {api
    .post("/qativacao/group", {
      data_inicial: `${ano}-12-01`,
      data_final: `${ano}-12-31`,
    })
    .then((response) => {
      setDezDes(response.data);
    });}
  },[ano])
  function ConsultaJanDes() {
  }
  function ConsultaFevDes() {
  }
  function ConsultaMarDes() {  }
  function ConsultaAbrDes() {  }
  function ConsultaMaiDes() {  }
  function ConsultaJunDes() {  }
  function ConsultaJulDes() {  }
  function ConsultaAgoDes() {  }
  function ConsultaSetDes() {  }
  function ConsultaOutDes() {  }
  function ConsultaNovDes() {  }
  function ConsultaDezDes() {  }

  return (
    <div className="flex justify-center items-center md:ml-16 ">
      <V.VictoryChart width={600} height={400}>
        <V.VictoryLabel
          style={[
            { fill: "red", fontSize: 20 },
            { fill: "green", fontFamily: "monospace" },
            
          ]}
          x={70}
          y={10}
          text="Clientes desativados"
        ></V.VictoryLabel>
        <V.VictoryLine
          style={{
            data: { stroke: "tomato" },
          }}
          data={[
            { x: "Jan", y: janDes },
            { x: "Fev", y: fevDes },
            { x: "Mar", y: marDes },
            { x: "Abr", y: abrDes },
            { x: "Mai", y: maiDes },
            { x: "Jun", y: junDes },
            { x: "Jul", y: julDes },
            { x: "Ago", y: agoDes },
            { x: "Set", y: setDes },
            { x: "Out", y: outDes },
            { x: "Nov", y: novDes },
            { x: "Dez", y: dezDes },
          ]}
          labels={({ datum }: any) => datum.y}
        />
      </V.VictoryChart>
      <V.VictoryChart width={600} height={400}>
        <V.VictoryLabel
          style={[
            { fill: "green", fontSize: 20 },
            { fill: "green", fontFamily: "monospace" },
          ]}
          x={70}
          y={10}
          text="Clientes ativados"
        ></V.VictoryLabel>
        
        <V.VictoryLine
          style={{
            data: { stroke: "green" },
          }}
          
          data={[
            { x: "Jan", y: jan },
            { x: "Fev", y: fev },
            { x: "Mar", y: mar },
            { x: "Abr", y: abr },
            { x: "Mai", y: mai },
            { x: "Jun", y: jun },
            { x: "Jul", y: jul },
            { x: "Ago", y: ago },
            { x: "Set", y: set },
            { x: "Out", y: out },
            { x: "Nov", y: nov },
            { x: "Dez", y: dez },
          ]}
          labels={({ datum }: any) => datum.y}
        />
      </V.VictoryChart>
      <div className="flex flex-col justify-center items-center sr-only">
        <label className="flex gap-2">
          Jan
          <input
            type="checkbox"
            onClick={() => {
              ConsultaJan();
              ConsultaJanDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Fev
          <input
            type="checkbox"
            onClick={() => {
              ConsultaFev();
              ConsultaFevDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Mar
          <input
            type="checkbox"
            onClick={() => {
              ConsultaMar();
              ConsultaMarDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Abr
          <input
            type="checkbox"
            onClick={() => {
              ConsultaAbr();
              ConsultaAbrDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Mai
          <input
            type="checkbox"
            onClick={() => {
              ConsultaMai();
              ConsultaMaiDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Jun
          <input
            type="checkbox"
            onClick={() => {
              ConsultaJun();
              ConsultaJunDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Jul
          <input
            type="checkbox"
            onClick={() => {
              ConsultaJul();
              ConsultaJulDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Ago
          <input
            type="checkbox"
            onClick={() => {
              ConsultaAgo();
              ConsultaAgoDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Set
          <input
            type="checkbox"
            onClick={() => {
              ConsultaSet();
              ConsultaSetDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Out
          <input
            type="checkbox"
            onClick={() => {
              ConsultaOut();
              ConsultaOutDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Nov
          <input
            type="checkbox"
            onClick={() => {
              ConsultaNov();
              ConsultaNovDes();
            }}
          />
        </label>
        <label className="flex gap-2">
          Dez
          <input
            type="checkbox"
            onClick={() => {
              ConsultaDez();
              ConsultaDezDes();
            }}
          />
        </label>
      </div>
    </div>
  );
}
