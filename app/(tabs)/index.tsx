import { Link } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { IconButton, MD2Colors as Colors, MD2Colors, Button } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "../hooks";
import { increment, decrement } from "@/features/counter/counterSlice";
import { useQuery } from "@tanstack/react-query";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

const baseUrl = "http://192.168.1.23:5000";

export default function Index() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const { isLoading, isPending, data, refetch, isFetching, isError, isSuccess } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => fetch(baseUrl).then((res) => res.text()),
        //refetchInterval: 10000, // Refetch every 10 seconds
    });

    useRefreshOnFocus(refetch);

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
                style={{ marginTop: 16, fontSize: 24 }}
                href={{
                    pathname: "/products/[id]",
                    params: { id: "8857127442037" },
                }}
            >
                <Button>
                    <Text style={{ fontSize: 18 }}>Forest Drinking Water 350ml</Text>
                </Button>
            </Link>
            <View style={{ flexDirection: "row" }}>
                <ActivityIndicator animating={isLoading} color={MD2Colors.red800} />
                <Text>Loading</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <ActivityIndicator animating={isPending} color={MD2Colors.red800} />
                <Text>Pending</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <ActivityIndicator animating={isFetching} color={MD2Colors.red800} />
                <Text>Fetching</Text>
            </View>
            <Text>{isError ? "error" : "not error"}</Text>
            <Text>{isSuccess ? "success" : "not success"}</Text>
            <Text style={{ marginStart: 8 }}>http profile : {data ?? "loading"}</Text>
            <Button onPress={() => refetch()}> Refresh</Button>
        </View>
    );
}
