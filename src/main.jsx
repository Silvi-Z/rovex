import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Import order matters: ES imports are evaluated top to bottom, and the
// bundler emits CSS in that order. The global layers must come before App,
// otherwise the component stylesheets land ahead of the base rules and
// equal-specificity selectors (e.g. `.btn` vs `.nav__cta`) resolve wrongly.
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
