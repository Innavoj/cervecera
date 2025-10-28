"use client"

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/inventory': 'Inventory',
  '/dashboard/recipes': 'Recipes',
  '/dashboard/production': 'Production',
  '/dashboard/sales': 'Sales',
  '/dashboard/suppliers': 'Suppliers',
  '/dashboard/reports': 'Reports',
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'BrewCentral';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <h1 className="font-headline text-xl font-semibold">{title}</h1>
    </header>
  );
}
