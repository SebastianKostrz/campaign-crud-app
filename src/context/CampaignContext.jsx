import {createContext, useContext, useEffect, useState} from "react";
import {useEmeraldBalance} from "./EmeraldBalanceContext.jsx";

const CampaignContext = createContext(null);

export function CampaignProvider({children}) {
    const [campaigns, setCampaigns] = useState(null);
    const emerald = useEmeraldBalance();

    const fetchCampaign = async () => {
        const localCampaigns = localStorage.getItem("campaigns");
        const localCampaignsParsed=await JSON.parse(localCampaigns);
        if(localCampaignsParsed){
            setCampaigns(localCampaignsParsed);
        }else{
            const res = await fetch('/data/campaigns.json');
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    setCampaigns(data);
                    localStorage.setItem("campaigns", JSON.stringify(data));
                }
            } else {
                console.error('Could not find any campaign data');
            }
        }
    }

    useEffect(() => {

        fetchCampaign();

    }, [])

    const getNewId = () => {
        if (!campaigns || campaigns.length === 0) {
            return "cmp-001";
        }

        const latestCampaign = campaigns[campaigns.length - 1];
        const latestCampaignId = latestCampaign.id;

        const idNumber = Number(latestCampaignId.split("-")[1]);
        const newIdNumber = idNumber + 1;

        const paddedId = newIdNumber.toString().padStart(3, "0");

        return `cmp-${paddedId}`;
    };

    const addNewCampaign = async (campaign) => {
        if(campaigns){
            const updatedCampaign = [...campaigns,campaign];
            localStorage.setItem("campaigns", JSON.stringify(updatedCampaign));
            fetchCampaign()
        }
    }

    const editCampaign = async (id,campaign) => {
        if(campaigns){
            const updatedCampaigns = campaigns.map(camp=>{
               return camp.id===id ? {...campaign,id:id}: camp;
            })
            setCampaigns(updatedCampaigns);
            localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        }
    }

    const deleteCampaign = (id) => {
        if (!campaigns) return;

        const campaignToDelete = campaigns.find(camp => camp.id === id);

        if (!campaignToDelete) return;

        const updatedCampaigns = campaigns.filter(camp => camp.id !== id);

        emerald.addEmeraldBalance(campaignToDelete.fund);

        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        setCampaigns(updatedCampaigns);
    };

    const value = {
        getNewId,
        addNewCampaign,
        campaigns,
        editCampaign,
        deleteCampaign
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