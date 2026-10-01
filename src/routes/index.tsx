import { createFileRoute, Link } from "@tanstack/react-router";
import { products, brl } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulso Sport — Roupas esportivas com atendimento rápido" },
      { name: "description", content: "Compre roupas esportivas, acompanhe seu pedido e solicite trocas online, sem esperar." },
      { property: "og:title", content: "Pulso Sport — Roupas esportivas" },
      { property: "og:description", content: "Compre, acompanhe pedidos e troque online em minutos." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="stripe-bg border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Nova coleção · frete grátis acima de R$199</p>
          <h1 className="mt-3 text-6xl sm:text-8xl">Treine mais.<br /><span className="text-primary">Espere menos.</span></h1>
          <p className="mt-4 max-w-md text-muted-foreground">Acompanhe pedidos, peça trocas e tire dúvidas aqui mesmo — sem ficar mandando mensagem.</p>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-2">
            {[
              { to: "/rastrear", icon: "📦", t: "Onde está meu pedido?" },
              { to: "/trocas", icon: "🔄", t: "Trocar ou devolver" },
              { to: "/ajuda", icon: "❓", t: "Dúvidas frequentes" },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="rounded-md border border-border bg-card p-3 text-sm font-semibold transition-colors hover:border-primary">
                <span className="text-2xl">{c.icon}</span>
                <span className="mt-1 block leading-tight">{c.t}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-5xl">Destaques</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((p, i) => (
            <article key={p.id} className="group overflow-hidden rounded-md border border-border bg-card">
              <div className="flex aspect-square items-center justify-center bg-secondary">
                <span className={`font-display text-7xl ${i % 2 ? "text-accent" : "text-primary"} transition-transform group-hover:scale-110`}>{p.name.split(" ").map((w) => w[0]).join("")}</span>
              </div>
              <div className="p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.tag}</p>
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 font-bold text-primary">{brl(p.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            ["⏱️ 2h", "Prazo máximo de resposta no WhatsApp"],
            ["📋 Protocolo", "Toda troca/reembolso ganha um número para acompanhar"],
            ["🔄 Até 5 dias", "Análise de trocas e reembolsos (antes: 7+)"],
          ].map(([a, b]) => (
            <div key={a}><p className="font-display text-4xl">{a}</p><p className="font-medium">{b}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
