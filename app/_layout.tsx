import { appTheme } from "@/constants/appTheme";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={appTheme}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen
                            name="products/create"
                            options={{ title: "เพิ่มสินค้าใหม่", headerShown: true }}
                        />
                    </Stack>
                </PaperProvider>
            </QueryClientProvider>
        </StoreProvider>
    );
}
