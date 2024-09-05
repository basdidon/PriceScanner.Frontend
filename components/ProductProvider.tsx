import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    id: string;
    refreshOnFocus?: boolean;
}>;

type ProductQuery = {
    barcode: string;
    name: string;
    unitPrice: number;
};

type Product = {
    id: string;
    name: string;
    buyPrice: number;
    unitPrice: number;
    description?: string;
};

type ProductContextType = {
    data?: Product;
    isFetching?: boolean;
    refetch?: (
        options?: RefetchOptions
    ) => Promise<QueryObserverResult<Product | undefined, Error>>;
};

const baseUrl = "http://192.168.1.23:5000";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const getProduct = (id: string) => {
    try {
        console.log(`getProduct(${id})`);
        return fetch(baseUrl + `/api/products/${id}`)
            .then((res) => res.json())
            .then((jsonData) => {
                const product: Product = {
                    id: jsonData.barcode,
                    name: jsonData.name,
                    buyPrice: 0,
                    unitPrice: jsonData.price,
                    description: "",
                };
                return product;
            });
    } catch (err) {
        console.error("Fetch error:", err);
        return undefined;
    }
};

const ProductProvider = ({ id, refreshOnFocus = false, children }: Props) => {
    const { data, isFetching, refetch } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id),
    });

    const productContext = useMemo(
        () => ({ data, isFetching, refetch }),
        [data, isFetching, refetch]
    );

    if (refreshOnFocus) useRefreshOnFocus(refetch);

    return (
        <>
            <ProductContext.Provider value={productContext}>{children}</ProductContext.Provider>
        </>
    );
};

export default ProductProvider;
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("ProductContext must be within ProductProvider");
    return context;
};
