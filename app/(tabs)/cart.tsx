import { CartItem } from "@/features/cart/cartSlice";
import { Text, View, StatusBar, Image } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";

export default function CartScreen() {
    const cartItems: CartItem[] = [new CartItem("8857127442037", "น้ำดื่มฟอเรสต์ 350ม.ล.", 10, 2)];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: StatusBar.currentHeight, backgroundColor: "#f80" }}>
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                    ตะกร้าสินค้า
                </Text>
            </View>
            {cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                        ดูเหมือนยังไม่มีสินค้าในตะกร้า
                    </Text>
                </View>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <>
                            <Card>
                                <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                                <Card.Title
                                    title={item.name}
                                    subtitle={item.id}
                                    left={(props) => (
                                        <Image
                                            {...props}
                                            source={{ uri: "https://picsum.photos/700" }}
                                        />
                                    )}
                                    right={(props) => (
                                        <IconButton
                                            {...props}
                                            icon="dots-vertical"
                                            onPress={() => {}}
                                        />
                                    )}
                                />
                                <Card.Actions>
                                    <Button>Cancel</Button>
                                    <Button>Ok</Button>
                                </Card.Actions>
                            </Card>
                            <Text>
                                {item.name} ({item.quantity} * {item.unitPrice} ฿) :{" "}
                                {item.totalPrice}{" "}
                            </Text>
                        </>
                    ))}

                    <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                        มีสินค้าในตะกร้า {cartItems.length} ชิ้น ()
                    </Text>
                </>
            )}
            <Image source={{ uri: "https://picsum.photos/700" }} width={240} height={240} />
        </View>
    );
}
