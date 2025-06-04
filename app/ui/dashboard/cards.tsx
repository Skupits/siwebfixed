// app/ui/dashboard/cards.tsx

type CardProps = {
  title: string;
  value: string | number;
  type: 'collected' | 'pending' | 'invoices' | 'customers' | 'products' | 'revenue' | 'best-seller';
};

export function Card({ title, value, type }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
