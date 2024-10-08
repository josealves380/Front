import { useEffect } from "react";
import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";
import { app } from "../services/app";

export default function DashContador() {
  // useEffect(() => {
  //   app.get(`/getcontadorid/fb8a466e-981f-49c6-a1d3-27cd2143d04d `).then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);
  return (
    <div>
      <HeaderClient />
      <div>DashContador</div>
      <Siderbar />
    </div>
  );
}
