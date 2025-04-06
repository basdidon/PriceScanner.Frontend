import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <>
            <Redirect href={"/products/805116458194"} />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Edit app/index.tsx to edit this screen.</Text>
                <Link
                    href={{
                        pathname: "/products/[id]",
                        params: { id: "8051164586194" },
                    }}
                >
                    View user details
                </Link>
            </View>
        </>
    );
}
