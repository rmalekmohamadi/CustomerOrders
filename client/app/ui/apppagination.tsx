'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Pagination } from "flowbite-react";

export default function AppPagination({ totalItems, perPage, totalPages }: { totalItems?: number, perPage?: number, totalPages?: number }) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const onPageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    const url = `${pathname}?${params.toString()}`;
    
    router.push(url);
  };

  let total = 0;
  if(totalPages != null)
  {
    total = totalPages;
  }
  else if(totalItems != null && perPage != null && perPage > 0)
  {
    const divis = Math.trunc(totalItems/perPage);
    total = totalItems % perPage == 0 ? divis : divis + 1;
  }
  
  return  <Pagination currentPage={currentPage} totalPages={total} onPageChange={onPageChange} showIcons />
}