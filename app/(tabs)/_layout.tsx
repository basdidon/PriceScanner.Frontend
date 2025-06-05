import ClearCartButton from "@/components/ClearCartButton";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/store";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    tabBarShowLabel: true,
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                        ),
                    }}
                />
                {/*
                <Tabs.Screen
                    name="drinkingCatalog"
                    options={{
                        title: "drinking",
                        //href: "/drinkingCatalog",
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon name={focused ? "water" : "water-outline"} color={color} />
                        ),
                    }}
                />*/}
                <Tabs.Screen
                    name="scanner"
                    options={{
                        tabBarStyle: { display: "none" },
                        title: "barcode",
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon
                                name={focused ? "barcode" : "barcode-outline"}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: "ตะกร้าสินค้า",
                        tabBarStyle: { display: "none" }, // hide tabbar whenever focused
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon name={focused ? "cart" : "cart-outline"} color={color} />
                        ),
                        headerRight: () => <ClearCartButton />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "settings",
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon
                                name={focused ? "settings" : "settings-outline"}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
