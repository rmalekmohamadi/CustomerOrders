import { getAllProductsApi } from '@/app/api/productapi';
import { Metadata } from 'next';
import PageTitle from '@/app/ui/pagetitle'
import { HiOutlineTag, HiInformationCircle } from "react-icons/hi";
import { AppAlert } from "@/app/ui/appalert"

import { Breadcrumb } from "flowbite-react";
import AddOrderForm from '@/app/ui/orders/orderaddform';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Add Order',
};

export default async function Page() {
  const [products] = await Promise.all([
    getAllProductsApi(),
  ]);

  return (
    <div className="w-full">
        <nav aria-label="Breadcrumb" className=""><ol className="flex items-center"><li className="group flex items-center"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg><Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="/orders"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>Orders</Link></li><li className="group flex items-center"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg><Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="#">Add</Link></li></ol></nav>
        <PageTitle title="Add Order" />
        <AppAlert condition={products == null || !products.succeed} title="Error" message="Can't connect to server" color="failure" icon={HiInformationCircle} className="mt-4">
          <AddOrderForm products={products.value} />
        </AppAlert>
    </div>
  );
}
