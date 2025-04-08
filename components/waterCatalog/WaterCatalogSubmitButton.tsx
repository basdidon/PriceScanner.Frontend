import { AppTheme } from "@/app/_layout";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";

interface WaterCatalogSubmitButtonProps {
    totalQuantity: number;
    totalPrice: number;
    onSubmit: () => void;
}

const WaterCatalogSubmitButton = ({
    totalQuantity,
    totalPrice,
    onSubmit,
}: WaterCatalogSubmitButtonProps) => {
    const theme = useTheme<AppTheme>();

    return (
        <>
            <TouchableHighlight
                underlayColor={theme.colors.inverseSuccess}
                style={[styles.btn, { backgroundColor: theme.colors.success }]}
                onPress={onSubmit}
                disabled={totalQuantity <= 0}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {totalQuantity > 0 ? (
                        <Badge
                            style={{
                                backgroundColor: theme.colors.onSuccess,

                                alignItems: "center",
                                marginEnd: 8,
                                borderRadius: 6,
                                color: theme.colors.success,
                            }}
                        >
                            {totalQuantity}
                        </Badge>
                    ) : (
                        <></>
                    )}
                    <Text style={[styles.onBtn, { color: theme.colors.onSuccess }]}>ยืนยัน</Text>
                    <Text
                        style={[
                            styles.onBtn,
                            { color: theme.colors.onSuccess, marginStart: "auto" },
                        ]}
                    >
                        ฿{totalPrice}
                    </Text>
                </View>
            </TouchableHighlight>
        </>
    );
};
export default WaterCatalogSubmitButton;

const styles = StyleSheet.create({
    btn: {
        margin: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
