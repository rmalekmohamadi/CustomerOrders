'use server';

import { API_BASE_URL } from "@/app/appconfig";

export async function getAllProductsApi() {
    return await fetch(API_BASE_URL + '/products/filter?page=1&perpage=200', { cache: 'no-store' }).then(async res => await res.json())
}