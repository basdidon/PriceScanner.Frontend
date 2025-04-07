import { CartProvider } from "@/hooks/useCartContext";
import { Stack } from "expo-router";

import { MD3LightTheme, PaperProvider } from "react-native-paper";

const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    // Specify custom property
    myOwnProperty: true,
    roundness: 2,
    // Specify custom property in nested object
    colors: {
        ...MD3LightTheme.colors,
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
export default function RootLayout() {
    return (
        <PaperProvider theme={theme}>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </CartProvider>
        </PaperProvider>
    );
}
