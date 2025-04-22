import { Stack } from "expo-router";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";
import { appTheme } from "@/constants/appTheme";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={appTheme}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </PaperProvider>
            </QueryClientProvider>
        </StoreProvider>
    );
}
