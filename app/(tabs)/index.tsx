import { View, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import {
    Text,
    Avatar,
    Button,
    Card,
    IconButton,
    Searchbar,
    useTheme,
    Divider,
    FAB,
    ActivityIndicator,
} from "react-native-paper";
import { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
};

export default function Index() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ["post"],
        queryFn: fetchData,
    });

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <>
            <View
                style={{
                    flex: 1,
                    padding: 8,
                    gap: 8,
                    backgroundColor: theme.colors.background,
                    paddingTop: StatusBar.currentHeight,
                }}
            >
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
                <Card>
                    <Card.Title
                        title="Card Title"
                        subtitle="Card Subtitle"
                        left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        right={(props) => (
                            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
                        )}
                    />
                    <Card.Content>
                        <Text>card content</Text>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title title="Buttons" titleVariant="headlineMedium" />
                    <Card.Content>
                        <Divider style={{ marginBottom: 8 }} />
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                            <Button onPress={() => {}}>default</Button>
                            <Button mode="outlined" onPress={() => {}}>
                                outlined
                            </Button>
                            <Button mode="contained" onPress={() => {}}>
                                contained
                            </Button>
                            <Button mode="contained-tonal" onPress={() => {}}>
                                contained-tonal
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title title="Icon Buttons" titleVariant="headlineMedium" />
                    <Card.Content>
                        <Divider style={{ marginBottom: 8 }} />
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                            <IconButton icon={"star"} onPress={() => {}} />
                            <IconButton icon={"star"} mode="outlined" onPress={() => {}} />
                            <IconButton icon={"star"} mode="contained" onPress={() => {}} />
                            <IconButton icon={"star"} mode="contained-tonal" onPress={() => {}} />
                        </View>
                    </Card.Content>
                </Card>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
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
                    <Text style={{ padding: 20 }}>{data.title}</Text>
                </View>
            </View>
        </>
    );
}
