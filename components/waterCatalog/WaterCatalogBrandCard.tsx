import React from "react";
import { Card } from "react-native-paper";
import WaterBrandCardListItem, { WaterBrandCardListItemProps } from "./WaterBrandCardListItem";

export interface WaterCatalogBrandCardProps {
    brand: string;
    items: WaterBrandCardListItemProps[];
}
const WaterCatalogBrandCard = ({ brand, items }: WaterCatalogBrandCardProps) => {
    return (
        <Card style={{ margin: 4 }}>
            <Card.Title
                title={brand}
                titleVariant="headlineSmall"
                titleStyle={{ fontWeight: "bold" }}
            />
            {items.map((x) => (
                <WaterBrandCardListItem key={x.id} {...x} />
            ))}
        </Card>
    );
};

export default WaterCatalogBrandCard;
