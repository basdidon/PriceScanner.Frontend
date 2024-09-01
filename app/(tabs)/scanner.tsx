import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions, StatusBar } from "react-native";
import { CameraView, Camera, BarcodeScanningResult } from "expo-camera";
import Svg, { Defs, ClipPath, G, Rect } from "react-native-svg";

// We can use this to make the overlay fill the entire width
var { width, height } = Dimensions.get("screen");
var boxWidth: number = 300;
var boxHeight: number = 150;

export default function CameraScannerComponent() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
                style={{ flex: 1 }}
            />
            {scanned && (
                <Button
                    title={"Tap to Scan Again"}
                    color={"#f00"}
                    onPress={() => setScanned(false)}
                />
            )}
            <Text
                style={{
                    position: "absolute",
                    top: height / 2 + boxHeight / 2,
                    width: width,
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                    zIndex: 5,
                }}
            >
                นำบาร์โค้ดมาแสกนที่นี่
            </Text>
            <Svg style={{ position: "absolute" }}>
                <Defs>
                    <ClipPath id="clip">
                        <G scale="1">
                            <Rect width={width} height={height} />
                            <Rect
                                x={width / 2 - boxWidth / 2}
                                y={height / 2 - boxHeight / 2}
                                rx={24}
                                ry={24}
                                width={boxWidth}
                                height={boxHeight}
                            />
                        </G>
                    </ClipPath>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    height={height}
                    width={width}
                    //fill="url(#grad)"
                    fill={"#000D"}
                    clipPath="url(#clip)"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        zIndex: 5,
        justifyContent: "center",
        backgroundColor: "white", // White background for the entire screen
    },
});
