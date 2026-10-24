"use client";

// Firma disegnata col dito o col mouse, condivisa fra il contratto normale
// e quello a ore.

import { useEffect, useRef } from "react";

export function useFirma(pronto: unknown) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const disegna = useRef(false);
  const vuoto = useRef(true);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    // il canvas va dimensionato sui pixel reali, altrimenti il tratto
    // esce sfocato e disallineato dal dito
    const dpr = window.devicePixelRatio || 1;
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0d0d0d";
    vuoto.current = true;
  }, [pronto]);

  function punto(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  const handlers = {
    onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
      e.preventDefault();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      disegna.current = true;
      vuoto.current = false;
      const p = punto(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    },
    onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
      if (!disegna.current) return;
      e.preventDefault();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const p = punto(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    },
    onPointerUp() {
      disegna.current = false;
    },
    onPointerLeave() {
      disegna.current = false;
    },
  };

  function pulisci() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    vuoto.current = true;
  }

  return {
    canvasRef,
    handlers,
    pulisci,
    vuota: () => vuoto.current,
    png: () => canvasRef.current!.toDataURL("image/png"),
  };
}
