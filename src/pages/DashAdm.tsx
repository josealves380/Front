import { HeaderClient } from "../components/HeaderClient";
import { InfoDash } from "../components/InfoDash";
import { Siderbar } from "../components/SiderBar";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Logo } from "../components/Logo";
import { Grafic } from "../components/Grafic";
import { GraficColumn } from "../components/GraficColuna";
import { GraficPie } from "../components/GraficPie";
import { Refresh } from "../services/refresh";
import { GraficBloq } from "../components/GraficBloq";
import { GraficBloqBoleto } from "../components/GraficBloqBoleto";

interface DashAdmProps {
  count?: number;
}
export default function DashAdm(props: DashAdmProps) {
  const [users, setUsers] = useState<DashAdmProps[]>([]);
  const [cliente, setCliente] = useState<DashAdmProps[]>([]);
  const [clienteDesativado, setClienteDesativado] = useState(0);
  const [userDesativado, setUserDesativado] = useState(0);
  const [parceiroDesativado, setParceiroDesativado] = useState(0);
  const [usersParsa, setUsersParsa] = useState(0);
  const [usersSuporte, setUsersSuporte] = useState(0);
  const [usersSuporteDesativo, setUsersSuportedesativo] = useState(0);
  const [nivel, setNivel] = useState();
  const [aparecer, setAparecer] = useState(false);
  const userId = localStorage.getItem("Id");
  //const ref = localStorage.getItem("new");

  // useEffect(() => {
  //   if (ref) {
  //     const interval = setInterval(() => {
  //       Refresh(ref);
  //     }, 1000);
  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   }
  // }, [ref]);
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);

  useEffect(() => {
    api.get("/user/count").then((response) => {
      setUsers(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/parceiro/parceiroAtivado").then((response) => {
      setUsersParsa(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/parceiro/parceiroDesativado").then((response) => {
      setParceiroDesativado(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/usersuporte/count").then((response) => {
      setUsersSuporte(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/usersuportedesativo/count").then((response) => {
      setUsersSuportedesativo(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/cliente/count").then((response) => {
      setCliente(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/cliente/countDesativado").then((response) => {
      setClienteDesativado(response.data);
    });
  }, []);
  useEffect(() => {
    api.get("/user/countDesativado").then((response) => {
      setUserDesativado(response.data);
    });
  }, []);
  function Logged() {
    if (nivel == 1) {
      return (
        <div className="sm:flex justify-center items-center md:flex ml-12 mt-48 sm:mt-0 gap-4">
          <InfoDash name="Cliente" qtda={cliente} qtdi={clienteDesativado} />
          <InfoDash
            name="Parceiro"
            qtda={usersParsa}
            qtdi={parceiroDesativado}
          />
          <InfoDash
            name="Suporte"
            qtda={usersSuporte}
            qtdi={usersSuporteDesativo}
          />
          <InfoDash name="Usuario" qtda={users} qtdi={userDesativado} />
          <InfoDash name="Contador" qtda={0} qtdi={1} />
        </div>
      );
    } else {
      return;
    }
  }

  return (
    <>
      <header className="w-full mb-24">
        <HeaderClient />
      </header>
      {Logged()}
      <div className="flex md:ml-32 mt-16">
        <Grafic />
      </div>
      <div className="flex md:ml-32 font-bold mt-16">
        <GraficBloq />
        
        <GraficBloqBoleto />
      </div>
      <div className="flex md:ml-32 font-bold">
        <GraficColumn />
        <div className="mt-16 md:ml-12">
          <GraficPie />
        </div>
      </div>

      <Siderbar />
      <footer className="px-14 bg-cyan-900 text-write mt-16">
        Versão: 127;
      </footer>
    </>
  );
}
