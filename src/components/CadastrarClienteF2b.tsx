import React, { useMemo, useState } from "react";
//import { f2b } from "../services/f2b";
import axios from "axios";
import { api } from "../services/api";

export default async function CadastrarClienteF2b(
  n_fantasia: string,
  email: string,
  endereco: string,
  numero: string,
  ibge: string,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string,
  cnpj: string,
  
) 
{
  const [basic, setBasic] = useState("")
  const userId = localStorage.getItem("Id");
  useMemo(() => {
    api.get(`/getf2b/${userId}`).then((response) => {
      const [{ basic }] = response.data;
      setBasic(basic) 
    });
  }, []);
  const f2b = axios.create({
    baseURL: "https://www.f2b.com.br/api/v1",
    headers: {
      Authorization: `Basic ${basic}`,
    },
  });
  try {
    const response = await f2b.post("/sacados/", {
      
      nome: `${n_fantasia}`,
      email: `${email}`,
      logradouro_endereco: `${endereco}`,
      numero_endereco: `${numero}`,
      complemento_endereco: `${ibge}`,
      bairro: `${bairro}`,
      cidade: `${cidade}`,
      estado: `${estado}`,
      cep: `${cep}`,
      cnpj: `${cnpj}`,
    });
    console.log(response.data)
    alert(`O ${n_fantasia} foi cadastrado com sucesso`);
    
  } catch (error) {
    alert("Não foi possivel");
    console.log(error);
  }
}
