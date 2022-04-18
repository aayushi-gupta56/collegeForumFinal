import React from 'react'
import AdminDashboard from './Pages/adminDashboard';
import ClubDashboard from './Pages/ClubDashboard';
import Main from './Pages/main'
import StudentDashboard from './Pages/studentDashboard';
import Timeline from './Pages/timeline';
import AdminUpdate from './Pages/adminUpdate';
import Error from './Pages/errors/error'
import CreatePost from './Pages/createPost/createPost'
import StudentProfilePage from './Pages/profilePage/studentProfile';
import Calendar from './Pages/Calendar/calendar'
import Messenger from './Pages/Messenger/messenger'
import AdminViewAll from './Pages/AdminTable/adminViewAll';
import SearchPosts from './Pages/searchBars/searchPosts';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const token = sessionStorage.getItem("token");
  let payload;
  if(token)
    payload = JSON.parse(window.atob(token.split('.')[1]));
  else
    payload = null;


  return (
    <div>
      <Router>
        <Routes>


          {/*-----------------------ROUTE TO ADMIN DASHBOARD-----------------------------*/}
          <Route path="/admin/:id" 
            element={payload === null ? <Navigate to="/" replace /> : 
                                        payload.isAdmin===1 ? <AdminDashboard/>:
                                                              <Navigate to='/error' replace/>}/>


          {/*-----------------------ROUTE TO STUDENT DASHBOARD-----------------------------*/}
          <Route path="/student/:id" 
            element={payload === null ? <Navigate to="/" replace /> :
                                        payload.isClub === 1 ? <Navigate to='/error' replace/>:
                                                               <StudentDashboard/>}/>


          {/*-----------------------ROUTE TO CLUB DASHBOARD-----------------------------*/}
          <Route path="/club/:id" 
            element={payload === null ? <Navigate to="/" replace /> :
                                        payload.isClub === 1 ? <ClubDashboard/>:
                                        payload.isAdmin === 1? <ClubDashboard/>:
                                                               <Navigate to='/error' replace/>}/> 


          {/*-----------------------ROUTE TO TIMELINE-----------------------------*/}
          <Route path="/feed/:id" 
            element={payload === null ? <Navigate to="/" replace /> : <Timeline curUser={payload}/>}/>


          {/*-----------------------ROUTE TO LOGIN PAGE-----------------------------*/}
          <Route path="/" 
            element={payload === null ? <Main/> : payload.isClub===1 ? <Navigate to={`/club/${payload.userID}`} replace/> :
                                        payload.isAdmin===1 ? <Navigate to={`/admin/${payload.userID}`} replace/> : 
                                                              <Navigate to={`/student/${payload.userID}`} replace/>}/>


          {/*-----------------------ROUTE TO ERROR PAGE-----------------------------*/}
          <Route path='/error' element={<Error/>}/>


          {/*-----------------------ROUTE TO VIEW DATA PAGE-----------------------------*/}
          <Route path='/admin/find' 
            element={<AdminViewAll/>}/>


          {/*-----------------------ROUTE TO UPDATE DATA PAGE-----------------------------*/}
          <Route path='/admin/find/update/:id' 
            element={<AdminUpdate/>}/>


          {/*-----------------------ROUTE TO CREATE POST PAGE-----------------------------*/}
          <Route path='/feed/create/:id' 
            element={<CreatePost/>}/>


          {/*-----------------------ROUTE TO STUDENT PROFILE PAGE-----------------------------*/}
          <Route path='/stud/profile/:id' 
            element={<StudentProfilePage current={payload}/>}/>


          {/*-----------------------ROUTE TO CALENDAR PAGE-----------------------------*/}
          <Route path='/calendar' 
            element={<Calendar/>}/>

          {/*-----------------------ROUTE TO CREATE POST PAGE-----------------------------*/}
          <Route path='/messenger' element={<Messenger/>}></Route>

          {/*-----------------------ROUTE TO SEARCH POST PAGE-----------------------------*/}
          <Route path='/search/posts' element={<SearchPosts/>}/>

          </Routes>
    </Router>
    </div>
  );
}

export default App;
