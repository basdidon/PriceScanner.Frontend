import { Stack } from "expo-router";

import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
        primary: "#1AA7EC",
        onPrimary: "white",
        surfaceVariant: "#4ADEDE", //"#797EF6",
        onSurfaceVariant: "white", // IconButton:iconColor except contained mode
        elevation: {
            level0: "white",
            level1: "white",
            level2: "white",
            level3: "white",
            level4: "white",
            level5: "white",
        },
    },
};
export default function RootLayout() {
    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </PaperProvider>
    );
}
