import React, { Component } from 'react';
import Planche from './Planche'

class App extends Component {
  render() {
    return (
        <div className="App">
            <Planche />
            <header className="App-header">
                <p>
                    Alex Toussaint,  2019
                </p>
            </header>
        </div>
    );
  }
}

export default App;
