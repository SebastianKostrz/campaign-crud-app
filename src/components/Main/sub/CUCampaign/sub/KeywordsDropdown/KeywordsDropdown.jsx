import './KeywordsDropdown.css';
import {useEffect, useState} from "react";

export default function KeywordsDropdown({keywords,keywordsQuery,
                                         newCampaign,setNewCampaign,
                                         setKeywordsQuery}) {
    const [filteredKeywords, setFilteredKeywords] = useState([]);

    useEffect(() => {
        const filteredKeywordsTemp = keywords
            .filter(keyword => keyword.includes(keywordsQuery.toLowerCase()))
            .filter(keyword => !newCampaign.keywords.includes(keyword));
        setFilteredKeywords(filteredKeywordsTemp);
    },[keywordsQuery,keywords,newCampaign.keywords]);



    return <div className="keywords-dropdown">
        {filteredKeywords.map((keyword) => {
            return <span key={keyword}
            onMouseDown={(e)=>{
                e.preventDefault();
                setNewCampaign({...newCampaign,keywords:[...newCampaign.keywords,keyword]})
                setKeywordsQuery("");
            }}>{keyword}</span>
        })}
    </div>;
}
