# 🔖 PromptMarker 

**A ChatGPT desktop app that lets you bookmark and quick add your favourite prompts.**

![Alt text](screenshot.png)

The app embdeds ChatGPT into a desktop app as a webview, and lets you quickly add and remove stored reusable prompts in a collapsable sidebar. 

> [!WARNING]
> This app is a prerelease non-notarised MacOS app, which means if you want to try it out you **must build it yourself** (see "Build the app" instructions). 

### How to use 
- Log into ChatGPT through the app. 
- Click on the expand icon on the top right of the app to show the sidebar. 
- Add a new prompt 
- Click the settings icon on a prompt to edit or delete it 
- Click on a prompt to add it to ChatGPT's input box

### Implementation
PromptMarker is built on top of Electron, React, Tailwinds, and Vite. 

### Setup (for developers)
**Setup dev env**
```bash
# Download the repo
npm install
```
**Run the app in dev mode**
```bash
npm run dev
```
**Run unit tests**
```bash
npm run test:unit
```

**Build the app**
```bash
npm run build
# Built app will be in /releases directory
```

**Notarising MacOS Apps**

https://github.com/electron/notarize
```bash
node notarizer.js`
```
