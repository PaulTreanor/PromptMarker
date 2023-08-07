import { useRef, useState } from 'react'
import type { ReactElement } from 'react'
import PromptBox from './PromptBox'
import type { Prompt } from './types'
import { v4 as uuidv4 } from 'uuid'

function App (): ReactElement {
  const webviewRef = useRef(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])

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
      text: 'This is a new prompt'
    }
    setPrompts((prevPrompts) => [...prevPrompts, prompt])
    console.log(prompts)
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
    const script = ` 
      function simulateUserInput(element, text) {
        const inputEvent = new Event('input', { bubbles: true });
        element.focus();
        element.value = text;
        element.dispatchEvent(inputEvent);
      }

      var inputElement = document.querySelector('#prompt-textarea');
      if (inputElement) {
        simulateUserInput(inputElement, "${inputText}");
      }
    `

    if (webviewRef.current) {
      webviewRef.current.executeJavaScript(script)
    }
  }

  const RemovePrompt = () => {
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

    if (webviewRef.current) {
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
          <webview ref={webviewRef} src="https://chat.openai.com/" className="min-h-full" style={mywebview} webpreferences="contextIsolation=yes, nodeIntegration=no, enableRemoteModule=no, sandbox=yes, safeDialogs=yes, javascript=yes"></webview>
        </div>
        <div id="sidebar" className={`px-5 ${isSidebarMinimized ? 'w-20 px-1' : 'w-96 sm:w-1/4 border-l'} flex flex-col`}>
          <button onClick={toggleSidebar} className={'mt-4 mb-1 h-11 text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 font-bold py-2 px-4 rounded-lg'}>
            {isSidebarMinimized ? '▶' : 'Collapse'}
          </button>

          {!isSidebarMinimized && (
            <>
              <button onClick={RemovePrompt} className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Clear Prompt
              </button>

              <h3 className="pt-5 text-xl font-bold">Your prompts</h3>

              <ul className="">
                {prompts.map((prompt: Prompt) => (
                  <li key={prompt.id}>
                    <PromptBox InsertPrompt={InsertPrompt} PromptData={prompt} DeletePrompt={deletePrompt} UpdatePrompt={updatePrompt}/>
                  </li>
                ))}
                <li>
                </li>
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
