import type { ReactElement } from 'react'

interface ModalProps {
  handleDeleteButton: () => void
  children: React.ReactNode
  closeModal: () => void
}

const Modal = ({ handleDeleteButton, children, closeModal }: ModalProps): ReactElement => (
  <div onClick={closeModal} className="modal-overlay">
    <div onClick={e => { e.stopPropagation() }} className="modal-content">
    <div className='flex justify-between'>
      <button
          onClick={closeModal}
          className="mb-4 px-4 py-2 font-semibold mr-2 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
      >
          Close
      </button>

      <p onClick={handleDeleteButton} className="text-red-500 hover:text-red-800 cursor-pointer text-right">
        Delete Prompt
      </p>
    </div>

      <br />
      {children}
    </div>
  </div>
)

export default Modal
