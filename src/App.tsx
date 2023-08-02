import React, { useRef } from 'react';

function App() {
  const webviewRef = useRef(null);

  const mystyle = {
    width: "100%",
    height: "100%"
  };

  const mywebview = {
    "minWidth": "900px",
    "minHeight": "1200px"
  };

  const doSomething = () => {
    const inputText = 'hello world';

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

  return (
    <>
      <p className="font-bold">hello asdf</p>
      <button onClick={doSomething} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
      <div style={mystyle}>
        <webview ref={webviewRef} src="https://www.paultreanor.com/" className="min-h-full" style={mywebview}></webview>
      </div>   
    </>
  )
}

export default App
