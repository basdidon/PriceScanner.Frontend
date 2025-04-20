import { fetchDiscountById } from "@/api/discounts";
import { fetchProduct } from "@/api/product";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Stepper from "@/components/ProductSelector";
import { RootState } from "@/store";
import { setDiscount } from "@/store/discountSlice";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Card, IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const DiscountProductCard = ({ id }: { id: string }) => {
    const { data } = useQuery({ queryKey: ["getProductById", id], queryFn: fetchProduct });
    const cart = useSelector((state: RootState) => state.cart);

    const cartItem = cart.find((x) => x.id === id);
    const [qauntity, setQuantity] = useState(cartItem?.quantity ?? 0);

    return (
        <>
            <Card>
                <Card.Title
                    title={data?.name}
                    titleNumberOfLines={2}
                    right={() => (
                        <Stepper
                            value={qauntity}
                            onChanged={(newValue) => setQuantity(newValue)}
                            minValue={0}
                        />
                    )}
                />
            </Card>
        </>
    );
};

const DiscountPage = () => {
    const theme = useTheme();

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getDiscountById", id.toString()], // 123 is dynamic
        queryFn: fetchDiscountById,
    });

    useEffect(() => {
        if (data) dispatch(setDiscount(data));
    }, [data]);

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
                <Text variant="headlineLarge">{data?.name}</Text>
                <Text>ID: {id}</Text>
                <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, labore esse,
                    fuga deleniti reiciendis velit fugiat inventore odio ab, eos reprehenderit?
                    Nostrum voluptas ut sequi minima ipsum voluptates adipisci provident.
                </Text>
                <View style={{ gap: 8 }}>
                    {data?.discountConditions
                        .flatMap((x) => x.productIds)
                        .map((x, idx) => (
                            <DiscountProductCard key={idx} id={x} />
                        ))}
                </View>
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
