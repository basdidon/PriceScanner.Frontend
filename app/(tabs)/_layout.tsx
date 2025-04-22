import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    tabBarShowLabel: true,
                    headerShown: false,
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
                <Tabs.Screen
                    name="drinkingCatalog"
                    options={{
                        title: "drinking",
                        //href: "/drinkingCatalog",
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon name={focused ? "water" : "water-outline"} color={color} />
                        ),
                    }}
                />
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
                        title: "Cart",
                        tabBarStyle: { display: "none" }, // hide tabbar whenever focused
                        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                            <TabBarIcon name={focused ? "cart" : "cart-outline"} color={color} />
                        ),
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
