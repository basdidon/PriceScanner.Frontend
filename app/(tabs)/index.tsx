import { Link } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks";
import { increment, decrement } from "@/features/counter/counterSlice";
import { IconButton, MD2Colors as Colors, Icon, MD2Colors } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "http://192.168.1.23:5000";

export default function Index() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const { isPending, data, isError } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => fetch(baseUrl).then((res) => res.text()),
    });

    const productQuery = useQuery({
        queryKey: ["product/"],
        queryFn: () => fetch(baseUrl + "/api/products/8857127442037").then((res) => res.json()),
    });

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <IconButton
                    icon={"minus"}
                    mode="contained"
                    containerColor={Colors.green300}
                    iconColor={Colors.white}
                    onPress={() => dispatch(decrement())}
                />
                <Text style={{ marginHorizontal: 8, fontSize: 32 }}>{count}</Text>
                <IconButton
                    icon={"plus"}
                    mode="contained"
                    containerColor={Colors.green300}
                    iconColor={Colors.white}
                    onPress={() => {
                        dispatch(increment());
                    }}
                />
            </View>
            <Link
                style={{ marginTop: 16 }}
                href={{
                    pathname: "/products/[id]",
                    params: { id: "8051164586194" },
                }}
            >
                View user details
            </Link>
            <View style={{ flexDirection: "row" }}>
                {isPending ? (
                    <ActivityIndicator animating={isPending} color={MD2Colors.red800} />
                ) : (
                    <Icon source={isError ? "error" : "check"} size={24} />
                )}
                <Text style={{ marginStart: 8 }}>http profile : {data ?? "loading"}</Text>
            </View>
            <Text>{productQuery.data.barcode}</Text>
            <Text>{productQuery.data.name}</Text>
            <Text>{productQuery.data.price}</Text>
        </View>
    );
}
