import { StrictMode } from 'react'; // Import React's StrictMode for highlighting potential issues
import { createRoot } from 'react-dom/client'; // Import ReactDOM to render the app
import App from './App.jsx'; // Import main App component
import './index.css'; // Import global styles

// Render the App component inside the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);