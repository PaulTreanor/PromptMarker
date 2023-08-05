import React, { useState } from 'react'
import Modal from './Modal'

export default function PromptBox ({ InsertPrompt, PromptData }) {
  const [title, setTitle] = useState(PromptData.title)
  const [contents, setContents] = useState(PromptData.text)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    InsertPrompts(contents)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentsChange = (e) => {
    setContents(e.target.value)
  }

  const handleDoubleClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
        <div onDoubleClick={handleDoubleClick} onClick={handleClick} className="mt-3 bg-slate-50 hover:bg-slate-100">
            <div href="#" className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis max-h-[3em] whitespace-nowrap">{contents}</p>
            </div>

            {isModalOpen && (
              <Modal closeModal={closeModal}>
                <input value={title} onChange={handleTitleChange} className="text-lg font-bold"/>
                <textarea value={contents} onChange={handleContentsChange} className="mt-2" rows="10" cols="50"/>
              </Modal>
            )}
        </div>
  )
}
