import React, { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import Modal from './Modal'
import type { Prompt } from './types'

interface PromptBoxProps {
  InsertPrompt: (inputText: string) => void
  PromptData: Prompt
  DeletePrompt: (id: string) => void
  UpdatePrompt: (id: string, newPrompt: Prompt) => void
  isNew: boolean
}

export default function PromptBox ({ InsertPrompt, PromptData, DeletePrompt, UpdatePrompt, isNew }: PromptBoxProps): ReactElement {
  const [title, setTitle] = useState(PromptData.title)
  const [contents, setContents] = useState(PromptData.text)
  const [isModalOpen, setIsModalOpen] = useState(!!isNew)

  useEffect(() => {
    if (isNew) {
      UpdatePrompt(PromptData.id, { ...PromptData, isNew: false })
    }
  }, [isNew, PromptData, UpdatePrompt])

  const handleClick = (): void => {
    InsertPrompt(contents)
  }

  const handleDeleteButton = (): void => {
    DeletePrompt(PromptData.id)
    setIsModalOpen(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value
    setTitle(newTitle)
    UpdatePrompt(PromptData.id, { ...PromptData, title: newTitle })
  }

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newContents = e.target.value
    setContents(newContents)
    UpdatePrompt(PromptData.id, { ...PromptData, text: newContents })
  }

  const handleDoubleClick = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <div onClick={handleClick} className="">
      <div className="mt-3 block  p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {/* Edit Icon */}

        <div className='flex justify-between'>
          <h5 className="mb-1 pr-1 font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden">{title}</h5>
          <div className="cursor-pointer pl-2 pr-1" >
            <svg onClick={handleDoubleClick} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.96 122.88" width="5" height="20">
                <title>3-vertical-dots</title>
                <path fillRule="evenodd" d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/>
            </svg>
          </div>

        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis max-h-[3em] whitespace-nowrap">{contents}</p>
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal} handleDeleteButton={handleDeleteButton}>
          <input value={title} onChange={handleTitleChange} className="text-lg font-bold px-2 border w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <textarea value={contents} onChange={handleContentsChange} className="mt-2 px-2 w-full border rounded-lg  bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows={10} />
        </Modal>
      )}
    </div>
  )
}
