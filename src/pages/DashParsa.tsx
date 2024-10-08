import { useEffect, useState } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { InfoDash } from "../components/InfoDash";
import { Siderbar } from "../components/SiderBar";
import { api } from "../services/api";
import { GraficParsa } from "../components/GraficParsa";
import { Refresh } from "../services/refresh";
import { GraficParsaBloq } from "../components/GraficParsaBloq";
import { InfoDashBloq } from "../components/InfoDashBloq";

interface DashParsaProps {
  count?: number;
}


export default function DashParsa() {
  const [clientes, setClientes] = useState<DashParsaProps[]>([]);
  const [nivel, setNivel] = useState();
  const [parceiro, setParceiro] = useState<number>();
  //console.log("id",parceiro)
  const [clienteParsa,setClienteParsa] = useState(0)
  const [clienteParsaDesativado, setClienteParsaDesativado] = useState(0)
  const [clienteParsaBloqueado, setClienteParsaBloqueado]= useState(0)
  const [clienteParsaDesbloqueado, setClienteParsaDesbloqueado]= useState(0)
  const userId = localStorage.getItem("Id");
  
  
  

  // const ref = localStorage.getItem("new");
  // useEffect(() => {
  //   if (ref) {
  //     const interval = setInterval(() => {
  //       Refresh(ref);
  //     }, 1000);
  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   }
  // }, [ref]);
  // useEffect(() => {
  //   api.get(`/parceiroIdNumber/${emailParsa}`).then((response) => {
  //    const {id} = (response.data); 
  //    setId(id)
  //   });
  // }, []);


  useEffect(() => {
    if(!userId){
      return
    }
    if(userId){
      api.get(`/user/${userId}`).then((response) => {
        const { nivel } = response.data;
        const {parceiro_id} = response.data;
        setParceiro(parceiro_id)
        //console.log(response.data)
        setNivel(nivel);
        localStorage.setItem("idParceiro", parceiro_id)
      });
    }
  }, [userId]);

  useEffect(()=>{
    if(!parceiro){
      return
    }
    if(parceiro){
      api.get(`/clientecountparceiro/${parceiro}`).then((response) =>{
        setClienteParsa(response.data)
      })
    }
  },[parceiro])
  useEffect(()=>{
    if(!parceiro){
      return
    }
    if(parceiro){
      api.get(`/clientecountparceirodesativado/${parceiro}`).then((response) =>{
       //console.log("cliente", response.data)
        setClienteParsaDesativado(response.data)
      })
    }
  },[parceiro])
  useEffect(()=>{
    if(!parceiro){
      return
    }
    if(parceiro){
      api.get(`/countclientedesbloqueado/${parceiro}`).then((response) =>{
       //console.log("cliente", response.data)
        setClienteParsaDesbloqueado(response.data)
      })
    }
  },[parceiro])
  useEffect(()=>{
    if(!parceiro){
      return
    }
    if(parceiro){
      api.get(`/countclientebloqueado/${parceiro}`).then((response) =>{
       //console.log("cliente", response.data)
        setClienteParsaBloqueado(response.data)
      })
    }
  },[parceiro])

  useEffect(() => {
    api.get("/cliente/count").then((response) => {
      const { ativo } = response.data;
      setClientes(ativo);
    });
  }, []);
  function Logged() {
    const emailParsa = localStorage.getItem("email");
    if (nivel == 1 || nivel == 2 ) {
      return (
        <>
        <div className="flex gap-3 mt-32 md:ml-40">
        <InfoDash name="Clientes" qtda={clienteParsa} qtdi={clienteParsaDesativado} />
        <InfoDashBloq name="Clientes" qtda={clienteParsaBloqueado} qtdi={clienteParsaDesbloqueado} />
    </div>
        <div className="flex ml-16 mr-16 mt-6 ">
        <GraficParsa />
        <GraficParsaBloq />
      </div>
        </>
        
      );
    } else {
      return;
    }
  }
  return (
    <div >
      <header>
        <HeaderClient />
      </header>
      
      {Logged()}
     
      <Siderbar />
    </div>
  );
}
