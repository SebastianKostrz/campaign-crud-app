import './CUCampaign.css';
import { useEffect, useState } from "react";
import { useEmeraldBalance } from "../../../../context/EmeraldBalanceContext.jsx";
import { useCampaignContext } from "../../../../context/CampaignContext.jsx";
import Keyword from "./sub/Keyword/Keyword.jsx";
import KeywordsDropdown from "./sub/KeywordsDropdown/KeywordsDropdown.jsx";

export default function CUCampaign({ type, focusCampaign, setFocusCampaign, setCurrentTab }) {
    const emerald = useEmeraldBalance();
    const campaign = useCampaignContext();

    const [areKeywordsFilled, setAreKeywordsFilled] = useState(null);

    const [newCampaign, setNewCampaign] = useState({
        id: "",
        name: "",
        keywords: [],
        bidAmount: "",
        fund: "",
        status: "on",
        town: "",
        radius: "",
    });

    const [keywords, setKeywords] = useState([]);
    const [towns, setTowns] = useState([]);
    const [keywordsQuery, setKeywordsQuery] = useState("");

    const oldCampaign = type === "edit"
        ? campaign?.campaigns?.find(c => c.id === focusCampaign)
        : null;

    const oldCampaignFund = Number(oldCampaign?.fund || 0);
    const newCampaignFund = Number(newCampaign.fund || 0);

    const availableBalance = type === "edit"
        ? emerald.emeraldBalance + oldCampaignFund
        : emerald.emeraldBalance;

    const newBalancePreview = Math.max(availableBalance - newCampaignFund, 0);

    const parsedNewBalancePreview = newBalancePreview.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    useEffect(() => {
        if (type === "edit" && oldCampaign) {
            setNewCampaign(oldCampaign);
        }
    }, [type, oldCampaign]);

    useEffect(() => {
        const fetchTowns = async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}data/towns.json`)

            if (res.ok) {
                const data = await res.json();

                if (data) setTowns(data);
            } else {
                console.error('Error fetching Towns');
            }
        };

        const fetchKeywords = async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}data/keywords.json`)

            if (res.ok) {
                const data = await res.json();

                if (data) setKeywords(data);
            } else {
                console.error('Error fetching Keywords');
            }
        };

        fetchTowns();
        fetchKeywords();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (newCampaign.keywords.length === 0) {
            setAreKeywordsFilled(false);
            return;
        }

        setAreKeywordsFilled(null);

        const preparedCampaign = {
            ...newCampaign,
            fund: Number(newCampaign.fund),
            bidAmount: Number(newCampaign.bidAmount),
            radius: Number(newCampaign.radius),
        };

        if (type === "add") {
            const newId = campaign.getNewId();

            if (newId !== "") {
                await campaign.addNewCampaign({
                    ...preparedCampaign,
                    id: newId,
                });

                emerald.subtractEmeraldBalance(preparedCampaign.fund);

                setCurrentTab(null);
                setFocusCampaign(null);
            }
        }

        if (type === "edit") {
            const previousFund = oldCampaignFund;

            await campaign.editCampaign(focusCampaign, {
                ...preparedCampaign,
                id: focusCampaign,
            });

            const fundDifference = preparedCampaign.fund - previousFund;

            if (fundDifference > 0) {
                emerald.subtractEmeraldBalance(fundDifference);
            } else if (fundDifference < 0) {
                emerald.addEmeraldBalance(Math.abs(fundDifference));
            }

            setCurrentTab(null);
            setFocusCampaign(null);
        }
    };

    const manageCampaignFund = (e) => {
        const value = e.target.value;

        if (value === "") {
            setNewCampaign(prev => ({ ...prev, fund: "" }));
            return;
        }

        const numericValue = Number(value);

        if (numericValue > availableBalance) {
            setNewCampaign(prev => ({ ...prev, fund: availableBalance }));
        } else if (numericValue <= 0) {
            setNewCampaign(prev => ({ ...prev, fund: 1 }));
        } else {
            setNewCampaign(prev => ({ ...prev, fund: numericValue }));
        }
    };

    const manageMinBid = (e) => {
        const value = e.target.value;

        if (value === "") {
            setNewCampaign(prev => ({ ...prev, bidAmount: "" }));
            return;
        }

        const numericValue = Number(value);

        if (numericValue <= 0) {
            setNewCampaign(prev => ({ ...prev, bidAmount: 1 }));
        } else {
            setNewCampaign(prev => ({ ...prev, bidAmount: numericValue }));
        }
    };

    const manageRadius = (e) => {
        const value = e.target.value;

        if (value === "") {
            setNewCampaign(prev => ({ ...prev, radius: "" }));
            return;
        }

        const numericValue = Number(value);

        if (numericValue <= 0) {
            setNewCampaign(prev => ({ ...prev, radius: 1 }));
        } else {
            setNewCampaign(prev => ({ ...prev, radius: numericValue }));
        }
    };

    return (
        <div className="cu-container">
            <h3>{type === 'add' ? 'Create campaign' : 'Edit campaign'}</h3>

            <form onSubmit={submit}>
                <div className="input-container">
                    <label htmlFor="cu-name">
                        Campaign name<span> *</span>
                    </label>
                    <input
                        type="text"
                        id="cu-name"
                        name="cu-name"
                        value={newCampaign.name}
                        placeholder="Enter campaign name"
                        onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                        required
                    />
                </div>

                <div className="input-container keywords-input-container">
                    <label htmlFor="cu-keywords">
                        Keywords<span> *</span>
                    </label>
                    <input
                        type="text"
                        id="cu-keywords"
                        name="cu-keywords"
                        placeholder="Type to search keywords..."
                        value={keywordsQuery}
                        onChange={(e) => setKeywordsQuery(e.target.value)}
                        style={{ borderColor: areKeywordsFilled === false ? 'red' : undefined }}
                    />

                    <KeywordsDropdown
                        keywords={keywords}
                        keywordsQuery={keywordsQuery}
                        newCampaign={newCampaign}
                        setNewCampaign={setNewCampaign}
                        setKeywordsQuery={setKeywordsQuery}
                    />

                    <div className="keywords-container">
                        {newCampaign.keywords && newCampaign.keywords.length > 0 && newCampaign.keywords.map(keyword => (
                            <Keyword
                                key={keyword}
                                keyword={keyword}
                                newCampaign={newCampaign}
                                setNewCampaign={setNewCampaign}
                            />
                        ))}
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="cu-bid">
                        Bid amount (EMD)<span> *</span>
                    </label>
                    <input
                        type="number"
                        id="cu-bid"
                        name="cu-bid"
                        placeholder="Enter bid amount"
                        required
                        min="1"
                        step="0.01"
                        value={newCampaign.bidAmount}
                        onChange={manageMinBid}
                    />
                    <span className="cu-input-comment">Minimum bid is 1.00 EMD</span>
                </div>

                <div className="input-container">
                    <label htmlFor="cu-fund">
                        Campaign fund (EMD)<span> *</span>
                    </label>
                    <input
                        type="number"
                        id="cu-fund"
                        name="cu-fund"
                        placeholder="Enter amount"
                        required
                        min="1"
                        max={availableBalance}
                        step="0.01"
                        value={newCampaign.fund}
                        onChange={manageCampaignFund}
                    />
                    <span className="cu-input-comment">
                        Amount will be deducted from your Emerald balance
                    </span>
                </div>

                <div className="cu-new-balance">
                    <span>New balance</span>
                    <span>
                        <strong>{parsedNewBalancePreview} EMD</strong>
                    </span>
                </div>

                <div className="cu-status">
                    <span>Status<span> *</span></span>

                    <div className="cu-status-btns">
                        <button
                            className="cu-status-button cu-btn-on"
                            type="button"
                            onClick={() => setNewCampaign({ ...newCampaign, status: "on" })}
                        >
                            <div style={{ backgroundColor: newCampaign.status === "on" ? "white" : "black" }}></div>
                            On
                        </button>

                        <button
                            className="cu-status-button cu-btn-off"
                            type="button"
                            onClick={() => setNewCampaign({ ...newCampaign, status: "off" })}
                        >
                            <div style={{ backgroundColor: newCampaign.status === "off" ? "white" : "black" }}></div>
                            Off
                        </button>

                        <div
                            className="cu-status-overlay"
                            style={{
                                left: newCampaign.status === "on" ? '0%' : '50%',
                                backgroundColor: newCampaign.status === 'on'
                                    ? 'rgba(0, 128, 0, 0.2)'
                                    : 'rgba(128, 128, 128, 0.2)',
                            }}
                        ></div>
                    </div>
                </div>

                <div className="cu-town">
                    <span>Town<span>*</span></span>

                    <select
                        required
                        value={newCampaign.town}
                        onChange={(e) => setNewCampaign({ ...newCampaign, town: e.target.value })}
                    >
                        <option value="" disabled>Select town</option>
                        {towns.length > 0 && towns.map(town => (
                            <option key={town} value={town}>{town}</option>
                        ))}
                    </select>
                </div>

                <div className="input-container">
                    <label htmlFor="cu-radius">
                        Radius (km)<span> *</span>
                    </label>
                    <input
                        type="number"
                        id="cu-radius"
                        name="cu-radius"
                        placeholder="Enter radius in kilometers"
                        required
                        min="1"
                        step="1"
                        value={newCampaign.radius}
                        onChange={manageRadius}
                    />
                </div>

                <button type="submit">
                    {type === "add" ? "Create campaign" : "Save changes"}
                </button>
            </form>
        </div>
    );
}