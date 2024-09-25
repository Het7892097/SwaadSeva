import React from 'react';

const LimitExceededModal = ({ isModalOpen, setIsModalOpen }) => {
    return (
        <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Limit Exceeded!</h3>
                <p className="py-4">You can only add a maximum of 15 items to the cart.</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default LimitExceededModal;
