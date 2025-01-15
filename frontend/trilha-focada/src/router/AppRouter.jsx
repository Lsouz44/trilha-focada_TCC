// router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Welcome } from '../pages/Welcome';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { NewActivity } from '../pages/NewActivity';
import { EditActivity } from '../pages/EditActivity';
import { SendInvite } from '../pages/SendInvite';
import { Profile } from '../pages/Profile';
import { Settings } from '../pages/Settings';
import { Companion } from '../pages/Companion';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-activity" element={<NewActivity />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
        <Route path="/send-invite" element={<SendInvite />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </Router>
  )
}