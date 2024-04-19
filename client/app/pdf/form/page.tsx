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
import { FaFilePdf } from "react-icons/fa";
import { AppAlert } from '@/app/ui/appalert';
import DesignerComponent from '@/app/ui/pdf/designcomponent';
import TemplatePreset from '@/app/types/TemplatePreset';
import { getAllTemplatesApi } from '@/app/api/pdftemplateapi';
import { getBlankTemplate } from '../designer/helper';
import FormComponent from '@/app/ui/pdf/formcomponent';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PDF Form',
};

export default async function Page() {
  
  // const templatePresets = await getTemplatePresets()
  let templatePresets : TemplatePreset[] = [];
  const templates = await getAllTemplatesApi();
  if(templates != null && templates.succeed)
  {
    for(let i = 0; i < templates.value.length; i++)
      {
        templatePresets.push({key: templates.value[i].id.toString(), label: 'Template No ' + templates.value[i].id.toString() + (templates.value[i].isdefault ? "(default order template)" : ""), template: templates.value[i].schema})
      }
  }
  templatePresets.push( { key: 'blank', label: 'Blank', template: getBlankTemplate() })

  return (
    <div className="w-full">
        <nav aria-label="Breadcrumb" className="">
          <ol className="flex items-center">
            <li className="group flex items-center">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
              <Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="#">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" aria-hidden="true" className="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"></path></svg>PDF</Link></li><li className="group flex items-center"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg><Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="#">Form</Link></li></ol></nav>
        <PageTitle title="PDF Form" />
        <AppAlert condition={templatePresets == null || templatePresets.length == 0} title="Error" message="Can't connect to server" color="failure" icon={HiInformationCircle} className="mt-4">
            <Suspense fallback={<Spinner isLoading />}>
            <FormComponent templatePresets={templatePresets} />
            </Suspense>
        </AppAlert>
    </div>
  );
}