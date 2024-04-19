import { useEffect } from 'react'
import AppPagination from '@/app/ui/apppagination';
import Search from '@/app/ui/search';
import ProductsTable from '@/app/ui/products/productstable';
import { Spinner } from '@/app/ui/spinner';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Alert, Breadcrumb } from "flowbite-react";
import { HiOutlineTag, HiInformationCircle } from "react-icons/hi";
import PageTitle from "@/app/ui/pagetitle";
import { API_BASE_URL } from "../appconfig";
import Loading from '../ui/loading';

export const metadata: Metadata = {
  title: 'products',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const perPage = 10;
  const url = API_BASE_URL + "/products/count?s=" + query;
  
  let totalItems = 0;
  let error = false;
  try {
    const res = await fetch(url);
    const data = await res.json();
    totalItems = data?.value || 0;
  } catch (err) {
    error = true;
  }
  
  if(error)
    {
        return (
            <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error!</span> Can not connect to the server.
            </Alert>
        )
    }

  return (
    <div className="w-full">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="#" icon={HiOutlineTag}>
            Products
        </Breadcrumb.Item>
      </Breadcrumb>
      <PageTitle title="Products" />
      <div className="mt-4 flex gap-2 md:mt-8 justify-between content-center">
        <Search label="Search products..." />
        <div className='mt-4'>Total Items : {totalItems}</div>
      </div>
      <Suspense key={query + currentPage} fallback={<Loading />}>
          <ProductsTable query={query} currentPage={currentPage} perPage={perPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
          <AppPagination totalItems={totalItems} perPage={perPage} />
        </div>
    </div>
  );
}