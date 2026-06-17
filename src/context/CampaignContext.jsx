import { createContext, useContext, useEffect, useState } from "react";
import { useEmeraldBalance } from "./EmeraldBalanceContext.jsx";

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
    const [campaigns, setCampaigns] = useState([]);
    const emerald = useEmeraldBalance();

    const saveCampaigns = (updatedCampaigns) => {
        setCampaigns(updatedCampaigns);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    };

    const fetchCampaigns = async () => {
        const localCampaigns = localStorage.getItem("campaigns");

        if (localCampaigns) {
            try {
                const parsedCampaigns = JSON.parse(localCampaigns);

                if (Array.isArray(parsedCampaigns)) {
                    setCampaigns(parsedCampaigns);
                    return;
                }
            } catch (error) {
                console.error("Could not parse local campaigns:", error);
            }
        }

        const res = await fetch("/data/campaigns.json");

        if (res.ok) {
            const data = await res.json();

            if (Array.isArray(data)) {
                saveCampaigns(data);
            }
        } else {
            console.error("Could not find any campaign data");
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const getNewId = () => {
        if (!campaigns || campaigns.length === 0) {
            return "cmp-001";
        }

        const highestId = Math.max(
            ...campaigns.map(campaign => Number(campaign.id.split("-")[1]))
        );

        const newIdNumber = highestId + 1;
        const paddedId = newIdNumber.toString().padStart(3, "0");

        return `cmp-${paddedId}`;
    };

    const addNewCampaign = (campaign) => {
        const updatedCampaigns = [...campaigns, campaign];

        saveCampaigns(updatedCampaigns);
    };

    const editCampaign = (id, updatedCampaign) => {
        const updatedCampaigns = campaigns.map(campaign => {
            return campaign.id === id
                ? { ...updatedCampaign, id }
                : campaign;
        });

        saveCampaigns(updatedCampaigns);
    };

    const deleteCampaign = (id) => {
        const campaignToDelete = campaigns.find(campaign => campaign.id === id);

        if (!campaignToDelete) return;

        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);

        emerald.addEmeraldBalance(Number(campaignToDelete.fund));

        saveCampaigns(updatedCampaigns);
    };

    const value = {
        campaigns,
        getNewId,
        addNewCampaign,
        editCampaign,
        deleteCampaign,
    };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
}

export function useCampaignContext() {
    return useContext(CampaignContext);
}