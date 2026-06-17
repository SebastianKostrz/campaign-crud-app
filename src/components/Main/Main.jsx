import './Main.css';
import {useEffect, useState} from "react";
import Campaign from "./sub/Campaign/Campaign.jsx";
import CUCampaign from "./sub/CUCampaign/CUCampaign.jsx";
import {useCampaignContext} from "../../context/CampaignContext.jsx";
import DeleteModal from "./sub/Modal/DeleteModal.jsx";

export default function Main() {
    const campaigns = useCampaignContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentTab,setCurrentTab] = useState(null);
    const [focusCampaign, setFocusCampaign] = useState(null);
    const [displayDeleteModal,setDisplayDeleteModal] = useState(false);




    return <main className="app-main" style={{justifyContent:currentTab==='add' || currentTab==='edit' ? 'space-between' : 'center'}}>
        <div className="campaigns-container" style={{width:currentTab==='add' || currentTab==='edit' ? '60%' : '90%'}}>
            <div className='campaigns-container-nav'>
                <input type='text' className='campaigns-search-input' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                placeholder='Search campaigns'/>
                <button className='add-campaigns-btn'
                onClick={() => setCurrentTab('add')}>
                    <span>+</span> Add campaigns
                </button>
            </div>
            <div className="campaigns-container-content">
                <div className='campaigns-labels'>
                    <span className="campaigns-label col-name">Campaign name</span>
                    <span className="campaigns-label col-keywords">Keywords</span>
                    <span className="campaigns-label col-bid">Bid amount</span>
                    <span className="campaigns-label col-fund">Fund</span>
                    <span className="campaigns-label col-status">Status</span>
                    <span className="campaigns-label col-town">Town</span>
                    <span className="campaigns-label col-radius">Radius</span>
                </div>
                {campaigns.campaigns && campaigns.campaigns.map((campaign) => {
                    return <Campaign key={campaign.id} campaign={campaign} setFocusCampaign={setFocusCampaign}
                                     setCurrentTab={setCurrentTab} setDisplayDeleteModal={setDisplayDeleteModal}/>
                })}
            </div>
        </div>
        {currentTab === "add" ? <CUCampaign type="add" focusCampaign={focusCampaign} setFocusCampaign={setFocusCampaign}
                                            setCurrentTab={setCurrentTab}/>
            : currentTab==='edit' ? <CUCampaign type="edit" focusCampaign={focusCampaign} setFocusCampaign={setFocusCampaign}
                setCurrentTab={setCurrentTab}/>
                : <></> }
        {displayDeleteModal && <DeleteModal setDisplayDeleteModal={setDisplayDeleteModal} focusCampaign={focusCampaign} />}
    </main>;
}
