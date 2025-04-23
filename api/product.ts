import { baseUrl } from "@/constants/baseUrl";
import { QueryFunctionContext } from "@tanstack/react-query";

export type Product = {
    id: string;
    barcode: string;
    name: string;
    unitPrice: number;
    thumbnailUrl?: string;
};

export const fetchProductQueryFn = async ({
    queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Product> => {
    const [, productId] = queryKey;
    return fetchProduct(productId);
};

export const fetchProduct = async (identity: string): Promise<Product> => {
    const res = await fetch(`${baseUrl}/api/v1/products/${identity}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
};
