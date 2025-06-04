// app/ui/dashboard/revenue-chart.tsx

'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: { name: string; count: number }[];
};

export default function MostSoldChart({ data }: Props) {
  return (
    <div className="col-span-4 h-72 rounded-xl bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">5 Produk Terlaris</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
