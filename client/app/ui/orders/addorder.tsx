"use client";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import React, { FormEvent } from 'react'
import { API_BASE_URL } from "../../appconfig";
import { HiOutlineTag, HiInformationCircle } from "react-icons/hi";
import PageTitle from "@/app/ui/pagetitle";
import { Spinner } from "@/app/ui/spinner"
import { AppAlert } from "@/app/ui/appalert"
import useSwr from 'swr'
import {
    Alert, Breadcrumb, Datepicker, Button, Checkbox,
    FileInput, Label, Radio, RangeSlider, Select,
    Textarea, TextInput, ToggleSwitch
} from "flowbite-react";
import OrderModel from "@/app/types/ordermodel";
import ProductModel from "@/app/types/productmodel";



interface AddOrderFormValues {
    id: number;
    customername: string;
    address: string;
    date: string;
    items: ProductModel[];
}

// const productsFetcher = url:string => fetch(url).then(res => res.json())
//const addOrderFetcher = (url, data) => fetch(url, { methode: "post", body: JSON.stringify(data)}).then(res => res.json())
export default function AddOrder({products}:{products:any}) {
    const [isLoading, setIsloading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [order, setOrder] = useState<OrderModel>();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<AddOrderFormValues>();

    const onSubmit = handleSubmit(({ id, customername, address, date, items }) => {
        console.log(date)
        console.log(items)
        // You should handle login logic with username, password and remember form data
        setOrder({ id: id, customername: customername, address: address, date: date, items: items });
    });

    return (
            <Spinner isLoading={isLoading}>
                <AppAlert condition={hasError} color="failure" icon={HiInformationCircle} className="mt-4">
                    <form onSubmit={onSubmit}>
                        <div>

                            <div className="max-w-md">
                                <div className="mt-4 mb-2 block">
                                    <Label htmlFor="customername" color={errors.customername ? "failure" : "gray"} value="Customer Name" />
                                </div>
                                <TextInput id="customername" color={errors.customername ? "failure" : "gray"}
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

                            {/*<div>*/}
                            {/*    <div className="mb-2 block">*/}
                            {/*        <Label htmlFor="date" color={errors.date ? "failure" : "gray"} value="Gray" />*/}
                            {/*    </div>*/}
                            {/*    <Datepicker*/}
                            {/*        onSelectedDateChanged={handleDatePickerChange}*/}
                            {/*        color={errors.date ? "failure" : "gray"}*/}
                            {/*        helperText={errors.date && (*/}
                            {/*            <span className="font-medium">{errors.date.message}</span>*/}
                            {/*        )}*/}
                            {/*        {...register("date", {*/}
                            {/*            required: { value: true, message: "Date is required" },*/}
                            {/*        })}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*<Controller*/}
                            {/*    control={control}*/}
                            {/*    name="date"*/}
                            {/*    render={({*/}
                            {/*        field: { onChange, onBlur, value, name, ref },*/}
                            {/*        fieldState: { invalid, isTouched, isDirty, error },*/}
                            {/*        formState,*/}
                            {/*    }) => (*/}
                            {/*        <Datepicker*/}
                            {/*            onChange={onChange}*/}
                            {/*            onBlur={onBlur}*/}
                            {/*            selected={value}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*/>*/}

                            <div className="max-w-md">
                                <div className="mt-4 mb-2 block">
                                    <Label htmlFor="date" color={errors.date ? "failure" : "gray"} value="Order Date" />
                                </div>
                                <Controller
                                    control={control}
                                    name="date"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <ReactDatePicker
                                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            // selected={value}
                                        //helperText={errors.date && (
                                        //    <span className="font-medium">{errors.date.message}</span>
                                        //)}
                                        //{...register("date", {
                                        //    required: { value: true, message: "Date is required" },
                                        //})}
                                        />
                                    )}
                                />
                            </div>

                            <div className="max-w-md">
                                <div className="mb-2 block mt-4">
                                    <Label htmlFor="products" value="Select order product" />
                                </div>
                                <Select id="products" required multiple>
                                    {products?.value?.map((product:ProductModel) =>
                                        <option key={product.id} id={product.id.toString()}>{product.productname}</option>
                                    )}
                                </Select>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <Button type="submit" color="gray">Create</Button>
                        </div>
                    </form>
                </AppAlert>
            </Spinner>
    )
}