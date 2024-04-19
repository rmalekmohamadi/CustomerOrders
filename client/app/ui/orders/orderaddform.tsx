'use client';

import OrderModel from "@/app/types/ordermodel";
import ProductModel from "@/app/types/productmodel";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { useFormState } from "react-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderFormValueModel from "@/app/types/orderformvaluemodel";
import { addOrder } from "@/app/libs/actions";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export default function AddOrderForm({
    products,
  }: {
    products: ProductModel[];
  }) {
    const router = useRouter()

    const {
        register,
        formState: { errors, isLoading },
        handleSubmit,
        control
    } = useForm<OrderFormValueModel>();

    const formAction = handleSubmit(async ({ id, customername, address, date, items }) => {
        let productItems: ProductModel[] = [];
        for(var i = 0; i < items.length; i++)
        {
            const product = products.find(p => p.id === parseInt(items[i]))
            if(product != null)
            {
                product.quantity = 1;
                productItems.push(product)
            }
        }

        const newOrder: OrderModel = { id: 0, customername: customername, address: address, date: date, items: productItems };
        const res = await addOrder(newOrder);
        
        if(res != null && res.succeed)
            {
            toast.success('Order added successfully'); 
            router.push("/orders")
        }
        else{
            toast.success('Failed to add order'); 
        }
    });

    return <form onSubmit={formAction}>
    <div>
        <div className="max-w-md">
            <div className="mt-4 mb-2 block">
                <Label htmlFor="customerName" color={errors.customername ? "failure" : "gray"} value="Customer Name" />
            </div>
            <TextInput id="customerName" color={errors.customername ? "failure" : "gray"}
                helperText={errors.customername && (
                    <span className="font-medium">{errors.customername.message}</span>
                )}
                {...register("customername", {
                    required: { value: true, message: "Customer Name is required" },
                    minLength: {
                        value: 3,
                        message: "Customer Name cannot be less than 3 character",
                    },
                })}
            />
        </div>

        <div className="max-w-md">
            <div className="mt-4 mb-2 block">
                <Label htmlFor="address" color={errors.address ? "failure" : "gray"} value="Address" />
            </div>
            <TextInput id="address" color={errors.address ? "failure" : "gray"}
                helperText={errors.address && (
                    <span className="font-medium">{errors.address.message}</span>
                )}
                {...register("address", {
                    required: { value: true, message: "Address is required" },
                    minLength: {
                        value: 3,
                        message: "Address cannot be less than 3 character",
                    },
                })}
            />
        </div>

        <div className="max-w-md">
            <div className="mt-4 mb-2 block">
                <Label htmlFor="date" color={errors.date ? "failure" : "gray"} value="Order Date" />
            </div>
            <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ReactDatePicker
                        className={"block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg" + (errors.date ? " border-red-300 bg-red-50 text-red-900 border-gray-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-50 dark:text-red dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500" : "")}
                        onChange={onChange}
                        onBlur={onBlur}
                        // selected={value}
                    />
                )}
            />
        </div>

        <div className="max-w-md">
            <div className="mb-2 block mt-4">
                <Label htmlFor="items" value="Select order product" color={errors.items ? "failure" : "gray"} />
            </div>
            <Select id="items" multiple color={errors.items ? "failure" : "gray"}
                helperText={errors.items && (
                    <span className="font-medium">{errors.items.message}</span>
                )}
                {...register("items", {
                    required: { value: true, message: "Product items is required" }
                })}
            >
                {products?.map((product) =>
                    <option key={product.id} id={product.id.toString()} value={product.id}>{product.productname}</option>
                )}
            </Select>
        </div>
    </div>

    <div className="row mt-4">
        <Button type="submit" color="gray">Add Order</Button>
    </div>
</form>
  }


