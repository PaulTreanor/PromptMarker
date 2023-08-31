import { useRef, useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import PromptBox from './PromptBox'
import type { Prompt } from './types'
import { v4 as uuidv4 } from 'uuid'
import sanitizeStringForJS from './utils'

declare global {
  interface Window { app: any }
}

interface WebViewElement extends HTMLElement {
  executeJavaScript: (script: string) => void
}

function App (): ReactElement {
  const webviewRef = useRef<WebViewElement | null>(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false) // So we don't overwrite prompts in store with empty array initalised by useState

  useEffect(() => {
    // Read from the store when the component mounts
    window.app.readFromStore().then((data: Prompt[]) => {
      setPrompts(data)
    })
  }, [])

  useEffect(() => {
    // Read from the store when the component mounts
    window.app.readFromStore().then((data: Prompt[]) => {
      setPrompts(data)
      setIsInitialDataLoaded(true)
    })
  }, [])

  useEffect(() => {
    // Write to the store whenever the prompts change
    // but not on the initial render
    if (isInitialDataLoaded) {
      window.app.writeToStore(prompts)
    }
  }, [prompts, isInitialDataLoaded])

  const mystyle = {
    width: isSidebarMinimized ? '100%' : '75%',
    height: '100%'
  }

  const mywebview = {
    minHeight: '800px'
  }

  const addPromptToState = (): void => {
    const prompt: Prompt = {
      id: uuidv4(),
      title: 'New Prompt',
      text: 'This is a new prompt',
      isNew: true
    }
    setPrompts((prevPrompts) => [...prevPrompts, prompt])
  }

  const updatePrompt = (id: string, newPrompt: Prompt): void => {
    setPrompts((prevPrompts) =>
      prevPrompts.map((prompt) =>
        prompt.id === id ? newPrompt : prompt
      )
    )
  }

  // Delete prompt from state
  const deletePrompt = (id: string): void => {
    setPrompts((prevPrompts) => prevPrompts.filter((prompt) => prompt.id !== id))
  }

  // Add prompt to webview chat input box
  const InsertPrompt = (inputText: string): void => {
    const sanitizedInputText = sanitizeStringForJS(inputText)
    const script = ` 
      function simulateUserInput(element, text) {
        const inputEvent = new Event('input', { bubbles: true });
        element.focus();
        element.value = text;
        element.dispatchEvent(inputEvent);
      }

      var inputElement = document.querySelector('#prompt-textarea');
      if (inputElement) {
        simulateUserInput(inputElement, "${sanitizedInputText}");
      }
    `

    if (webviewRef.current != null) {
      webviewRef.current.executeJavaScript(script)
    }
  }

  const RemovePrompt = (): void => {
    const script = ` 
      function simulateUserInput(element, text) {
        const inputEvent = new Event('input', { bubbles: true });
        element.focus();
        element.value = text;
        element.dispatchEvent(inputEvent);
      }

      var inputElement = document.querySelector('#prompt-textarea');
      if (inputElement) {
        simulateUserInput(inputElement, "");
      }
    `

    if (webviewRef.current != null) {
      webviewRef.current.executeJavaScript(script)
    }
  }

  const toggleSidebar = (): void => {
    setIsSidebarMinimized(!isSidebarMinimized)
  }

  return (
    <>
      <div className="flex">
        <div style={mystyle}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <webview ref={webviewRef} src="https://chat.openai.com/" className="min-h-full" style={mywebview} webpreferences="contextIsolation=yes, nodeIntegration=no, enableRemoteModule=no, sandbox=yes, safeDialogs=yes, javascript=yes"></webview>
        </div>
        <div id="sidebar" className={`px-5 ${isSidebarMinimized ? 'w-24 px-1' : 'w-96 sm:w-1/4 border-l'} flex flex-col`}>
          <button onClick={toggleSidebar} className={'mt-4 mb-1 h-11 text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 font-bold py-2 px-4 rounded-lg'}>
            {isSidebarMinimized ? (<SVGIcon />) : 'Collapse'}
          </button>

          {!isSidebarMinimized && (
            <>
              <button onClick={RemovePrompt} className='mt-2 mb-1 h-11 text-red-600 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-red-700 font-bold py-2 px-4 rounded-lg'>
                Clear Prompt
              </button>

              <h3 className="pt-5 text-xl font-bold">Your prompts</h3>

              <ul>
                {prompts.map((prompt: Prompt) => {
                  console.log(prompt)
                  return (
                    <li key={prompt.id}>
                      <PromptBox
                        InsertPrompt={InsertPrompt}
                        PromptData={prompt}
                        DeletePrompt={deletePrompt}
                        UpdatePrompt={updatePrompt}
                        isNew={prompt.isNew}
                      />
                    </li>
                  )
                })}
              </ul>

              <button onClick={addPromptToState} className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Add new Prompt
              </button>

            </>
          )}
        </div>

      </div>
    </>
  )
}

export default App

function SVGIcon (): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  )
}
