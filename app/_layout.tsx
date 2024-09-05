import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NumberProvider from "@/components/NumberProvider";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <NumberProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </NumberProvider>
            </QueryClientProvider>
        </Provider>
    );
}
