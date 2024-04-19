import { getOrderByIdApi } from '@/app/api/orderapi';
import { Metadata } from 'next';
import PageTitle from '@/app/ui/pagetitle'
import { HiOutlineTag, HiInformationCircle } from "react-icons/hi";
import { AppAlert } from "@/app/ui/appalert"
import OrderModel from "@/app/types/ordermodel"

import { Breadcrumb } from "flowbite-react";
import moment from 'moment';
import Link from 'next/link';
import ProductModel from '@/app/types/productmodel';

export const metadata: Metadata = {
  title: 'View Order',
};

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [order] = await Promise.all([
    getOrderByIdApi(id)
  ]);

  const totalPrice = order?.value?.items?.reduce((accumulator:number, currentValue:ProductModel) => accumulator + currentValue.priceperunit, 0);

  return (
    <div className="w-full">
        <nav aria-label="Breadcrumb" className="">
            <ol className="flex items-center">
                <li className="group flex items-center">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                    <Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="/orders">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                        Orders
                    </Link>
                </li>
                <li className="group flex items-center"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                <Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" data-testid="flowbite-breadcrumb-item" href="#">View</Link></li></ol>
        </nav>
        <PageTitle title="View Order" />
        <AppAlert condition={order == null || !order.succeed} title="Error" message="Can't connect to server" color="failure" icon={HiInformationCircle} className="mt-4">
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 mb-6 border-y border-gray-100">
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Order Date</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black"> {moment(order.value.date).format('YYYY/MM/DD')}</h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Order</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">#{order.value.id}</h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Customer</p>
                            {order.value.customername}
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Address</p>
                            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">{order.value.address}</h6>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <div className="flex items-start flex-col gap-6 xl:flex-row ">
                        <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
                            <div className="p-6 bg-gray-100 rounded-3xl w-full group transition-all duration-500">
                                <h2
                                    className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                                    Order Summary
                                </h2>
                                <div className="data py-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between gap-4 mb-5">
                                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Product Cost</p>
                                        <p className="font-medium text-lg leading-8 text-gray-900">${totalPrice}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 mb-5">
                                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Shipping</p>
                                        <p className="font-medium text-lg leading-8 text-gray-600">$0</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 ">
                                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">Tax</p>
                                        <p className="font-medium text-lg leading-8 text-emerald-500">$0</p>
                                    </div>
                                </div>
                                <div className="total flex items-center justify-between pt-6">
                                    <p className="font-normal text-xl leading-8 text-black ">Subtotal</p>
                                    <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">${totalPrice}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
                            <div className="grid grid-cols-1 gap-6">
                            {order?.value?.items?.map((product:ProductModel) =>                       
                                <div key={product.id} className="rounded-3xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                                        <div className="">
                                            <h2 className="font-medium text-xl leading-8 text-black mb-3">{product.productname}</h2>
                                            <p className="font-normal text-lg leading-8 text-gray-500 ">Id: {product.id}</p>
                                        </div>
                                        <div className="flex items-center justify-between gap-8">
                                            <h6 className="flex items-center gap-3">{product.quantity}</h6>
                                            <h6 className="font-medium text-xl leading-8 text-indigo-600">${product.priceperunit}</h6>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppAlert>
    </div>
  );
}
