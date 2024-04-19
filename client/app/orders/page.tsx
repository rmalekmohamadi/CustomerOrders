import AppPagination from '@/app/ui/apppagination';
import Search from '@/app/ui/search';
import OrdersTable from '@/app/ui/orders/orderstable';
import { Spinner } from '@/app/ui/spinner';
import { AppAlert } from '@/app/ui/appalert';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Alert, Breadcrumb } from "flowbite-react";
import { HiOutlineTag, HiInformationCircle } from "react-icons/hi";
import PageTitle from "@/app/ui/pagetitle";
import Link from 'next/link'
import { FaFilePdf } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { API_BASE_URL } from "../appconfig";
import { orderCountApi, orderFilterApi } from '../api/orderapi';

export const metadata: Metadata = {
  title: 'orders',
};

export const dynamic = 'force-dynamic'

export default async function Page(
{
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = searchParams?.page || 1;
  const perPage = 10;
  const [orsers, totalItems] = await Promise.all([
    orderFilterApi(query, currentPage, perPage),
    orderCountApi(query),
  ]);

  return (
    <AppAlert condition={orsers == null || !orsers.succeed || totalItems == null || !totalItems.succeed} color="failure" icon={HiInformationCircle} title='Error!' message="Can't connect to the server.">
      <div className="w-full">
        <Breadcrumb>
          <Breadcrumb.Item href="#" icon={HiOutlineTag}>
              Orders
          </Breadcrumb.Item>
        </Breadcrumb>
            <PageTitle title="Orders" />
            <div className="mt-4 flex gap-2 md:mt-8 justify-between content-center">
              <div className='flex justify-start'>
                <Search label="Search ..." />
                <div className='flex justify-start'>
                    <Link href="/orders/add" className='p-2 my-2 ml-2 mr-2 mb-4 rounded text-stone-500 bg-stone-200 hover:text-stone-700 hover:bg-stone-300'><IoAddCircleSharp /></Link>
                </div>
              </div>
              <div className='mt-4'>Total Items : {totalItems.value}</div>
            </div>
            <Suspense key={query + currentPage} fallback={<Spinner isLoading />}>
                <OrdersTable orders={orsers.value} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <AppPagination totalItems={totalItems.value} perPage={perPage} />
            </div>
      </div>
    </AppAlert>
    
  );
}