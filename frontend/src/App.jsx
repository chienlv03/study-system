// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./component/Header";
import ClassList from "./component/ClassList";
import ListUser from "./component/user/ListUser";
import SidebarClass from "./component/sidebar/SidebarClass";
import AddClassForm from "./component/teacherComponent/AddClassForm";
import Home from "./component/Home";
import SignUpForm from "./component/authComponent/SignUpForm";
import LoginForm from "./component/authComponent/LoginForm";
import Attendance from "./component/teacherComponent/attendance/Attendance";
import ChangePassword from './component/authComponent/ChangePassword';
import SidebarAuth from './component/authComponent/SidebarAuth';
import Profile from './component/authComponent/Profile';
import Score from './component/teacherComponent/Score';
import InfoUser from './component/studentComponent/InfoUser';
import LearnOutcomes from './component/studentComponent/LearnOutcomes';
import Assignment from './component/assignment/Assignment';
import AssignmentForm from './component/formAssignment/AssignmentForm';
import Submission from './component/submisstion/Submission';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <main>
      <SidebarClass />
      {children}
    </main>
  );
}

// eslint-disable-next-line react/prop-types
function Layout2({ children }) {
  return (
    <main>
      <SidebarAuth />
      {children}
    </main>
  );
}

const isAuthenticated = () => {
  return !!JSON.parse(localStorage.getItem('loginResponse'));
};

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    return <Navigate to="/sign-in" />;

  } else return children;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/class-list"
          element={
            <ProtectedRoute>
              <ClassList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail-class/:id/list-student"
          element={
            <ProtectedRoute>
              <Layout>
                <ListUser />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail-class/:id/score"
          element={
            <ProtectedRoute>
              <Layout>
                <Score />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail-class/:id/attendances"
          element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="change-password"
          element={
            <ProtectedRoute>
              <Layout2>
                <ChangePassword />
              </Layout2>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Layout2>
                <Profile />
              </Layout2>
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-class/:id/info-user"
          element={
            <ProtectedRoute>
              <Layout>
                <InfoUser />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-class/:id/assignment"
          element={
            <ProtectedRoute>
              <Layout>
                <Assignment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-class/:id/assignment-form"
          element={
            <ProtectedRoute>
              <Layout>
                <AssignmentForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-class/:id/submission"
          element={
            <ProtectedRoute>
              <Layout>
                <Submission />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/add-class-form" element={<ProtectedRoute><AddClassForm /></ProtectedRoute>} />
        <Route path="/learn-outcomes" element={<ProtectedRoute><LearnOutcomes /></ProtectedRoute>} />
        <Route path="/edit-class-form/:id" element={<ProtectedRoute><AddClassForm /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;