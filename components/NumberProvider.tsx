import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type that includes both the number and the updater function
interface NumberContextType {
    number: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with an undefined initial value
const NumberContext = createContext<NumberContextType | undefined>(undefined);

// Create the provider component
interface NumberProviderProps {
    children: ReactNode;
}

const NumberProvider = ({ children }: NumberProviderProps) => {
    const [number, setNumber] = useState(42); // Initial value of number

    return (
        <NumberContext.Provider value={{ number, setNumber }}>{children}</NumberContext.Provider>
    );
};

// Custom hook to use the number context safely
export const useNumberContext = (): NumberContextType => {
    const context = useContext(NumberContext);
    if (context === undefined) {
        throw new Error("useNumberContext must be used within a NumberProvider");
    }
    return context;
};

export default NumberProvider;
