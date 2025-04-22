import { CatalogProvider } from "@/hooks/contexts/useCatalogContext";
import { Stack } from "expo-router";

export default function WaterCatalogLayout() {
    return (
        <CatalogProvider>
            <Stack
                screenOptions={{
                    headerShown: false, // ⬅️ Hide header for all screens in this stack
                }}
            />
        </CatalogProvider>
    );
}
