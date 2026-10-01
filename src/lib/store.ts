export const products = [
  { id: 1, name: "Camiseta Dry Run", price: 89.9, tag: "Corrida" },
  { id: 2, name: "Legging Compress", price: 149.9, tag: "Treino" },
  { id: 3, name: "Short Velocity", price: 79.9, tag: "Corrida" },
  { id: 4, name: "Jaqueta Wind", price: 229.9, tag: "Outdoor" },
  { id: 5, name: "Top Impact", price: 99.9, tag: "Treino" },
  { id: 6, name: "Regata Breeze", price: 69.9, tag: "Academia" },
];

export const orderSteps = ["Pedido confirmado", "Pagamento aprovado", "Em separação", "Enviado", "Entregue"];

export const demoOrders: Record<string, { item: string; step: number; eta: string }> = {
  "1001": { item: "Camiseta Dry Run (M)", step: 3, eta: "03/10" },
  "1002": { item: "Legging Compress (P)", step: 4, eta: "Entregue em 28/09" },
  "1003": { item: "Jaqueta Wind (G)", step: 1, eta: "07/10" },
};

export const requestSteps = ["Solicitação recebida", "Produto recebido", "Em análise", "Concluído"];

export type ServiceRequest = {
  protocol: string;
  order: string;
  type: "troca" | "reembolso";
  reason: string;
  createdAt: string;
  step: number;
};

const KEY = "pulso-requests";
export function loadRequests(): ServiceRequest[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveRequest(r: ServiceRequest) {
  localStorage.setItem(KEY, JSON.stringify([r, ...loadRequests()]));
}
export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
