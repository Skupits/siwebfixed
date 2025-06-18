import { Card } from '@/app/ui/dashboard/cards';
import MostSoldChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchAnalyticsData,
  fetchMostSoldProducts,
} from '@/app/lib/prisma';
import { Suspense } from 'react';
import DashboardSkeleton, { CardsSkeleton, ChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/dashboard/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Menampilkan metrik utama */}
      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>

      {/* Grafik dan invoice */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ChartSkeleton />}>
          <Chart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <Invoices />
        </Suspense>
      </div>
    </main>
  );
}

async function Cards() {
  const analytics = await fetchAnalyticsData();
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card title="Total Produk" value={analytics.totalProducts} type="products" />
      <Card title="Total Revenue" value={analytics.totalRevenue} type="revenue" />
      <Card
        title="Produk Terlaris"
        value={`${analytics.mostSoldProduct.name} (${analytics.mostSoldProduct.count})`}
        type="best-seller"
      />
    </div>
  );
}

async function Chart() {
  const mostsold = await fetchMostSoldProducts();
  return <MostSoldChart data={mostsold} />;
}

async function Invoices() {
  return <LatestInvoices />;
}