import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { Text } from "react-native";

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

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const getProduct = (id: string) => {
    const productUrl = process.env.EXPO_PUBLIC_API_URL + `/products/?barcode=${id}`;
    console.log(`fetched product: ${productUrl}`);

    try {
        console.log(`getProduct(${id})`);
        return fetch(productUrl)
            .then((res) => res.json())
            .then((jsonData) => {
                // /products/?barcode can return more than one product we take first
                const productJson = jsonData[0];

                const product: Product = {
                    id: productJson.barcode,
                    name: productJson.name,
                    buyPrice: 0,
                    unitPrice: productJson.unitPrice,
                    description: "",
                };
                console.log(product);
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
            {/*<Text>{process.env.EXPO_PUBLIC_API_URL + `/products/?barcode=${id}`}</Text>*/}
        </>
    );
};

export default ProductProvider;
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("ProductContext must be within ProductProvider");
    return context;
};
