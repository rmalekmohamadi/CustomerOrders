"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OrderModel from "../types/ordermodel";
import { addOrderApi, updateOrderApi } from "../api/orderapi";
import { toast } from 'react-hot-toast';

export async function addOrder(order: OrderModel) {
  return await addOrderApi(order)
}

export async function updateOrder(id: number, order: OrderModel) {
  return await updateOrderApi(order)
}