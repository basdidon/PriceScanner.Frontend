import React from "react";
import { View } from "react-native";
import { Button, Text, Avatar, Card, Divider, IconButton } from "react-native-paper";
import { useAppTheme } from "@/constants/appTheme";
import ScreenContainer from "@/components/ScreenContainer";

const settingsPage = () => {
    const theme = useAppTheme();
    return (
        <ScreenContainer>
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
        </ScreenContainer>
    );
};

export default settingsPage;
