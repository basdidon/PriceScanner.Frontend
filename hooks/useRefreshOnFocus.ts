import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
    const firstTimeRef = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
            console.log("Screen has gained focus");
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            refetch();
        }, [refetch])
    );
}
