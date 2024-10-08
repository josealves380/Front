import * as Dialog from "@radix-ui/react-dialog";

import { HeaderClient } from "../components/HeaderClient";

import { Siderbar } from "../components/SiderBar";
import { PesquisaUsuarioCLiente } from "../components/PesquisaUsuarioCLiente";

export default function PesquisaUserClient() {
  return (
    <div className="h-screen">
      <header>
        <HeaderClient />
      </header>
      <Dialog.Root>
        <PesquisaUsuarioCLiente/>
      </Dialog.Root>
      <Siderbar />
    </div>
  );
}
