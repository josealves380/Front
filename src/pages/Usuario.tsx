import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { Envelope, Lock, User } from "phosphor-react";

import { api } from "../services/api";
import { useState, FormEvent, useEffect } from "react";

import { Siderbar } from "../components/SiderBar";
import { HeaderClient } from "../components/HeaderClient";
import { Link, useNavigate } from "react-router-dom";

export default function Usuario() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [userNivel, setUserNivel] = useState("");
  const [idParceiro, setIparceiro] = useState(0);

  const [nivel, setNivel] = useState();
  const navigate = useNavigate();
  const userId = localStorage.getItem("Id");
  const parceiro = localStorage.getItem("idParceiro");

  useEffect(() => {
    if (parceiro != null) {
      const idParceiro = parseInt(parceiro);
      setIparceiro(idParceiro);
    }
  }, [parceiro]);

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
  }, []);
  // async function encodeBasic(event: FormEvent) {
  //   event.preventDefault();
  //
  //   try {
  //     const response = await api.post("/f2b", {
  //       basic: basic,
  //       user_id: idUser, //setar id parceiro do localstorage
  //     });

  //     setBasic("");
  //     setSalario("");
  //     navigate("/boleto");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function handleCreateUse(event: FormEvent) {
    event.preventDefault();
    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await api.post("/user", {
        email: userEmail,
        name: userName,
        senha: userSenha,
        nivel: userNivel,
      });
      const { id } = response.data;
      //console.log(response);
      navigate("/PesquisaUser");
      await navigator.clipboard.writeText(id);

      setUserEmail("");
      setUserName("");
      setUserSenha("");
      setUserNivel("");
      
    } catch (err) {
      console.log(err);
      alert("Falha ao criar user tente novamente verifique email e a senha são 6 dígitos e nome com 8 caracteres");
    }
  }
  async function handleCreateUseParsa(event: FormEvent) {
    event.preventDefault();
    if (!DataTransfer.name) {
      return;
    }

    try {
      const response = await api.post("/user/parceiro", {
        email: userEmail,
        name: userName,
        senha: userSenha,
        nivel: userNivel,
        id: idParceiro,
      });
      const { id } = response.data;
      //console.log(response);
      //navigate("/PesquisaUser");
      await navigator.clipboard.writeText(id);

      setUserEmail("");
      setUserName("");
      setUserSenha("");
      setUserNivel("");
    } catch (err) {
      console.log(err);
      //alert("Falha ao criar user tente novamente");
    }
  }

  function Logged() {
    if (nivel == 1) {
      return (
        <div>
          <select
            id="nivel"
            required
            aria-required
            className="flex items-center  w-72 gap-1 h-12 px-2 rounded mt-4 border-solid border-2 border-cyan-900 text-cyan-900 text-xs placeholder:text-cyan-900 focus-whithin:ring-2  ring-cyan-700 outline-none"
            value={userNivel}
            onChange={(event) => setUserNivel(event.target.value)}
          >
            <option value={0}>Nível de acesso</option>
            <option value={1}>Administrador</option>
            <option value={2}>Parceiro</option>
            <option value={3}>Suporte</option>
            <option value={4}>Cliente</option>
            <option value={5}>Contador</option>
          </select>
          <Link to={"/PesquisaUser"}>
            <Button type="submit" onClick={handleCreateUse}>
              Cadastrar
            </Button>
          </Link>
        </div>
      );
    } else if (nivel == 2 || nivel == 3) {
      return (
        <div>
          <select
            id="nivel"
            required
            aria-required
            className="flex items-center w-72 gap-1 h-12 px-2 rounded mt-4 border-solid border-2 border-cyan-900 text-cyan-900 text-xs placeholder:text-cyan-900 focus-whithin:ring-2 ring-cyan-700 outline-none"
            value={userNivel}
            onChange={(event) => setUserNivel(event.target.value)}
          >
            <option value={0}>Nível de acesso</option>
            <option value={3}>Suporte</option>
            <option value={4}>Usuário</option>
          </select>
          <Link to={"/PesquisaUserCliente"} >
            <Button type="submit" onClick={handleCreateUseParsa} >
              Cadastrar
            </Button>
          </Link>
        </div>
      );
    } else {
      return;
    }
  }
  return (
    <div className="flex items-center justify-center text-cyan-900">
      <HeaderClient />
      <form onSubmit={handleCreateUse} className="flex flex-col pl-8">
        <h1 className="mt-32 mb-4 text-2xl bold">Cadastro usuário</h1>
        <label htmlFor="">E-mail</label>
        <TextInput.Root>
          <TextInput.ICon>
            <Envelope />
          </TextInput.ICon>
          <TextInput.Input
            type="email"
            required
            aria-required
            name="email"
            id="email_suporte"
            placeholder="user@gmail.com"
            onChange={(event) => setUserEmail(event.target.value)}
            value={userEmail}
            title="Email precisa ser válido"
          />
        </TextInput.Root>
        <label htmlFor="">Nome</label>
        <TextInput.Root>
          <TextInput.ICon>
            <User />
          </TextInput.ICon>
          <TextInput.Input
            type="name"
            required
            aria-required
            name="name"
            id="nome"
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
            title="Nome acima de 3 caracteres"
          />
        </TextInput.Root>
        <label htmlFor="">Senha</label>
        <TextInput.Root>
          <TextInput.ICon>
            <Lock />
          </TextInput.ICon>
          <TextInput.Input
            type="password"
            required
            aria-required
            name="password"
            id="password"
            onChange={(event) => setUserSenha(event.target.value)}
            value={userSenha}
            title="Minimo 6 caracteres"
          />
        </TextInput.Root>

        {Logged()}

        <Siderbar />
      </form>
    </div>
  );
}
