import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Central de ajuda — Pulso Sport" },
      { name: "description", content: "Respostas sobre tamanhos, entregas, pagamento, trocas e reembolsos." },
      { property: "og:title", content: "Central de ajuda — Pulso Sport" },
      { property: "og:description", content: "Tire suas dúvidas na hora, sem esperar atendimento." },
    ],
  }),
  component: Help,
});

const faq = [
  ["Qual o prazo de entrega?", "Postamos seu pedido em até 24h após a confirmação do pagamento. Por causa da alta demanda, entregas no estado de São Paulo levam até 7 dias; para os demais estados, até 14 dias. Acompanhe em “Meu pedido”."],
  ["Como escolher o tamanho?", "Cada produto tem tabela de medidas. Na dúvida, peça um tamanho acima para peças de compressão."],
  ["Quais formas de pagamento?", "Pix (5% off), cartão em até 6x sem juros e boleto."],
  ["Como faço uma troca?", "Na página “Trocas”, informe o pedido e o motivo. Você recebe um protocolo e a etiqueta de envio grátis."],
  ["Quando recebo meu reembolso?", "Temos uma equipe dedicada a reembolsos: a análise leva até 5 dias úteis após recebermos o produto. Pix: 1 dia; cartão: próxima fatura."],
  ["Não resolveu. Com quem falo?", "Temos uma nova equipe estruturada só para acompanhamento no WhatsApp e no Instagram, incluindo ajuda com reembolso. Informe seu protocolo para agilizar."],
];

function Help() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-6xl">Ajuda</h1>
      <p className="mt-2 text-muted-foreground">As dúvidas mais comuns, respondidas na hora.</p>
      <div className="mt-8 space-y-2">
        {faq.map(([q, a]) => (
          <details key={q} className="group rounded-md border border-border bg-card p-4 open:border-primary">
            <summary className="cursor-pointer list-none font-semibold">
              <span className="mr-2 text-primary group-open:hidden">+</span><span className="mr-2 hidden text-primary group-open:inline">–</span>{q}
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 rounded-md bg-accent p-5 text-accent-foreground">
        <p className="font-display text-3xl">Ainda precisa de ajuda?</p>
        <p className="mt-1 text-sm">💬 WhatsApp ou 📸 Instagram: nossa equipe dedicada acompanha seu pedido e ajuda com reembolsos. Tenha o protocolo em mãos.</p>
      </div>
    </div>
  );
}
