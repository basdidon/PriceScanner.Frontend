import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scanner"
                options={{
                    tabBarStyle: { display: "none" },
                    title: "Scanner",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "barcode" : "barcode-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "cart" : "cart-outline"} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
