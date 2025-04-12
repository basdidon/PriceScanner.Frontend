import React from "react";
import { Card } from "react-native-paper";
import WaterBrandCardListItem from "./WaterBrandCardListItem";
import { DrinkingCatalogBrand } from "@/hooks/contexts/useCatalogContext";

const WaterCatalogBrandCard = ({ name, items }: DrinkingCatalogBrand) => {
    return (
        <Card style={{ margin: 4 }}>
            <Card.Title
                title={name}
                titleVariant="headlineSmall"
                titleStyle={{ fontWeight: "bold" }}
            />
            {items.map((x, idx) => (
                <WaterBrandCardListItem key={idx} {...x} />
            ))}
        </Card>
    );
};

export default WaterCatalogBrandCard;
