// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className={`${shimmer} relative col-span-8 lg:col-span-5 h-96 rounded-xl bg-white p-6 shadow-md border border-gray-100`}>
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
      <div className="h-[calc(100%-3rem)] w-full bg-gray-100 rounded-lg" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className={`${shimmer} relative col-span-8 lg:col-span-3 h-96 rounded-xl bg-white p-6 shadow-md border border-gray-100`}>
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
      
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3" />
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center pt-4 mt-2 border-t border-gray-100">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div>
      <div className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`} />
      <CardsSkeleton />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <ChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </div>
  );
}