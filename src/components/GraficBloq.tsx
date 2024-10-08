import * as V from "victory";

import { useEffect, useState } from "react";
import { api } from "../services/api";

export function GraficBloq() {
  const [clienteParsa, setClienteParsa] = useState(0);
  const [clienteParsaDesativado, setClienteParsaDesativado] = useState(0);
  //const userId = localStorage.getItem("Id");
  //const [parceiro, setParceiro] = useState("");

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   if (userId) {
  //     api.get(`/user/${userId}`).then((response) => {
  //       const { parceiro_id } = response.data;
  //       setParceiro(parceiro_id);
  //       //console.log(response.data)
  //     });
  //   }
  // }, [userId]);
  useEffect(() => {
   
      api.get(`/clientecountbloq`).then((response) => {
        setClienteParsa(response.data);
      });
    
  }, []);
  useEffect(() => {
    
      api
        .get(`/clientecountdesbloq`)
        .then((response) => {
          setClienteParsaDesativado(response.data);
        });
    
  }, []);
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
          text="Quantidade de cliente bloqueados e desbloqueados"
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
            x: ["", "", `Bloqueados`, `Desbloqueados`, "", ""],
          }}
          data={[
            { x: `Bloqueados`, y: `${clienteParsa}`  },
            { x: `Desbloqueados`, y: `${clienteParsaDesativado}` },
          ]}
          labels={({ datum }) => `${datum.y}`}
        />
      </V.VictoryChart>
    </div>
  );
}
