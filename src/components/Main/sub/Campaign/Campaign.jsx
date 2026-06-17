import './Campaign.css';

export default function Campaign({
                                     campaign,
                                     setCurrentTab,
                                     setFocusCampaign,
                                     setDisplayDeleteModal
                                 }) {
    const MAX_VISIBLE_KEYWORDS = 3;

    return (
        <div className="campaign-container">
            <div className="campaign-name campaign-col">
                <span className="campaign-value campaign-title">
                    {campaign.name}
                </span>
            </div>

            <div className="campaign-keywords campaign-col">
                <span className="campaign-mobile-label">Keywords</span>

                <div className="campaign-keywords-list">
                    {campaign.keywords.map((keyword, index) => {
                        return index < MAX_VISIBLE_KEYWORDS && (
                            <span key={`campaign-keywords-${campaign.id}-${keyword}`}>
                                {keyword}
                            </span>
                        );
                    })}

                    {campaign.keywords.length > MAX_VISIBLE_KEYWORDS && (
                        <span>+{campaign.keywords.length - MAX_VISIBLE_KEYWORDS}</span>
                    )}
                </div>
            </div>

            <div className="campaign-bid campaign-col">
                <span className="campaign-mobile-label">Bid amount</span>

                <span className="campaign-value">
                    {campaign.bidAmount}
                    <span className="campaign-currency">EMD</span>
                </span>
            </div>

            <div className="campaign-fund campaign-col">
                <span className="campaign-mobile-label">Fund</span>

                <span className="campaign-value">
                    {campaign.fund}
                    <span className="campaign-currency">EMD</span>
                </span>
            </div>

            <div className="campaign-status campaign-col">
                <span className="campaign-mobile-label">Status</span>

                {campaign.status === 'on' ? (
                    <span className="campaign-status-on">
                        <span className="status-indicator"></span>
                        On
                    </span>
                ) : (
                    <span className="campaign-status-off">
                        <span className="status-indicator"></span>
                        Off
                    </span>
                )}
            </div>

            <div className="campaign-town campaign-col">
                <span className="campaign-mobile-label">Town</span>

                <span className="campaign-value">
                    {campaign.town}
                </span>
            </div>

            <div className="campaign-radius campaign-col">
                <span className="campaign-mobile-label">Radius</span>

                <span className="campaign-value">
                    {campaign.radius} km
                </span>
            </div>

            <div className="campaign-btns-container">
                <button
                    className="edit-campaign-btn campaign-btn"
                    type="button"
                    onClick={() => {
                        setFocusCampaign(campaign.id);
                        setCurrentTab('edit');
                    }}
                >
                    <img src="/images/edit-icon.png" alt="Edit campaign"/>
                </button>

                <button
                    className="remove-campaign-btn campaign-btn"
                    type="button"
                    onClick={() => {
                        setFocusCampaign(campaign.id);
                        setDisplayDeleteModal(true);
                    }}
                >
                    <img src="/images/delete-icon.png" alt="Delete campaign"/>
                </button>
            </div>
        </div>
    );
}