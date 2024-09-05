import ProductProvider from "@/components/ProductProvider";
import ProductScrollview from "@/components/ProductScrollview";
import { Slot, useLocalSearchParams } from "expo-router";

export default function ProductLayout() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <>
            <ProductProvider id={id}>
                <ProductScrollview id={id}>
                    <Slot />
                </ProductScrollview>
            </ProductProvider>
        </>
    );
}
