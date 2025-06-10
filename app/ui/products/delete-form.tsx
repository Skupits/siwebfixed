'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useTransition } from 'react';

export default function DeleteForm({ 
  deleteProductAction 
}: { 
  deleteProductAction: () => Promise<void> 
}) {
  const [isPending, startTransition] = useTransition();
  
  return (
    <form>
      <button 
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => deleteProductAction())}
        className="rounded-md border p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}