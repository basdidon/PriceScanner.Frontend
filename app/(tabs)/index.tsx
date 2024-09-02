import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks";
import { increment, decrement } from "@/features/counter/counterSlice";
import { IconCircleButton } from "@/components/IconCircleButton";
import { IconButton, MD2Colors as Colors } from "react-native-paper";

export default function Index() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
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
        </View>
    );
}
