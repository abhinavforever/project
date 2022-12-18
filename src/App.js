import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
// import { BrowserRouter } from "react-router-dom";
import NewsComponents from './components/NewsComponents';
// import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {

    return (
      <div>
        <Navbar title="NewsChamps" aboutText="About Us"/>

        <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route exact path="/" element={<NewsComponents key="general" country="in" category="general" />} />
        <Route exact path="/business" element={<NewsComponents key="business" country="in" category="business" />} />
        <Route exact path="/entertainment" element={<NewsComponents key="entertainment" country="in" category="entertainment" />} />
        <Route exact path="/general" element={<NewsComponents key="general" country="in" category="general" />} />
        <Route exact path="/health" element={<NewsComponents key="health" country="in" category="health" />} />
        <Route exact path="/science" element={<NewsComponents key="science" country="in" category="science" />} />
        <Route exact path="/sports" element={<NewsComponents key="sports" country="in" category="sports" />} />
        <Route exact path="/technology" element={<NewsComponents key="technology" country="in" category="technology" />} />

        
        </Routes>
      </div>

  
    )
  }
}

