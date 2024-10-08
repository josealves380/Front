import { useEffect, useState } from "react";
import  ClientSuport  from "./ClientSuport";
import { Refresh } from "../services/refresh";
import axios from "axios";
import { app } from "../services/app";
const ref = localStorage.getItem("new");

export default function DashClient() {

 
  // useEffect(() => {
  //   if (ref) {
  //     const interval = setInterval(() => {
  //       Refresh(ref);
  //     }, 1000);
  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   }
  // }, [ref]);

    
  return (
    <div>
      
      <ClientSuport />
    </div>
  );
}
