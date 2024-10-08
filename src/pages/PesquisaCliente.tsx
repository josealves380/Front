import * as Dialog from "@radix-ui/react-dialog";

import { HeaderClient } from "../components/HeaderClient";
import { Pesquisa } from "../components/Pesquisa";
import { PesquisaClient } from "../components/PesquisaCliente";
import { Siderbar } from "../components/SiderBar";

export default function PesquisaCLiente() {
  return (
    <div className="h-screen">
      <header>
        <HeaderClient />
      </header>
      <Dialog.Root>
        <PesquisaClient/>
        {/* <Pesquisa /> */}
      </Dialog.Root>
      <Siderbar />
    </div>
  );
}
