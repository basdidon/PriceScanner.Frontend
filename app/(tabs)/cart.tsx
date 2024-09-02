import { Text, View, StatusBar } from "react-native";

export default function CartScreen() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: StatusBar.currentHeight, backgroundColor: "#f80" }}>
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                    ตะกร้าสินค้า
                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                    ดูเหมือนยังไม่มีสินค้าในตะกร้า
                </Text>
            </View>
        </View>
    );
}
