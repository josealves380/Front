import React, { ChangeEvent, useCallback } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { Envelope, Lock } from "phosphor-react";
import { Logo } from "../components/Logo";
import { Text } from "../components/Text";
import { FormEvent, useState } from "react";

import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { signIn } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("email", event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };
  const handleLoginUse = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await signIn({ email, senha });
      function Logged() {
        const emailParsa = localStorage.getItem("@PermissionYT:token");
        if (!emailParsa) {
          return;
        }
        if (emailParsa) {
          const isInLoginRoute = !!matchPath(pathname, "/");

          if (isInLoginRoute) {
            navigate("/splash");
          }
        } else {
          const isInLoginRoute = !!matchPath(pathname, "/");
          if (isInLoginRoute) {
            navigate("/splash");
          }
        }
      }
      Logged();
    },
    [email, senha]
  );

  return (
    <div className="flex flex-col mt-20 items-center justify-center text-cyan-900">
      <header className="flex items-center ml-2">
        <Logo />
      </header>
      <form onSubmit={handleLoginUse} className="flex flex-col items-center">
        <div className="m-4">
          <label htmlFor="">E-mail</label>
          <TextInput.Root>
            <TextInput.ICon>
              <Envelope />
            </TextInput.ICon>
            <TextInput.Input
              type="email"
              id="email"
              required
              aria-required
              placeholder="user@gmail.com"
              onChange={handleEmailInput}
              value={email}
            />
          </TextInput.Root>
        </div>

        <div>
          <label htmlFor="">Senha</label>
          <TextInput.Root>
            <TextInput.ICon>
              <Lock />
            </TextInput.ICon>
            <TextInput.Input
              type="password"
              id="password"
              required
              aria-required
              onChange={handlePasswordInput}
              value={senha}              
            />
          </TextInput.Root>
        </div>
        <Button type="submit" onClick={handleLoginUse}>
          Entrar
        </Button>
      </form>
      {/* <Text className="underline cursor-pointer">Recuperar senha</Text> */}
    </div>
  );
}
