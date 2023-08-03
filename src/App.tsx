import { useRef } from 'react';
import PromptBox from './PromptBox';

function App() {
  const webviewRef = useRef(null);

  const mystyle = {
    width: "100%",
    height: "100%"
  };

  const mywebview = {
    "minHeight": "1200px"
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

      var inputElement = document.querySelector('#searchbox');
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

      var inputElement = document.querySelector('#searchbox');
      if (inputElement) {
        simulateUserInput(inputElement, "");
      }
    `;

    if (webviewRef.current) {
      webviewRef.current.executeJavaScript(script);
    }
  };

  return (
    <>
      <div className="flex">        
        <div style={mystyle}>
          <webview ref={webviewRef} src="https://www.paultreanor.com/" className="min-h-full" style={mywebview}  webpreferences="contextIsolation=yes, nodeIntegration=no, enableRemoteModule=no, sandbox=yes, safeDialogs=yes, javascript=yes"></webview>
        </div>   
        <div id="sidebar" className="px-5 py-5 w-96 sm:w-1/4 flex flex-col">
          <button onClick={RemovePrompt} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            ⌦ Clear Prompt 
          </button>
          <h3 className="pt-5 text-xl font-bold">Your prompts</h3>
          <PromptBox AddPrompt={AddPrompt}/>
          <div>
            <button onClick={RemovePrompt} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              ➕ Add new Prompt 
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
