import { fetchDiscountById } from "@/api/discounts";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const DiscountPage = () => {
    const theme = useTheme();

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getProduct", id.toString()], // 123 is dynamic
        queryFn: fetchDiscountById,
    });

    return (
        <View style={{ flex: 1 }}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
                headerImage={
                    <Image
                        source={require("@/assets/images/partial-react-logo.png")}
                        style={styles.reactLogo}
                    />
                }
            >
                <Text>{data?.name}</Text>
                <Text>ID:{id}</Text>
            </ParallaxScrollView>
            <Button
                style={{ marginHorizontal: 8, marginVertical: 12 }}
                mode="contained"
                icon={"less-than"}
                onPress={router.back}
            >
                Go back
            </Button>
        </View>
    );
};

export default DiscountPage;

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
