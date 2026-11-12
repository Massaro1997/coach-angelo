"use client";

import { useEffect } from "react";
import { registraSW } from "./dispositivo";

/** Nel layout: registra il service worker su qualsiasi pagina /app si entri. */
export default function RegistraSW() {
  useEffect(() => {
    registraSW();
  }, []);
  return null;
}
