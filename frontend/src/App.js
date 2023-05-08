import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './components/Main';
import Options from './components/options';

const App = () => (
  <div>
    <BrowserRouter>
    <Routes>
      <Route index element={<Main />} />
      <Route path='/Options' element={<Options />}/>
    </Routes>
    </BrowserRouter>
  </div>
);

export default App;