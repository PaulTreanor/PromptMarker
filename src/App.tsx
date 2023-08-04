import { useRef, useState } from 'react';
import PromptBox from './PromptBox';


const promptList = [
  {
    id: 1,
    title: "JavaScript dev",
    text: "I am an expert JavaScript developer. I want you to answer my questions as an expert JavaScript developer."
  },
  {
    id: 2,
    title: "Prompt 2",
    text: "This is the second prompt"
  },
  {
    id: 3,
    title: "Code Review",
    text: "This is the third prompt"
  }
  ]
  
function App() {
  const webviewRef = useRef(null);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const mystyle = {
    width: isSidebarMinimized ? "100%" : "75%",
    height: "100%"
  };


  const mywebview = {
    "minHeight": "800px"
  };

  const AddPrompt = (inputText) => {

    console.log("calling addprompt")
    console.log(inputText)

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
    `;

    if (webviewRef.current) {
      webviewRef.current.executeJavaScript(script);
    }
  };


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
    `;

    if (webviewRef.current) {
      webviewRef.current.executeJavaScript(script);
    }
  };


  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <>
      <div className="flex">        
        <div style={mystyle}>
          <webview ref={webviewRef} src="https://chat.openai.com/" className="min-h-full" style={mywebview}  webpreferences="contextIsolation=yes, nodeIntegration=no, enableRemoteModule=no, sandbox=yes, safeDialogs=yes, javascript=yes"></webview>
        </div>   
        <div id="sidebar" className={`px-5 ${isSidebarMinimized ? "w-20 px-1" : "w-96 sm:w-1/4 border-l"} flex flex-col`}>
          <button onClick={toggleSidebar} className={`mt-4 mb-1 h-11 text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 font-bold py-2 px-4 rounded-lg`}>
            {isSidebarMinimized ? '▶' : 'Collapse'}
          </button>
          
          {!isSidebarMinimized && (
            <>
              <button onClick={RemovePrompt} className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Clear Prompt 
              </button>
              
              <h3 className="pt-5 text-xl font-bold">Your prompts</h3>

              <ul className="">
                {promptList.map((prompt) => (
                  <li key={prompt.id}>
                    <PromptBox AddPrompt={AddPrompt} PromptData={prompt}/>
                  </li>
                ))}
                <li>
                </li>
              </ul>

              <button onClick={RemovePrompt} className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
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
