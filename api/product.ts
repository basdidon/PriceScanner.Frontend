import { QueryFunctionContext } from "@tanstack/react-query";

export type Product = {
    id: string;
    barcode: string;
    name: string;
    unitPrice: number;
};

export const fetchProduct = async ({
    queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Product> => {
    const [, productId] = queryKey;
    const res = await fetch(`http://192.168.1.18:5000/api/v1/products/${productId}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
};

export const fetchProductByBarcode = async (barcode: string): Promise<Product> => {
    const res = await fetch(`http://192.168.1.18:5000/api/v1/products/${barcode}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
};
