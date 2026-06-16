import './Campaign.css';

export default function Campaign({campaign}) {

    return <div className="campaign-container">
        <span className='campaign-name campaign-col'>
            {campaign.name}
        </span>
        <span className='campaign-keywords campaign-col'>

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
            <button className='edit-campaign-btn campaign-btn'>
                <img src='/images/edit-icon.png' alt="edit icon" />
            </button>
            <button className='remove-campaign-btn campaign-btn'>
                <img src='/images/delete-icon.png' alt="delete icon" />
            </button>
        </div>
    </div>;
}
