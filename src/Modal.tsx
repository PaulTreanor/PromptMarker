const Modal = ({ children, closeModal }) => (
  <div className="modal-overlay">
    <div className="modal-content">
    <button 
        onClick={closeModal}
        className="mb-4 px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
        Close
    </button>

      <br />
      {children}
    </div>
  </div>
);

export default Modal;
