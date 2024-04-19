"use client";

import { Sidebar, Button, FlowbiteSidebarTheme } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiX } from "react-icons/hi";
import { LayoutState } from "../interfaces/layoutstate"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaFilePdf } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { LuListOrdered } from "react-icons/lu";

import Link from 'next/link';

export function AppSideBar({ isCollapsed, setCollapsed }: LayoutState) {
    const pathname = usePathname();

    // collapse sidebar on small screens when navigating to a new page
    useEffect(() => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setCollapsed(true);
      }
    }, [pathname, setCollapsed]);

    return (
        <>
        <div
            className={twMerge(
                "fixed inset-0 z-50 h-full w-64 flex-none border-r border-gray-200 lg:static lg:block lg:h-auto lg:overflow-y-visible dark:border-gray-600",
            isCollapsed && "hidden",
            )}
            >
            <nav aria-label="Sidebar" className="h-full w-64">
                <div className="h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800">
                    <button type="button" className="-ml-3 mr-2 mt-1 p-2 lg:mx-0 lg:hidden absolute top-0 right-0">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" aria-label="Close sidebar" className="size-6 cursor-pointer text-gray-600 dark:text-gray-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                        </path>
                    </svg>
                    </button>
                <div className="mt-4" data-testid="flowbite-sidebar-items">
                    <ul data-testid="flowbite-sidebar-item-group" className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700">
                        <li className="">
                            <Link aria-labelledby="flowbite-sidebar-item-:R6bacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-sidebar-item-icon" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z">
                                </path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z">
                                </path>
                                </svg>
                                <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:R6bacq:" className="flex-1 whitespace-nowrap px-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className="">
                        <Link aria-labelledby="flowbite-sidebar-item-:Rabacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/products">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-sidebar-item-icon" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd">
                        </path>
                        </svg>
                        <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:Rabacq:" className="flex-1 whitespace-nowrap px-3">Products</span>
                        </Link>
                        </li>
                        <li className="">
                        <Link aria-labelledby="flowbite-sidebar-item-:Rebacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/orders">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-testid="flowbite-sidebar-item-icon" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <line x1="10" x2="21" y1="6" y2="6">
                        </line>
                        <line x1="10" x2="21" y1="12" y2="12">
                        </line>
                        <line x1="10" x2="21" y1="18" y2="18">
                        </line>
                        <path d="M4 6h1v4">
                        </path>
                        <path d="M4 10h2">
                        </path>
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1">
                        </path>
                        </svg>
                        <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:Rebacq:" className="flex-1 whitespace-nowrap px-3">Orders</span>
                        </Link>
                        </li>
                        <li className="">
                        <Link aria-labelledby="flowbite-sidebar-item-:Ribacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/pdf/viewer">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"></path></svg>
                        <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:Ribacq:" className="flex-1 whitespace-nowrap px-3">PDF Viewer</span>
                        </Link>
                        </li>
                        <li className="">
                        <Link aria-labelledby="flowbite-sidebar-item-:Ribacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/pdf/designer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" aria-hidden="true" data-testid="flowbite-sidebar-item-icon" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z">
                        </path>
                        </svg>
                        <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:Ribacq:" className="flex-1 whitespace-nowrap px-3">Design Template</span>
                        </Link>
                        </li>
                        <li className="">
                        <Link aria-labelledby="flowbite-sidebar-item-:Rmbacq:" className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" href="/pdf/form">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" aria-hidden="true" data-testid="flowbite-sidebar-item-icon" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M448 75.2v361.7c0 24.3-19 43.2-43.2 43.2H43.2C19.3 480 0 461.4 0 436.8V75.2C0 51.1 18.8 32 43.2 32h361.7c24 0 43.1 18.8 43.1 43.2zm-37.3 361.6V75.2c0-3-2.6-5.8-5.8-5.8h-9.3L285.3 144 224 94.1 162.8 144 52.5 69.3h-9.3c-3.2 0-5.8 2.8-5.8 5.8v361.7c0 3 2.6 5.8 5.8 5.8h361.7c3.2.1 5.8-2.7 5.8-5.8zM150.2 186v37H76.7v-37h73.5zm0 74.4v37.3H76.7v-37.3h73.5zm11.1-147.3l54-43.7H96.8l64.5 43.7zm210 72.9v37h-196v-37h196zm0 74.4v37.3h-196v-37.3h196zm-84.6-147.3l64.5-43.7H232.8l53.9 43.7zM371.3 335v37.3h-99.4V335h99.4z">
                        </path>
                        </svg>
                        <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:Rmbacq:" className="flex-1 whitespace-nowrap px-3">Form</span>
                        </Link>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>      
        </div>
        {!isCollapsed && (
            <div
            onClick={() => setCollapsed(true)}
            onKeyUp={(key) => key.code === "Escape" && setCollapsed(true)}
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden dark:bg-gray-900/60"
            />
        )}
        </>
    );
}
