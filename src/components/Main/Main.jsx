import './Main.css';
import {useEffect, useState} from "react";
import Campaign from "./sub/Campaign/Campaign.jsx";

export default function Main() {
    const [campaigns, setCampaigns] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
       const fetchCampaigns = async () => {
           const res = await fetch('/data/campaigns.json');
           if(res.ok){
               const data = await res.json();
               if(data){
                   setCampaigns(data);
               }
           }else{
               console.error('Error fetching data campaigns: ', res.status);
           }
       }

       fetchCampaigns();

    },[])


    return <main className="app-main">
        <div className="campaigns-container">
            <div className='campaigns-container-nav'>
                <input type='text' className='campaigns-search-input' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                placeholder='Search campaigns'/>
                <button className='add-campaigns-btn' >
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
                {campaigns.length > 0 && campaigns.map((campaign) => {
                    return <Campaign key={campaign.id} campaign={campaign} />
                })}
            </div>
        </div>
    </main>;
}
