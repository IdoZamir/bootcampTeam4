import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const Application = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
