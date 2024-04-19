import ProductModel from "./productmodel"

export default interface OrderModel {
    id: number;
    customername: string;
    address: string;
    date: string;
    items: ProductModel[];
}