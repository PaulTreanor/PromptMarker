module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json" 
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off" // React is always in Scope when using JSX with React 17
    }

    
}
