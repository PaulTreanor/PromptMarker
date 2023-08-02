function App() {
  const mystyle = {
    width: "100%",
    height: "100%"
  };

  const mywebview = {
    "minWidth": "900px",
    "minHeight": "1200px"
  };

  const doSomething = () => {
    console.log("button clicked");
  }
  
  return (
    <>
      <p className="font-bold">hello asdf</p>
      <button onClick={doSomething} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
      <div style={mystyle}>
        <webview src="https://www.paultreanor.com/" className="min-h-full" style={mywebview}></webview>
      </div>   
    </>
  )
}

export default App
