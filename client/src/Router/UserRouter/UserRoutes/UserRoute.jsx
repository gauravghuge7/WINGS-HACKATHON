/* eslint-disable no-irregular-whitespace */
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeTemplate from "../HomeTemplate/HomeTemplate";
import LoginProtection from "./AdminLoginProtection/LoginProtection";
import AdminLoginProtection from "./AdminLoginProtection/AdminLoginProtection";
import UserProtection from "../UserProtection/UserProtection";
import NotFound from "../../../components/NotFound/NotFound";
// import UserBookMarkEvents from "../../../User/UserBookMarkEvents/UserBookMarkEvents";
// import UserLikedEvents from "../../../User/UserLikedEvents/UserLikedEvents";
import MyEvents from "../../../User/UserEvents/MyEvents";

// Lazy load components to reduce the initial bundle size
const Landing = lazy(() => import("../../../Home/Landing/Landing"));
const Feature = lazy(() => import("../../../components/Feature/Feature"));
const AboutUs = lazy(() => import("../../../Home/About/About"));
const PrivacyPolicy = lazy(() => import("../../../components/PrivacyPolicy/PrivecyPolicy"));
const TermsAndConditions = lazy(() => import("../../../components/TermsAndConditions/TermsAndConditions"));
const EventMarketers = lazy(() => import("../../../Components/EventMarketer/EventMarketer"));
const Documentation = lazy(() => import("../../../components/Documentation/Documentation"));
const ContactUs = lazy(() => import("../../../components/ContactUs/ContactUs"));
const ShowEvent = lazy(() => import("../../../components/ShowEvents/ShowEvent"));
const UserLogin = lazy(() => import("../../../User/UserLogin/UserLogin"));
const UserSignup = lazy(() => import("../../../User/UserSignup/UserSignup"));
const AdminLogin = lazy(() => import("../../../Admin/AdminLogin/AdminLogin"));
const AdminSignup = lazy(() => import("../../../Admin/AdminSignUp/AdminSignUp"));

// Protected User Components
const UserProfile = lazy(() => import("../../../User/UserProfile/UserProfile"));
const CreateEvent = lazy(() => import("../../../User/CreateEvent/CreateEvent"));
const UserEvent = lazy(() => import("../../../User/UserEvents/UserEvent"));
const Userdashboard = lazy(() => import("../../../User/Userdashboard/Userdashboard"));
const EventForm = lazy(() => import("../../../User/EventForm/EventForm"));
const ShowSingleEvent = lazy(() => import("../../../Components/ShowEvent/ShowSingleEvent"));
const EditEvent = lazy(() => import("../../../User/EditEvent/EditEventForm"));

const UserRoute = () => {




  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <Routes>

        {/* Unprotected User Routes */}
        <Route path="/" element={<HomeTemplate />}>

          <Route index element={<Landing />} />
          <Route path="features" element={<Feature />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsAndConditions />} />
          <Route path="eventmarketer" element={<EventMarketers />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="latestEvents" element={<ShowEvent />} />
          <Route path="showevent" element={<ShowEvent />} />

          {/* Authentication */}
          <Route path="userLogin" element={<UserLogin />} />
          <Route path="userSignup" element={<UserSignup />} />



          {/* Protected User Routes */}
          <Route path="/user" element={<UserProtection />}>
            
            <Route index element={<UserProfile />} />
            <Route path="event/:id" element={<ShowSingleEvent />} />
            <Route path="event/edit/:id" element={<EditEvent />} />


            <Route path="userProfile" element={<UserProfile />} />
            <Route path="userDashboard" element={<Userdashboard />} />
            <Route path="myEvents" element={<MyEvents />} />

            
            <Route path="UserEvent" element={<UserEvent />} />
            <Route path="CreateEvent" element={<CreateEvent />} />
            <Route path="EventForm" element={<EventForm />} />

            {/* <Route path="event/bookmarked" element={<UserBookMarkEvents />} /> */}
            {/* <Route path="event/liked" element={<UserLikedEvents />} /> */}
          
          </Route>

        </Route>



        {/*  extra Protection for the admin */}
        <Route path="/adminCheckout" element={<LoginProtection />} />
        <Route path="/" element={<AdminLoginProtection />}>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
        </Route>


       

        {/* Catch-All 404 Route */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Suspense>
  );
};

export default UserRoute;
