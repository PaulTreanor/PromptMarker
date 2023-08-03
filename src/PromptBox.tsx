import React, { useState } from 'react';
import Modal from './Modal';

export default function PromptBox({ AddPrompt }) {
    const [title, setTitle] = useState('Prompt 1');
    const [contents, setContents] = useState('This is the prompts contents');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        AddPrompt(contents);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentsChange = (e) => {
        setContents(e.target.value);
    }

    const handleDoubleClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div onDoubleClick={handleDoubleClick} onClick={handleClick} className="mt-5 border-y bg-slate-50 hover:bg-slate-100">
            <h4 className="text-lg font-bold">{title}</h4>
            <p className=''>{contents}</p>

            {isModalOpen && (
              <Modal closeModal={closeModal}>
                <input value={title} onChange={handleTitleChange} className="text-lg font-bold"/>
                <textarea value={contents} onChange={handleContentsChange} className="mt-2" rows="10" cols="50"/>
              </Modal>
            )}
        </div>
    )
}
