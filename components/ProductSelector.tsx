import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface StepperProps {
    value: number;
    onChanged: (newValue: number) => void;
    minValue?: number;
    maxValue?: number;
    buttonMode?: "outlined" | "contained" | "contained-tonal";
    buttonSize?: number;
    textVariant?: VariantProp<never>;
}

const Stepper = ({
    value,
    minValue,
    maxValue,
    onChanged,
    buttonMode = "outlined",
    buttonSize = 12,
    textVariant = "headlineSmall",
}: StepperProps) => {
    return (
        <View style={{ flexDirection: "row", gap: 4, justifyContent: "center" }}>
            <IconButton
                mode={buttonMode}
                size={buttonSize}
                icon={"minus"}
                disabled={minValue !== undefined && value <= minValue}
                onPress={() => onChanged(Math.max(value - 1, minValue ?? -Infinity))}
            />
            <Text style={{ textAlignVertical: "center" }} variant={textVariant}>
                {value}
            </Text>
            <IconButton
                mode={buttonMode}
                size={buttonSize}
                icon={"plus"}
                disabled={maxValue !== undefined && value >= maxValue}
                onPress={() => onChanged(Math.min(value + 1, maxValue ?? Infinity))}
            />
        </View>
    );
};

export default Stepper;
