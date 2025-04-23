import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Searchbar, FAB, Avatar } from "react-native-paper";
import { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscounts } from "@/api/discounts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setDiscounts } from "@/store/discountSlice";
import ScreenContainer from "@/components/ScreenContainer";
import { baseUrl } from "@/constants/baseUrl";

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
                            {x.name}
                        </Button>
                    ))}
                </View>
            </ScreenContainer>
        </>
    );
}
