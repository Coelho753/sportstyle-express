import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadRequests, requestSteps, saveRequest, type ServiceRequest } from "@/lib/store";

export const Route = createFileRoute("/trocas")({
  head: () => ({
    meta: [
      { title: "Trocas e reembolsos — Pulso Sport" },
      { name: "description", content: "Solicite troca ou reembolso online, receba um protocolo e acompanhe cada etapa." },
      { property: "og:title", content: "Trocas e reembolsos — Pulso Sport" },
      { property: "og:description", content: "Peça sua troca em minutos e acompanhe pelo protocolo." },
    ],
  }),
  component: Exchanges,
});

const field = "w-full rounded-md border border-input bg-card px-4 py-3 outline-none focus:border-primary";

function Exchanges() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [type, setType] = useState<"troca" | "reembolso">("troca");
  const [order, setOrder] = useState("");
  const [reason, setReason] = useState("Tamanho errado");
  const [created, setCreated] = useState<string | null>(null);

  useEffect(() => setRequests(loadRequests()), []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!order.trim()) return;
    const r: ServiceRequest = {
      protocol: "PS-" + Math.floor(100000 + Math.random() * 900000),
      order: order.trim(), type, reason,
      createdAt: new Date().toLocaleDateString("pt-BR"), step: 0,
    };
    saveRequest(r);
    setRequests(loadRequests());
    setCreated(r.protocol);
    setOrder("");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-6xl">Trocas e reembolsos</h1>
      <p className="mt-2 text-muted-foreground">Sem precisar mandar mensagem: solicite aqui, receba um protocolo e avisamos a cada etapa. Análise em até 5 dias úteis.</p>

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-md border border-border bg-card p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["troca", "reembolso"] as const).map((t) => (
            <button type="button" key={t} onClick={() => setType(t)}
              className={`rounded-md border py-3 font-bold capitalize ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
              {t === "troca" ? "🔄 Troca" : "💰 Reembolso"}
            </button>
          ))}
        </div>
        <input className={field} placeholder="Número do pedido" value={order} onChange={(e) => setOrder(e.target.value)} required />
        <select className={field} value={reason} onChange={(e) => setReason(e.target.value)}>
          {["Tamanho errado", "Cor/modelo diferente", "Produto com defeito", "Não gostei", "Outro"].map((r) => <option key={r}>{r}</option>)}
        </select>
        <button className="w-full rounded-md bg-primary py-3 font-bold text-primary-foreground">Enviar solicitação</button>
        {created && (
          <p className="rounded-md bg-secondary p-3 text-sm">✅ Solicitação registrada! Seu protocolo é <b className="text-primary">{created}</b>. Você receberá atualizações pelo WhatsApp e e-mail.</p>
        )}
      </form>

      {requests.length > 0 && (
        <section className="mt-10">
          <h2 className="text-4xl">Minhas solicitações</h2>
          <div className="mt-4 space-y-3">
            {requests.map((r) => (
              <div key={r.protocol} className="rounded-md border border-border bg-card p-4">
                <div className="flex justify-between text-sm">
                  <b className="text-primary">{r.protocol}</b>
                  <span className="text-muted-foreground">{r.createdAt}</span>
                </div>
                <p className="mt-1 text-sm capitalize">{r.type} · pedido #{r.order} · {r.reason}</p>
                <div className="mt-3 grid grid-cols-4 gap-1">
                  {requestSteps.map((s, i) => (
                    <div key={s}>
                      <div className={`h-1.5 rounded-full ${i <= r.step ? "bg-primary" : "bg-muted"}`} />
                      <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
