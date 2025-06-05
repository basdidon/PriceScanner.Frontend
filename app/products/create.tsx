import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
const CreateProductScreen = () => {
    const [priceInput, setPriceInput] = useState("");
    const [priceValue, setPriceValue] = useState(0);

    const handleChange = (text: string) => {
        // Allow only digits and one dot
        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(text)) {
            //setPriceInput(text);

            const parsed = parseFloat(text);
            if (!isNaN(parsed)) {
                setPriceValue(parsed);
            }
        }
    };
    return (
        <>
            <View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="default"
                    textAlign="right"
                    value={priceInput}
                    onChangeText={handleChange}
                    editable={false}
                />
            </View>
        </>
    );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 8,
        marginVertical: 2,
    },
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
