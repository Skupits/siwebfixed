// app/ui/dashboard/cards.tsx
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

type CardProps = {
  title: string;
  value: string | number;
  type: 'collected' | 'pending' | 'invoices' | 'customers' | 'products' | 'revenue' | 'best-seller';
};

const iconMap = {
  collected: BanknotesIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  customers: UserGroupIcon,
  products: ShoppingBagIcon,
  revenue: CurrencyDollarIcon,
  'best-seller': TrophyIcon,
};

export function Card({ title, value, type }: CardProps) {
  const Icon = iconMap[type];
  
  return (
    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${getColorByType(type)}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${getBarColorByType(type)} rounded-full`} style={{ width: '70%' }}></div>
      </div>
    </div>
  );
}

function getColorByType(type: string): string {
  switch (type) {
    case 'products':
      return 'bg-blue-500';
    case 'revenue':
      return 'bg-green-500';
    case 'best-seller':
      return 'bg-purple-500';
    case 'customers':
      return 'bg-yellow-500';
    case 'invoices':
      return 'bg-pink-500';
    case 'collected':
      return 'bg-emerald-500';
    case 'pending':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}

function getBarColorByType(type: string): string {
  switch (type) {
    case 'products':
      return 'bg-blue-500';
    case 'revenue':
      return 'bg-green-500';
    case 'best-seller':
      return 'bg-purple-500';
    case 'customers':
      return 'bg-yellow-500';
    case 'invoices':
      return 'bg-pink-500';
    case 'collected':
      return 'bg-emerald-500';
    case 'pending':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}