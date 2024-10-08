import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import axios from "axios";
import { app } from "../services/app";

export default function Splash() {
  const [nivel, setNivel] = useState();
  const [ip, setIp] = useState<number | null>();
  //console.log(ip);
  const navigate = useNavigate();

const userId = localStorage.getItem("Id");
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      localStorage.setItem("Nivel", nivel);
    });
  }, []);

  const getIPAddress = async () => {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;
    setIp(ip);
  };
  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const { nivel } = response.data;
      setNivel(nivel);
    });
    getIPAddress();
  }, [userId]);

  useEffect(() => {
    if (!ip) {
      return;
    }
    if (ip) {
      try {
        const response = app.post(`/login/1`, {
          ip: ip.toString(),
          user_id: userId,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [ip]);

  const handleRedirect = useCallback(() => {
    function Logged() {
      const nivelLogado = localStorage.getItem("Nivel");
      if (nivelLogado == "1") {
        navigate("/adm");
      } else if (nivelLogado == "2") {
        navigate("/parceiro");
      }
      if (nivelLogado == "3") {
        navigate("/parceiro");
      }
      if (nivelLogado == "4") {
        navigate("/clientes/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/1bG9zaWFk/81840/7105/00199");
        //ZXZhbGRvZnJhbmNpc2Nvam9zZTRzaWFkc2lzdGVtYXN1cmxtb2R1bG9zaWFk
      }
      if (nivelLogado == "5") {
        navigate("/dashcontador");
      }
    }
    if (ip) {
      Logged();
    }
  }, [ip]);

  handleRedirect();
  return (
    <div>
      <Logo className="w-[100%] mt-52" />
    </div>
  );
}
