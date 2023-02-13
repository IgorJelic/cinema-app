import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './User/Home';
import AdminLayout from './Admin/AdminLayout';
import { LAYOUT_TYPE } from './API/Common';
import Login from './User/Login';
import Register from './User/Register';
import Reservation from './User/Reservation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route element={<App/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/genres' element={<AdminLayout key={1} data={LAYOUT_TYPE.genres}/>}/>
        <Route path='/movies' element={<AdminLayout key={2} data={LAYOUT_TYPE.movies}/>}/>
        <Route path='/screenings' element={<AdminLayout key={3} data={LAYOUT_TYPE.movieScreenings}/>}/>
        <Route path='/reservation/:screeningId' element={<Reservation />}/>
      </Route>
    </Routes>
  </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
