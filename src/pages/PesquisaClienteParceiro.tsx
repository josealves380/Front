import * as Dialog from "@radix-ui/react-dialog";

import { HeaderClient } from "../components/HeaderClient";

import { Siderbar } from "../components/SiderBar";
import PesquisaClienteParsa from "../components/PesquisaClienteParsa";
  

export default function PesquisaCLienteParceiro() {
  return (
    <div className="h-screen">
      <header>
        <HeaderClient />
      </header>
      <Dialog.Root>
        <PesquisaClienteParsa/>
        {/* <Pesquisa /> */}
      </Dialog.Root>
      <Siderbar />
    </div>
  );
}
