import { WaterCatalogProvider } from "@/hooks/contexts/useCatalogContext";
import { Stack } from "expo-router";

export default function WaterCatalogLayout() {
    return (
        <WaterCatalogProvider>
            <Stack
                screenOptions={{
                    headerShown: false, // ⬅️ Hide header for all screens in this stack
                }}
            />
        </WaterCatalogProvider>
    );
}
