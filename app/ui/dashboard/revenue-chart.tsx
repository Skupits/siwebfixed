'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { useState } from 'react';

type Props = {
  data: { name: string; count: number }[];
};

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function MostSoldChart({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (_, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="col-span-8 lg:col-span-5 h-96 rounded-xl bg-white p-6 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Produk Terlaris</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Periode: </span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Bulan Ini</option>
            <option>3 Bulan Terakhir</option>
            <option>Tahun Ini</option>
          </select>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart 
          data={data} 
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          barGap={8}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar 
            dataKey="count" 
            name="Jumlah Terjual" 
            radius={[4, 4, 0, 0]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                fillOpacity={activeIndex === index ? 1 : 0.8}
                stroke={activeIndex === index ? COLORS[index % COLORS.length] : 'none'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}