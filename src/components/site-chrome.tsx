import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Loja" },
  { to: "/rastrear", label: "Meu pedido" },
  { to: "/trocas", label: "Trocas" },
  { to: "/ajuda", label: "Ajuda" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-display text-3xl tracking-wide text-foreground">
          PULSO<span className="text-primary">.</span>
        </Link>
        <nav className="flex gap-1 overflow-x-auto text-sm font-semibold">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="whitespace-nowrap rounded-sm px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:grid-cols-4">
        <div>
          <p className="font-display text-2xl">PULSO<span className="text-primary">.</span></p>
          <p className="mt-2 text-muted-foreground">Resolver o seu problema, não só oferecer desconto.</p>
        </div>
        <div><p className="font-semibold">📱 Instagram</p><p className="text-muted-foreground">Dúvidas rápidas e novidades</p></div>
        <div><p className="font-semibold">💬 WhatsApp</p><p className="text-muted-foreground">Atendimento personalizado · resposta em até 2h</p></div>
        <div><p className="font-semibold">☎️ Telefone</p><p className="text-muted-foreground">Casos urgentes · seg–sex 8h–20h</p></div>
      </div>
    </footer>
  );
}
