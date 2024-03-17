import { useRef, useEffect } from 'react'
import type { ReactElement } from 'react'
declare global {
  interface Window { app: any }
}

interface WebViewElement extends HTMLElement {
  executeJavaScript: (script: string) => void
}

function App (): ReactElement {
  const webviewRef = useRef<WebViewElement | null>(null)

  useEffect(() => {
    const webview = webviewRef.current
    const css = `
      .gizmo-shadow-stroke {
        display: none !important;
      }
    `

    const script = `
      // Function to inject CSS
      const injectCSS = (css) => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.head.appendChild(style);
      };
  
      // Function to remove element containing specific text
      const removeElementWithText = (text) => {
        const xpath = "//text()[contains(., '" + text + "')]/parent::*";
        const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (matchingElement) {
          matchingElement.parentNode.removeChild(matchingElement);
        }
      };
  
      // Inject CSS to hide elements with 'gizmo-shadow-stroke' class
      injectCSS(\`${css}\`);
  
      // Remove element with specific text
      removeElementWithText("How can I help you today?");
    `

    if (webview != null) {
      webview.addEventListener('dom-ready', () => {
        webview.executeJavaScript(script)
      })
    }
  }, [])

  const mywebview = {
    minHeight: '800px'
  }

  const toggleHistorySidebar = (): void => {
    // execute the keyboard shortcut (cmd + shift + S) to open the history sidebar within the webview
    const script = `
      var e = new KeyboardEvent('keydown', {bubbles: true, cancelable: true, key: 'S', shiftKey: true, metaKey: true});
      document.dispatchEvent(e);
    `
    if (webviewRef.current != null) {
      webviewRef.current.executeJavaScript(script)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // On macOS, `metaKey` is the Command key, and `ctrlKey` is the Control key.
      // On Windows/Linux, `ctrlKey` is the Control key.
      // We check for both `metaKey` and `ctrlKey` to cover all platforms.
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === 'S' || event.key === 's')) {
        toggleHistorySidebar()
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyPress)

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <div>
        <div>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <webview ref={webviewRef} src="https://chat.openai.com/" className="min-h-full" style={mywebview} webpreferences="contextIsolation=yes, nodeIntegration=no, enableRemoteModule=no, sandbox=yes, safeDialogs=yes, javascript=yes"></webview>
        </div>
      </div>
    </>
  )
}

export default App
