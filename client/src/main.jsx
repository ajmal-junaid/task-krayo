import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './components/ErrorPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage/>}>
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
