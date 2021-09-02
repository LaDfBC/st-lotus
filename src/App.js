import React from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import Routes from './routes';
import {createTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Topbar from './Topbar';
import {ThemeProvider} from '@material-ui/core';

const theme = responsiveFontSizes(createTheme({}));
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Topbar/>
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
