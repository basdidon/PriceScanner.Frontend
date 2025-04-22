import { useAppTheme } from "@/constants/appTheme";
import { ReactNode } from "react";
import { ColorValue, TouchableHighlight, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type ConfirmButtonProps = {
    text: string;
    textAlign?: "left" | "right" | "auto" | "center" | "justify";
    left?: (btnColor: ColorValue, onBtnColor: ColorValue) => ReactNode;
    right?: (btnColor: ColorValue, onBtnColor: ColorValue) => ReactNode;
    disabled?: boolean;
    onPress: () => void;
};

const ConfirmButton = ({ text, textAlign, left, right, disabled, onPress }: ConfirmButtonProps) => {
    const { colors } = useAppTheme();

    return (
        <TouchableHighlight
            underlayColor={colors.inverseSuccess}
            style={[styles.btn, { backgroundColor: colors.success }]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={styles.contentContainer}>
                {left && left(colors.success, colors.onSuccess)}
                <Text
                    variant="titleMedium"
                    style={[
                        styles.onBtn,
                        { color: colors.onSuccess, textAlign: textAlign, flex: 1 },
                    ]}
                >
                    {text}
                </Text>
                {right && right(colors.success, colors.onSuccess)}
            </View>
        </TouchableHighlight>
    );
};

export default ConfirmButton;

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    onBtn: {
        fontWeight: "bold",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        width: "auto",
    },
});
