import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "react-native-paper";

export interface IconCircleButtonProps {
    size: number;
    color?: string;
    iconSize?: number;
    iconColor?: string;
    source?: any;
    onPress: () => void;
}

export const IconCircleButton: React.FC<IconCircleButtonProps> = ({
    size,
    color = "blue",
    iconSize = size,
    iconColor = "white",
    source = "-",
    onPress,
}) => {
    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: color,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
            onPress={onPress}
        >
            <Icon source={source} size={iconSize} color={iconColor} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
    } as ViewStyle,
});

export default IconCircleButton;
