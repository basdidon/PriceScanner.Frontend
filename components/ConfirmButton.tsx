import { useAppTheme } from "@/constants/appTheme";
import { ReactNode } from "react";
import { TouchableHighlight, View } from "react-native";
import { Text, StyleSheet } from "react-native";

type ConfirmButtonProps = {
    left?: ReactNode;
    right?: ReactNode;
    disabled?: boolean;
    onPress: () => void;
};

const ConfirmButton = ({ left, right, disabled, onPress }: ConfirmButtonProps) => {
    const theme = useAppTheme();
    return (
        <TouchableHighlight
            underlayColor={theme.colors.inverseSuccess}
            style={[styles.btn, { backgroundColor: theme.colors.success }]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {left}
                <Text style={[styles.onBtn, { flex: 1, color: theme.colors.onSuccess }]}>
                    ยืนยัน
                </Text>
                {right}
            </View>
        </TouchableHighlight>
    );
};

export default ConfirmButton;

const styles = StyleSheet.create({
    headerText: { padding: 8, textAlign: "center", fontWeight: "bold" },
    emptyCartText: { textAlign: "center", color: "#999" },

    fab: {
        position: "absolute",
        margin: 8,
        right: 0,
        bottom: 0,
        borderRadius: 36,
    },
    btn: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
