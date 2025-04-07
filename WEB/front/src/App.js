import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Signup from './entry/signup.jsx'
import Login from './entry/login.jsx'
import Reset from './entry/reset.jsx'
import Shome from './entry/studenthome.jsx'
import Lcard from './entry/librarycard.jsx'
import Apply from './entry/applyroom.jsx'
import Logout from './entry/logout.jsx'
import BookHistory from './entry/bookhistory.jsx'
import ReturnDue from './entry/returndue.jsx'
import BookSearch from './entry/booksearch.jsx'



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route path='/studenthome' element={<Shome/>}/>
      <Route path='/librarycard' element={<Lcard/>}/>
      <Route path='/applyroom' element={<Apply/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/bookhistory' element={<BookHistory/>}/>
      <Route path='/returndue' element={<ReturnDue/>}/>
      <Route path='/booksearch' element={<BookSearch/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
