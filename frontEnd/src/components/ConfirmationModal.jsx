const ConfirmationModal = ({ isOpen, onClose, onConfirm, func }) => {
  // console.log("Modal props:", { isOpen, onClose, onConfirm }); // Check if props are coming through

  if (!isOpen) return null;
  let title = "";
  let desc = "";

  if (func === "Signup") {
    title = "Confirm Sign Up";
    desc = "Are you sure you want to sign up?";
  } else {
    title = "Log Out";
    desc = "Are you sure you want to log out?";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6">
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{desc}</p>
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
            onClick={() => {
              console.log("No button clicked");
              onClose();
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
