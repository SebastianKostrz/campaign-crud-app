import './Main.css';
import { useState } from "react";
import Campaign from "./sub/Campaign/Campaign.jsx";
import CUCampaign from "./sub/CUCampaign/CUCampaign.jsx";
import { useCampaignContext } from "../../context/CampaignContext.jsx";
import DeleteModal from "./sub/DeleteModal/DeleteModal.jsx";

export default function Main() {
    const campaigns = useCampaignContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentTab, setCurrentTab] = useState(null);
    const [focusCampaign, setFocusCampaign] = useState(null);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

    const isFormOpen = currentTab === "add" || currentTab === "edit";
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    const campaignsToDisplay = (campaigns.campaigns || []).filter(campaign => {
        if (!normalizedSearchQuery) return true;

        return campaign.name.toLowerCase().includes(normalizedSearchQuery);
    });

    return (
        <main className={`app-main ${isFormOpen ? "form-open" : ""}`}>
            <div className="campaigns-container">
                <div className="campaigns-container-nav">
                    <input
                        type="text"
                        className="campaigns-search-input"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search campaigns"
                    />

                    <button
                        className="add-campaigns-btn"
                        onClick={() => setCurrentTab("add")}
                    >
                        <span>+</span> Add campaigns
                    </button>
                </div>

                <div className="campaigns-container-content">
                    <div className="campaigns-labels">
                        <span className="campaigns-label col-name">Campaign name</span>
                        <span className="campaigns-label col-keywords">Keywords</span>
                        <span className="campaigns-label col-bid">Bid amount</span>
                        <span className="campaigns-label col-fund">Fund</span>
                        <span className="campaigns-label col-status">Status</span>
                        <span className="campaigns-label col-town">Town</span>
                        <span className="campaigns-label col-radius">Radius</span>
                    </div>

                    {campaignsToDisplay.map(campaign => (
                        <Campaign
                            key={campaign.id}
                            campaign={campaign}
                            setFocusCampaign={setFocusCampaign}
                            setCurrentTab={setCurrentTab}
                            setDisplayDeleteModal={setDisplayDeleteModal}
                        />
                    ))}
                </div>
            </div>

            {currentTab === "add" ? (
                <CUCampaign
                    type="add"
                    focusCampaign={focusCampaign}
                    setFocusCampaign={setFocusCampaign}
                    setCurrentTab={setCurrentTab}
                />
            ) : currentTab === "edit" ? (
                <CUCampaign
                    type="edit"
                    focusCampaign={focusCampaign}
                    setFocusCampaign={setFocusCampaign}
                    setCurrentTab={setCurrentTab}
                />
            ) : null}

            {displayDeleteModal && (
                <DeleteModal
                    setDisplayDeleteModal={setDisplayDeleteModal}
                    focusCampaign={focusCampaign}
                />
            )}
        </main>
    );
}