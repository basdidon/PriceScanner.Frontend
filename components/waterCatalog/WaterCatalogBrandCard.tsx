import React from "react";
import { Card } from "react-native-paper";
import WaterBrandCardListItem from "./WaterBrandCardListItem";

export interface WaterCatalogBrandCardProps {
    brand: string;
    itemIds: string[];
}
const WaterCatalogBrandCard = ({ brand, itemIds }: WaterCatalogBrandCardProps) => {
    return (
        <Card style={{ margin: 4 }}>
            <Card.Title
                title={brand}
                titleVariant="headlineSmall"
                titleStyle={{ fontWeight: "bold" }}
            />
            {itemIds.map((x) => (
                <WaterBrandCardListItem key={x} id={x} />
            ))}
        </Card>
    );
};

export default WaterCatalogBrandCard;
