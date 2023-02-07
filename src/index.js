import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css'

const root = createRoot(document.getElementById('root'));

const App = () => {
    return (<h1>Hello, world!</h1>)
}

root.render(<App />);