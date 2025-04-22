import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Searchbar, FAB } from "react-native-paper";
import { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscounts } from "@/api/discounts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setDiscounts } from "@/store/discountSlice";
import ScreenContainer from "@/components/ScreenContainer";

export default function Index() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ["getDiscounts"],
        queryFn: fetchDiscounts,
    });

    const discounts = useSelector((state: RootState) => state.discounts);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (data) {
            console.log("Dispatching setDiscounts with:", data);
            dispatch(setDiscounts(data));
        }
    }, [data]);

    return (
        <>
            <ScreenContainer style={{ padding: 8 }}>
                <FAB
                    icon="magnify"
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        borderRadius: 36,
                    }}
                    mode="flat"
                    size="medium"
                    onPress={() => console.log("Pressed")}
                />
                <ExpoStatusBar style={"auto"} />
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={() => console.log(searchQuery)}
                />
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
