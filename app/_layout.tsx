import { CartProvider } from "@/hooks/useCartContext";
import { Stack } from "expo-router";

import { MD3LightTheme, PaperProvider, useTheme } from "react-native-paper";

export const appTheme = {
    ...MD3LightTheme, // or MD3DarkTheme
    // Specify custom property
    myOwnProperty: true,
    roundness: 2,
    // Specify custom property in nested object
    colors: {
        ...MD3LightTheme.colors,
        success: "#008000",
        inverseSuccess: "#5BC236",
        onSuccess: "#FFF",
        /*
        primary: "#1AA7EC",
        //onPrimary: "white",  // text on btn
        onSurface: "white", // text
        surfaceVariant: "#89bffb", //"#797EF6",
        onSurfaceVariant: "white", // IconButton:iconColor except contained mode
        elevation: {
            level0: "#89bffb",
            level1: "#89bffb", // [card:BG]
            level2: "#89bffb",
            level3: "#89bffb", // [search bar:BG]
            level4: "#89bffb",
            level5: "#89bffb",
        },
        background: "#d6d2f8",*/
    },
};

export type AppTheme = typeof appTheme;
export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
    return (
        <PaperProvider theme={appTheme}>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </CartProvider>
        </PaperProvider>
    );
}
