import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Copyrights from "../Copyrights/Copyrights";

import { BrowserRouter } from 'react-router-dom';
import Routing from '../Routing/Routing';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <Header />
                </header>
              
                <main>
                    <Routing />
                </main>
                <footer>
                    <Copyrights />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
