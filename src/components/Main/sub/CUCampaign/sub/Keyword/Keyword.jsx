import './Keyword.css';

export default function Keyword({keyword,newCampaign,setNewCampaign}) {

    const deleteKeyword = () => {
        setNewCampaign(prev => ({
            ...prev,
            keywords: prev.keywords.filter(k => k !== keyword)
        }));
    }


    return <div className="keyword-container">
        <span>{keyword}</span>
        <button type="button" onClick={()=>deleteKeyword()}></button>
    </div>;
}
