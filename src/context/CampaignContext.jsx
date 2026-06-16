import {createContext, useContext, useEffect, useState} from "react";

const EmeraldBalanceContext = createContext(null);

export function EmeraldBalanceProvider({ children }) {
    const [emeraldBalance, setEmeraldBalance] = useState(10000);

    useEffect(() => {
        const storedBalance = localStorage.getItem("emeraldBalance");
        if(storedBalance){
            setEmeraldBalance(Number(storedBalance));
        }
    },[])

    const setNewBalance = ()=>{
        localStorage.setItem("emeraldBalance",emeraldBalance.toString());
    }



    const addEmeraldBalance = (amountToAdd)=>{
        setEmeraldBalance(prev=>prev+amountToAdd);
        setNewBalance()
    }

    const subtractEmeraldBalance = (amountToSubtract) => {
        setEmeraldBalance(prev=>prev-amountToSubtract);
        setNewBalance()
    }

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
        parseEmeraldToString
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