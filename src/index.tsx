import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';

const root = createRoot(document.getElementById('root')!);

const App = () => {

    const name = 'World';

    return (<h1>Hello, {name}!</h1>);

};

root.render(<App />);
