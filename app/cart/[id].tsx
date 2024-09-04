import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProductCartScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <Text>{id}a</Text>;
};

export default ProductCartScreen;
