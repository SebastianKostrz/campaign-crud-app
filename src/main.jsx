import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {EmeraldBalanceProvider} from "./context/EmeraldBalanceContext.jsx";
import {CampaignProvider} from "./context/CampaignContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <EmeraldBalanceProvider>
            <CampaignProvider>
                <App/>
            </CampaignProvider>
        </EmeraldBalanceProvider>
    </StrictMode>,
)
