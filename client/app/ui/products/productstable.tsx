// import { Table } from "flowbite-react";
import { API_BASE_URL } from "../../appconfig";

export default async function ProductsTable({
    query,
    currentPage,
    perPage
  }: {
    query: string;
    currentPage: number;
    perPage: number;
  }) {

    const url = API_BASE_URL + "/products/filter?s=" + query + "&page=" + currentPage + "&perpage=" + perPage;

    let items = [];
    let error = false;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if(data?.succeed)
        {
            items = data?.value
        }
      } catch (err) {
        error = true;
      }

     return <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
     <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400">
         <tr>
             <th className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Id</th>
             <th className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Product name</th>
             <th className="bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700">Price per unit</th>
         </tr>
     </thead>
     <tbody className="group/body divide-y">
        {items?.map((product) => 
            <tr key={product.id} data-testid="table-row-element" className="group/row hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800">
             <td className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                {product.id}
             </td>
             <td className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                {product.productname}
             </td>
             <td className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                {product.priceperunit}
             </td>
         </tr>
        )} 
     </tbody>
 </table>
}