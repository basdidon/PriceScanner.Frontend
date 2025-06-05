import { AppDispatch, RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useState } from "react";
import { useColorScheme } from "react-native";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const ClearCartButton = () => {
    const colorScheme = useColorScheme();
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    return (
        <>
            <IconButton
                icon={"trash-can"}
                mode="contained"
                style={{ position: "absolute", bottom: 0, right: 0 }}
                onPress={() => showDialog()}
                //disabled={cart.length <= 0}
            />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>ล้างตะกร้า</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">คุณต้องการจะล้างตะกร้าใช่หรือไม่</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>ไม่</Button>
                        <Button
                            onPress={() => {
                                dispatch(clearCart());
                                hideDialog();
                            }}
                        >
                            ใช่
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default ClearCartButton;
