import { HeaderClient } from "../components/HeaderClient";
import { PesquisaParsa } from "../components/PesquisaParsa";

import { Siderbar } from "../components/SiderBar";

export default function PesquisaParceiro() {
  return (
    <div className="h-screen">
      <header>
        <HeaderClient />
      </header>
      <PesquisaParsa />
      <Siderbar />
    </div>
  );
}
