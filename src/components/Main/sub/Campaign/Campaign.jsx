import './Campaign.css';

export default function Campaign({campaign,setCurrentTab,setFocusCampaign,
                                     setDisplayDeleteModal}) {
    const MAX_VISIBLE_KEYWORDS=3;

    return <div className="campaign-container">
        <span className='campaign-name campaign-col'>
            {campaign.name}
        </span>
        <span className='campaign-keywords campaign-col'>
            {campaign.keywords.map((keyword,index) => {
                return index<MAX_VISIBLE_KEYWORDS && <span key={`campaign-keywords-${keyword}`}>{keyword}</span>
            })}
            {campaign.keywords.length>MAX_VISIBLE_KEYWORDS && <span>+{campaign.keywords.length-3}</span>}
        </span>
        <span className='campaign-bid campaign-col'>
            {campaign.bidAmount}
            <span>EMD</span>
        </span>
        <span className='campaign-fund campaign-col'>
            {campaign.fund}
            <span>EMD</span>
        </span>
        <span className='campaign-status campaign-col'>
            {campaign.status === 'on' ? <span className='campaign-status-on'>
                <span className='status-indicator'></span>
                    On
            </span> :
                <span className='campaign-status-off'>
<span className='status-indicator'></span>
                    Off
                </span>}
        </span>
        <span className='campaign-town campaign-col'>
            {campaign.town}
        </span>
        <span className='campaign-radius campaign-col'>
            {campaign.radius} km
        </span>
        <div className='campaign-btns-container'>
            <button className='edit-campaign-btn campaign-btn' type='button'
                    onClick={()=>{
                        setFocusCampaign(campaign.id)
                        setCurrentTab('edit')
                    }}
            >
                <img src='/images/edit-icon.png' alt="edit icon"/>
            </button>
            <button className='remove-campaign-btn campaign-btn'
                    onClick={()=>{
                        setFocusCampaign(campaign.id)
                        setCurrentTab('delete')
                    }}
            >
                <img src='/images/delete-icon.png' alt="delete icon"
                     onClick={()=>{
                         setFocusCampaign(campaign.id)
                         setDisplayDeleteModal(true)
                     }}/>
            </button>
        </div>
    </div>;
}
