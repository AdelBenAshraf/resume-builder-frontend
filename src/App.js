import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import CreateResume from './components/frontend/CreateResume';
import ShowResume from './components/frontend/ShowResume';
import ListResumes from './components/frontend/ListResumes';
import EditResume from './components/frontend/EditResume';
import PrivateRoute from './components/frontend/PrivateRoute';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}`: '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/create-resume" element={<CreateResume />} />
            <Route exact path="/show-resume/:id" element={<ShowResume />} />
            <Route exact path="/list-resumes" element={<ListResumes />} />
            <Route exact path="/edit-resume/:id" element={<EditResume />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
