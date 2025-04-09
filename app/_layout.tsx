import { WaterCatalogProvider } from "@/hooks/contexts/useCatalogContext";
import { DiscountProvider } from "@/hooks/contexts/useDiscountContext";
import { Stack } from "expo-router";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";
import { appTheme } from "@/constants/appTheme";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={appTheme}>
                <DiscountProvider>
                    <WaterCatalogProvider>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        </Stack>
                    </WaterCatalogProvider>
                </DiscountProvider>
            </PaperProvider>
        </StoreProvider>
    );
}
