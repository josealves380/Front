import * as Dialog from "@radix-ui/react-dialog";

import { HeaderClient } from "../components/HeaderClient";
import { PesquisaUsuario } from "../components/PesquisaUsuario";
import { Siderbar } from "../components/SiderBar";

export default function PesquisaUser() {
  return (
    <div >
      <header>
        <HeaderClient />
      </header>
      <Dialog.Root>
        <PesquisaUsuario />
      </Dialog.Root>
      <Siderbar />
    </div>
  );
}
