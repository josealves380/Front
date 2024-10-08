import React, { useEffect, useState } from "react";
import * as V from "victory";
import { api } from "../services/api";
import { ClientesProps } from "../types/ClientesProps";

interface graficProps {
  cidade: string;
  id: number;
}

export function GraficColumn() {
  const [city, setCity] = useState(0);
  const [cidade1, setCidade1] = useState("");
  const [cidade2, setCidade2] = useState("");
  const [cidade3, setCidade3] = useState("");
  const [cidade4, setCidade4] = useState("");
  const [city1, setCity1] = useState(0);
  //console.log(city1)
  const [city2, setCity2] = useState(0);
  //console.log(city2)
  const [city3, setCity3] = useState(0);
  const [city4, setCity4] = useState(0);
  //const [cityInput, setCityInput] = useState("")
  const [cidade, setCidade] = useState<ClientesProps[]>([]);

  useEffect(() => {
    if (cidade1) {
      api
        .post("/clientecity", {
          city: `${cidade1}`,
        })
        .then((response) => {
          const cidade = response.data;
          setCity1(cidade);
        });
    }
  }, [cidade1]);
  useEffect(() => {
    if (cidade2) {
      api
        .post("/clientecity", {
          city: `${cidade2}`,
        })
        .then((response) => {
          const cidade = response.data;
          setCity2(cidade);
        });
    }
  }, [cidade2]);
  useEffect(() => {
    if (cidade3) {
      api
        .post("/clientecity", {
          city: `${cidade3}`,
        })
        .then((response) => {
          const cidade = response.data;
          setCity3(cidade);
        });
    }
  }, [cidade3]);
  useEffect(() => {
    if (cidade4) {
      api
        .post("/clientecity", {
          city: `${cidade4}`,
        })
        .then((response) => {
          const cidade = response.data;
          setCity4(cidade);
        });
    }
  }, []);
  useEffect(() => {
    api.get(`/cliente`).then((response) => {
      setCidade(response.data);
    });
  }, []);
  return (
    <div className=" w-[50%] ml-12">
      <V.VictoryChart domainPadding={35} width={600} height={500}>
        <V.VictoryLabel
          style={[
            { fill: "#42426F", fontSize: 20 },
            { fill: "#42426F", fontFamily: "monospace" },
          ]}
          x={70}
          y={30}
          text="Quantidade de cliente por cidade"
        ></V.VictoryLabel>

        <V.VictoryBar
          style={{
            data: { fill: "blue" },
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      const fill = props.style && props.style.fill;
                      return fill === "red" ? null : { style: { fill: "red" } };
                    }
                  }
                ];
              }
            }
          }]}
          categories={{
            x: [`${cidade1}`, `${cidade1}`, `${cidade1}`,`${cidade1}`],
          }}
          data={[
            { x: `${cidade1}`, y: city1 },
            { x: `${cidade2}`, y: city2 },
            { x: `${cidade3}`, y: city3 },
            { x: `${cidade4}`, y: city4 },
          ]}
          labels={({ datum }) => `${datum.y}`}
        />
      </V.VictoryChart>

      <div className="flex gap-6 ml-20">
        <select
          className="p-2  text-cyan-900 outline-none"
          value={cidade1}
          onChange={(e) => {
            setCidade1(e.target.value);
          }}
        >
          <option>Cidade</option>
          {cidade.map((cidade, id) => (
            <option value={cidade.cidade} key={id}>
              {cidade.cidade}
            </option>
          ))}
        </select>
        <select
          className="p-2  text-cyan-900 outline-none"
          value={cidade2}
          onChange={(e) => {
            setCidade2(e.target.value);
          }}
        >
          <option>Cidade</option>
          {cidade.map((cidade, id) => (
            <option value={cidade.cidade} key={id}>
              {cidade.cidade}
            </option>
          ))}
        </select>
        <select
          className="p-2 text-cyan-900 outline-none"
          value={cidade3}
          onChange={(e) => {
            setCidade3(e.target.value);
          }}
        >
          <option>Cidade</option>
          {cidade.map((cidade, id) => (
            <option value={cidade.cidade} key={id}>
              {cidade.cidade}
            </option>
          ))}
        </select>
        <select
          className="p-2 sr-only  text-cyan-900 outline-none"
          value={cidade4}
          onChange={(e) => {
            setCidade4(e.target.value);
          }}
        >
          <option>Cidade</option>
          {cidade.map((cidade, id) => (
            <option value={cidade.cidade} key={id}>
              {cidade.cidade}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
