import * as V from "victory";

import { useEffect, useState } from "react";
import { api } from "../services/api";

export function GraficParsa() {
  const [clienteParsa, setClienteParsa] = useState(0);
  const [clienteParsaDesativado, setClienteParsaDesativado] = useState(0);
  const userId = localStorage.getItem("Id");
  const [parceiro, setParceiro] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (userId) {
      api.get(`/user/${userId}`).then((response) => {
        const { parceiro_id } = response.data;
        setParceiro(parceiro_id);
        //console.log(response.data)
      });
    }
  }, [userId]);
  useEffect(() => {
    if (!parceiro) {
      return;
    }
    if (parceiro) {
      api.get(`/clientecountparceiro/${parseInt(parceiro)}`).then((response) => {
        setClienteParsa(response.data);
      });
    }
  }, [parceiro]);
  useEffect(() => {
    if(!parceiro){
      return
    }
    if (parceiro) {
      api
        .get(`/clientecountparceirodesativado/${parceiro}`)
        .then((response) => {
          setClienteParsaDesativado(response.data);
        });
    }
  }, [parceiro]);
  return (
    <div className="flex justify-center items-center md:ml-16 w-[40%] h-[300]">
      <V.VictoryChart domainPadding={35} width={600} height={500}>
        <V.VictoryLabel
          style={[
            { fill: "#42426F", fontSize: 20 },
            { fill: "#42426F", fontFamily: "monospace" },
          ]}
          x={70}
          y={30}
          text="Quantidade de cliente ativos e desativados"
        ></V.VictoryLabel>

        <V.VictoryBar
          style={{
            data: { fill: "blue" },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === "red"
                          ? null
                          : { style: { fill: "red" } };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          categories={{
            x: ["", "", `Ativos`, `Desativados`, "", ""],
          }}
          data={[
            { x: `Desativados`, y: `${clienteParsaDesativado}` },
            { x: `Ativos`, y: `${clienteParsa}` },
          ]}
          labels={({ datum }) => `${datum.y}`}
        />
      </V.VictoryChart>
    </div>
  );
}
