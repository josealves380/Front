import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";

import ContasApagar from "../components/ContasAPagar";
import { Link } from "react-router-dom";

export default function Boleto() {
  return (
    <div>
      <header>
        <HeaderClient />
      </header>
     

      <form className="md:flex md:flex-col md:justify-center md:items-center mt-32 text-cyan-700">
        <ContasApagar />
      </form>

      <Siderbar />
    </div>
  );
}
