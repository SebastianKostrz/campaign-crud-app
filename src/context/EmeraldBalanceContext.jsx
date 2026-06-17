import { createContext, useContext, useEffect, useState } from "react";

const EmeraldBalanceContext = createContext(null);

export function EmeraldBalanceProvider({ children }) {
    const [emeraldBalance, setEmeraldBalance] = useState(() => {
        const storedBalance = localStorage.getItem("emeraldBalance");

        return storedBalance !== null ? Number(storedBalance) : 10000;
    });

    useEffect(() => {
        localStorage.setItem("emeraldBalance", emeraldBalance.toString());
    }, [emeraldBalance]);

    const addEmeraldBalance = (amountToAdd) => {
        setEmeraldBalance(prev => prev + Number(amountToAdd));
    };

    const subtractEmeraldBalance = (amountToSubtract) => {
        setEmeraldBalance(prev => {
            const newBalance = prev - Number(amountToSubtract);

            return Math.max(newBalance, 0);
        });
    };

    const parseEmeraldToString = () => {
        return Number(emeraldBalance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const value = {
        emeraldBalance,
        subtractEmeraldBalance,
        addEmeraldBalance,
        parseEmeraldToString,
    };

    return (
        <EmeraldBalanceContext.Provider value={value}>
            {children}
        </EmeraldBalanceContext.Provider>
    );
}

export function useEmeraldBalance() {
    return useContext(EmeraldBalanceContext);
}