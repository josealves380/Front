import LogoPq from "./LogoPq";
import { Upload, UserCircle } from "phosphor-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useParams } from "react-router-dom";


export function HeaderClient() {
  const { Logout } = useAuth();
  const [name, setName] = useState();
  const [nivel, setNivel] = useState("");
  const [nomeParceiro, setNomeParceiro] = useState();

  const userId = localStorage.getItem("Id");
  
  const ref = localStorage.getItem("new");
  const { p5 } = useParams();
  const { p6 } = useParams();
  const { p7 } = useParams();
  const cnpj = `${p6}${p5}${p7}`;
  
  const { Nivel } = useParams();
  //console.log(nivell);
  //consulta refresh-token e seta um novo token
  // useEffect(() => {
  //   if(ref){
  //   // const interval = setInterval(() => {
  //   api
  //     .post(`/refresh-token`, {
  //       ref,
  //     })
  //     .then((response) => {
  //       //const {id} = (response.data)
  //       const { token } = response.data;
  //       localStorage.setItem("@PermissionYT:token", token);
  //       //localStorage.setItem("new", id)
  //     });
  //   // }, 5000);
  //   //return () => clearInterval(interval);
  //   }
  // }, [ref]);
  //  useMemo(() => {
  //   api.get(`/getf2b/${userId}`).then((response) => {
  //     const [{ basic }] = response.data;
  //     localStorage.setItem("basic", basic);
  //   });
  // }, []);
  useEffect(() => {
    if(!userId){
      return
    }
    if(userId){

      api.get(`/user/name/${userId}`).then((response) => {
        const { name } = response.data;
        if (!name) {
          return;
        }
        if (name) {
          setName(name);
          localStorage.setItem("name", name);
        }
      });
    }
  }, [userId]);
  useEffect(() => {
    if (!Nivel) {
      return;
    }
    if (Nivel) {
      api.get(`/clienteb/${cnpj}`).then((response) => {
        //console.log(response.data);
        const { n_fantasia } = response.data;
        setName(n_fantasia);
      });
    }
  }, [cnpj, Nivel]);
  useEffect(() => {
    if(nivel!= "3"){
      return;
    }
    if (nivel == "3") {
      api.get(`/usersuporteparceiro/suporte/${userId}`).then((response) => {
        const [
          {
            parceiro: { email, n_fantasia },
          },
        ] = response.data;
        const [{ parceiro_id }] = response.data;
        const [{ nivel }] = response.data;
        localStorage.setItem("emailParceiro", email);
        localStorage.setItem("idParceiro", parceiro_id);
        setNomeParceiro(n_fantasia);
        setNivel(nivel);
      });
    }
  }, [nivel]);
  return (
    <div className="bg-gost flex p-4 w-full justify-around text-cyan-900 items-center fixed top-0 left-0 border-none z-50 float">
      <LogoPq className="flex mr-auto" />
      {(() => {
        switch (nivel) {
          case "3":
            return (
              <>
                <div className="flex text-xs font-extralight">
                  Empresa: {nomeParceiro}
                </div>
              </>
            );
        }
      })()}
      <div className="w-20"></div>
      <div className="flex justify-items-center items-center ">
        <div className="flex items-center mr-2 ml-1 uppercase">
          <UserCircle size={32} weight="light" />
          {name}
        </div>

        <div className="text-cyan-900 flex justify-end items-end font-light text-2xl">
          |
        </div>
        <Upload size={24} weight="light" className="rotate-90 text-cyan-900 " />
        <button onClick={Logout} className="text-cyan-900 ml-1">
          Sair
        </button>
      </div>
    </div>
  );
}
