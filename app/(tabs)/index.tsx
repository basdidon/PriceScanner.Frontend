import { fetchDiscounts } from "@/api/discounts";
import ScreenContainer from "@/components/ScreenContainer";
import { AppDispatch, RootState } from "@/store";
import { setDiscounts } from "@/store/discountSlice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ["discounts"],
        queryFn: fetchDiscounts,
    });

    const discounts = useSelector((state: RootState) => state.discounts);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (data) {
            dispatch(setDiscounts(data));
        }
    }, [data]);

    return (
        <>
            <ScreenContainer style={{ padding: 8 }}>
                <ExpoStatusBar style={"auto"} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Button
                        mode="contained"
                        style={{ marginTop: 24 }}
                        onPress={() => {
                            router.push("/products/8051164586194");
                        }}
                    >
                        go 8051164586194
                    </Button>
                    <Button
                        mode="contained"
                        style={{ margin: 8 }}
                        onPress={() => {
                            router.push("/products/create");
                        }}
                    >
                        Create Product
                    </Button>
                    {discounts.map((x, id) => (
                        <Button
                            key={id}
                            mode="contained"
                            onPress={() =>
                                router.push({
                                    pathname: "/discounts/[id]",
                                    params: { id: x.id },
                                })
                            }
                        >
                            {x.name}:{x.id}
                        </Button>
                    ))}
                </View>
            </ScreenContainer>
        </>
    );
}
