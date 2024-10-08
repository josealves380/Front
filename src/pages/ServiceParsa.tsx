import { Button } from "../components/Button";
import { HeaderClient } from "../components/HeaderClient";

export default function ServiceParsa() {
  return (
    <div>
      <header>
        <HeaderClient />
      </header>
      <label
        className="flex mt-16 text-cyan-700 font-ligth text-2xl"
        htmlFor=""
      >
        Serviço
      </label>
      <div className="flex gap-2">
        <div className="border border-cyan-300 rounded w-screen max-w-screen-sm"></div>
        <div className="flex flex-col gap-2">
          <Button>Gerenciar Cliente</Button>
          <Button>Visualizar Sugestão</Button>
          <Button>Pedir Suporte</Button>
          <Button>Criar Sugestão</Button>
          <Button>Gerar chave</Button>
          <Button>Gerar Boleto</Button>
        </div>
      </div>
    </div>
  );
}
