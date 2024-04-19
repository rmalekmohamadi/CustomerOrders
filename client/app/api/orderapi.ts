'use server';

import { API_BASE_URL } from "@/app/appconfig";
import OrderModel from "../types/ordermodel";
import { PDFDocument } from 'pdf-lib'
import moment from "moment";

export async function getOrderByIdApi(id: number) {
  return await fetch(API_BASE_URL + '/orders/read/' + id, { cache: 'no-store' }).then(async res => await res.json())
}

export async function orderFilterApi(query: string, page: number, perpage: number) {
  return await fetch(API_BASE_URL + '/orders/filter?s=' + query + '&page=' + page + '&perpage=' + perpage, { cache: 'no-store' }).then(async res => await res.json())
}

export async function orderCountApi(query: string) {
  return await fetch(API_BASE_URL + '/orders/count?s=' + query, { cache: 'no-store'}).then(async res => await res.json())
}

export async function addOrderApi(arg: OrderModel) {
    return fetch(API_BASE_URL + '/orders/add/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }

  export async function updateOrderApi(arg: OrderModel) {
    return fetch(API_BASE_URL + '/orders/update/' + arg.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }

  export async function deleteOrderApi(id: number) {
    return fetch(API_BASE_URL + '/orders/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    }).then(res => res.json())
  }

  export async function uploadOrderPDFTemplateApi(arg: FormData) {
    return await fetch(API_BASE_URL + '/orders/uploadpdftemplate/', {
      method: 'POST',
      body: arg
    })
    .then(res => res.json())
  }