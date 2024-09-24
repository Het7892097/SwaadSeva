const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  console.log("Modal props:", { isOpen, onClose, onConfirm }); // Check if props are coming through

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6">
        <h2 className="text-lg font-bold">Confirm Sign Up</h2>
        <p>Are you sure you want to sign up?</p>
        <div className="mt-4">
          <button
            onClick={() => {
              console.log("Confirm button clicked");
              onConfirm();
            }}
            className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={()=>{
                console.log("No button clicked");
                onClose()
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;