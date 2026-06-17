import "./Header.css";
import {useEmeraldBalance} from "../../context/EmeraldBalanceContext.jsx";

export default function Header() {
    const emeraldBalance = useEmeraldBalance();

    return (
        <header className="app-header">
            <div className="app-header-left">
                <h1>Campaigns</h1>
                <p>Create and manage your advertising campaigns</p>
            </div>

            <div className="app-header-right">
                <div className="emerald-balance-container">
                    <div className="emerald-balance">
                        <strong className="emerald-balance-label">Emerald balance</strong>

                        <span className="emerald-balance-amount">
                             <span>{emeraldBalance.parseEmeraldToString()}</span> EMD
                        </span>
                    </div>

                    <img
                        src="/images/emerald-currency-icon.png"
                        alt=""
                        loading="lazy"
                        className="emerald-balance-icon"
                    />
                </div>
            </div>
        </header>
    );
}