import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { demoOrders, orderSteps } from "@/lib/store";

export const Route = createFileRoute("/rastrear")({
  head: () => ({
    meta: [
      { title: "Acompanhar pedido — Pulso Sport" },
      { name: "description", content: "Veja em tempo real onde está o seu pedido e o prazo de entrega." },
      { property: "og:title", content: "Acompanhar pedido — Pulso Sport" },
      { property: "og:description", content: "Consulte o status e o prazo de entrega do seu pedido." },
    ],
  }),
  component: Track,
});

function Track() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const order = result ? demoOrders[result] : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-6xl">Meu pedido</h1>
      <p className="mt-2 text-muted-foreground">Digite o número do pedido (teste: 1001, 1002 ou 1003).</p>
      <form onSubmit={(e) => { e.preventDefault(); setResult(code.trim()); }} className="mt-6 flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ex: 1001" inputMode="numeric"
          className="flex-1 rounded-md border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
        <button className="rounded-md bg-primary px-5 font-bold text-primary-foreground">Consultar</button>
      </form>

      {result && !order && (
        <p className="mt-6 rounded-md border border-destructive p-4 text-sm">Pedido não encontrado. Confira o número no e-mail de confirmação ou fale no WhatsApp.</p>
      )}

      {order && (
        <div className="mt-8 rounded-md border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Pedido #{result}</p>
          <p className="text-lg font-semibold">{order.item}</p>
          <p className="mt-1 text-sm">Previsão: <span className="font-bold text-primary">{order.eta}</span></p>
          <ol className="mt-6 space-y-4">
            {orderSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= order.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i < order.step ? "✓" : i + 1}</span>
                <span className={i <= order.step ? "font-semibold" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ol>
          {order.step === 4 && (
            <Link to="/trocas" className="mt-6 inline-block text-sm font-semibold text-primary underline">Precisa trocar? Solicite aqui →</Link>
          )}
        </div>
      )}
    </div>
  );
}
