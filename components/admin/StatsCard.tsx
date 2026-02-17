interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: string;
}

export function StatsCard({ label, value, sub, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 shadow-sm">
      {icon && <span className="text-2xl">{icon}</span>}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
