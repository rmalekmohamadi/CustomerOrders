"use client";

import React ,{useEffect, useState} from "react"
import { API_BASE_URL } from "../../appconfig";
import Link from 'next/link'
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import OrderModel from "@/app/types/ordermodel"
import DeleteModal from "./deletemodal"
import { Spinner } from "@/app/ui/spinner"
import { toast } from 'react-hot-toast';
import moment from "moment";
import { deleteOrderApi, getOrderByIdApi } from "@/app/api/orderapi";
import { useRouter } from 'next/navigation'
import { FaFilePdf } from "react-icons/fa";
import { getDefaultPDFTemplateApi } from "@/app/api/pdftemplateapi";
import { generate } from "@pdfme/generator";
import { getPlugins } from "@/app/pdf/designer/helper";
import ProductModel from "@/app/types/productmodel";

export const dynamic = 'force-dynamic'

export default function OrdersTable({
    orders
  }: {
    orders: OrderModel[];
  }) {
    const router = useRouter()
    const[deleteProccess, setDeleteProccess] = useState(false);
    const[downloadPdfFileProccess, setDownloadPdfFileProccess] = useState(false);

    async function onDeleteOrderHandler(orderid:number)
    {
      setDeleteProccess(true)
      // const deleteUrl = API_BASE_URL + "/orders/delete/";
      const res = await deleteOrderApi(orderid)
      setDeleteProccess(false)
        if(res != null && res.succeed)
          {
          toast.success('Order deleted successfully'); 
          router.refresh()
      }
      else{
          toast.success('Failed to delete order'); 
      }
      // await mutateList(); 
    }

    async function downloadPdfFileHandler(orderid:number)
    {
      setDownloadPdfFileProccess(true)
      const orderResult = await getOrderByIdApi(orderid)
      if(orderResult == null || orderResult.value == null || !orderResult.succeed) return orderResult;

      const order: OrderModel = orderResult.value;
      // const totalPrice = order?.items?.reduce((accumulator:number, currentValue:ProductModel) => accumulator + currentValue.priceperunit, 0);

      const defaultTemplate = await getDefaultPDFTemplateApi();
      const template = defaultTemplate.value.schema;
      (async () => {
        const plugins = getPlugins();
        const products = JSON.stringify(order.items.map((p) => {return [p.id.toString(), p.productname, p.priceperunit.toString(), p.quantity.toString()]}));
       
        const inputs = 
        [
            {
            "orderid": order.id.toString(),
            "date": moment(order.date).format('YYYY/MM/DD'),
            "customername": order.customername,
            "address": order.address,
            "products": products
            }
        ];

        const pdf = await generate({template , plugins, inputs });
      
        // Node.js
        // fs.writeFileSync(path.join(__dirname, 'test.pdf'), pdf);
      
        // Browser
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
      })();
      setDownloadPdfFileProccess(false)
    }

    // const { data: ordersData , mutate: mutateList, isLoading, error } = useSWR(orderFilterApi)

     return  <Spinner isLoading={deleteProccess}>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                  <th key="id" className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Id</th>
                  <th key="customername" className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Customer name</th>
                  <th key="date" className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Date</th>
                  <th key="actions" className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Actions</th>
              </tr>
          </thead>
          <tbody className="group/body divide-y">
              {orders?.map((order) => 
                <tr key={"order"+order.id} data-testid="table-row-element" className="group/row hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td key={"id"+order.id} className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                      {order.id}
                  </td>
                  <td key={"customername"+order.id} className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                      {order.customername}
                  </td>
                  <td key={"date"+order.id} className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                      {moment(order.date).format('YYYY/MM/DD')}
                  </td>
                  <td key={"actions"+order.id}>
                    <div className='flex justify-start'>
                      <Link href="" onClick={(e) => downloadPdfFileHandler(order.id)}  className='p-2 my-2 ml-0 mr-2 rounded text-stone-500 bg-stone-200 hover:text-stone-700 hover:bg-stone-300'><FaFilePdf /></Link>
                      <Link href={"/orders/view/" + order.id} className='p-2 my-2 ml-0 mr-2 rounded text-stone-500 bg-stone-200 hover:text-stone-700 hover:bg-stone-300'><FaEye /></Link>
                      <Link href={"/orders/edit/" + order.id} className='p-2 my-2 ml-0 mr-2 rounded text-stone-500 bg-stone-200 hover:text-stone-700 hover:bg-stone-300'><FaEdit /></Link>
                      <DeleteModal onDeleteOrder={onDeleteOrderHandler} orderid={order.id} />
                    </div>
                  </td>
              </tr>
              )} 
          </tbody>
        </table>
     </Spinner>
}