// app/ui/products/product-search.tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductSearch({ defaultQuery = '' }) {
  const [query, setQuery] = useState(defaultQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    setQuery(term);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    // Reset to page 1 when searching
    params.set('page', '1');
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari produk..."
        className="w-full px-4 py-2 pl-10 border rounded-lg"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}