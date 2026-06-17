import './DeleteModal.css';
import {useCampaignContext} from "../../../../context/CampaignContext.jsx";

export default function DeleteModal({setDisplayDeleteModal, focusCampaign}) {
    const campaign=useCampaignContext();





    return <div className="modal-overlay"
    onClick={(e) => {

        setDisplayDeleteModal(false);
    }}>
        <div className="modal-container" onClick={
            e=>e.stopPropagation()
        }>
            <div className="modal-header">
                <div className='close-modal-btn' onClick={()=>{
                    setDisplayDeleteModal(false);
                }}></div>
            </div>
            <div className="modal-content">
                <div className='modal-content-img-wrapper'>
                    <img src='/images/delete-icon.png' alt=""/>
                </div>
                <h2>Delete campaign?</h2>
                <span>Are you sure you want to delete this campaign?<br></br>
                This action cannot be undone</span>
                <div className='modal-btns-container'>
                    <button className='modal-btn-cancel'
                    onClick={()=>setDisplayDeleteModal(false)}>Cancel</button>

                    <button className='modal-btn-delete'
                    onClick={()=> {
                        campaign.deleteCampaign(focusCampaign)
                        setDisplayDeleteModal(false);
                    }}>Delete campaign</button>
                </div>
            </div>
        </div>
    </div>;
}
