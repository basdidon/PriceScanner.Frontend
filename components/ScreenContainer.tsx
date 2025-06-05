import { useAppTheme } from "@/constants/appTheme";
import { ReactNode } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = ViewProps & { children: ReactNode };

const ScreenContainer = ({ children, ...rest }: ScreenContainerProps) => {
    const theme = useAppTheme();

    return (
        <SafeAreaView
            {...rest}
            style={[styles.container, { backgroundColor: theme.colors.background }, rest.style]}
        >
            {children}
        </SafeAreaView>
    );
};

export default ScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
