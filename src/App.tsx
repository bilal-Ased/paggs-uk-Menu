// App.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Customers from './pages/Customers/Customers';
import Bookings from './pages/Bookings/Bookings';
import Menu from './pages/Menu/Menu';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Calendar from './pages/Calendar';
import AllBookings from './pages/Bookings/AllBookings';
import Settings from './pages/Settings';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Profile from './pages/Profile';
import AvailableTables from './pages/Bookings/AvailableTables';
import Checkout from './pages/Stripe/Checkout';
import Users from './pages/Users/Users';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from './components/Stripe';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      {/* <Stripe stripePromise={stripePromise} /> */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/stripe" element={<Checkout />} />


        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<ECommerce />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="forms/form-elements" element={<FormElements />} />
            <Route path="forms/form-layout" element={<FormLayout />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/bookings/list" element={<AllBookings />} />
            <Route path="/bookings/tables" element={<AvailableTables />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />

          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
