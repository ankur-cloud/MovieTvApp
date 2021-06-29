import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';
import './App.css';
import Header from './components/Header'
import SimpleBottomNavigation from './components/Nav'
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Tv from './Pages/Tv/Tv';
import Search from './Pages/Search/Search';

function App() {
  return (<>

    <BrowserRouter>

      <Header />

      <div className="App">
        <Container maxWidth>
          <Switch>
            <Route exact path="/" component={Trending} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/tv" component={Tv} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </Container>


      </div>
      <SimpleBottomNavigation />

    </BrowserRouter>

  </>);
}

export default App;
