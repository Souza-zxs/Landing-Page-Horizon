type DashboardNavProps = {
  active: "leads" | "propostas";
};

export default function DashboardNav({ active }: DashboardNavProps) {
  const items: { key: DashboardNavProps["active"]; label: string; href: string }[] = [
    { key: "leads", label: "Leads", href: "/dashboard" },
    { key: "propostas", label: "Propostas", href: "/dashboard/propostas" },
  ];

  return (
    <nav className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === item.key
              ? "bg-horizon-orange text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
