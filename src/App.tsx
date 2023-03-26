import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import NewsPage from './components/NewsPage/NewsPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import NotFoundPage from './components/notFoundPage/NotFoundPage';

const App = () => (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<MainPage />} />
        <Route path={'news/:id'} element={<NewsPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
);

export default App;
