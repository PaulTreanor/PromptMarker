# 🔖 PromptCover

**A minimalist ChatGPT MacOS app**

![Alt text](screenshot.png)

The app embdeds ChatGPT into a desktop app as a webview, removes some branding, and makes the starting screen size smaller. 


### How to use 
- Log into ChatGPT through the app. 
- Start using it

### Implementation
PromptCover is built on top of Electron, React, Tailwinds, and Vite. 

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
**Install the app**
Move the app to Applications folder and run it