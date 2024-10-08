import { HeaderClient } from "../components/HeaderClient";
import { PesquisaCont } from "../components/PesquisaContador";


import { Siderbar } from "../components/SiderBar";

export default function PesquisaContador() {
  return (
    <div className="h-screen">
      <header>
        <HeaderClient />
      </header>
      <PesquisaCont />
      <Siderbar />
    </div>
  );
}
