import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ViewProps } from "react-native";
import { useAppTheme } from "@/constants/appTheme";

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
