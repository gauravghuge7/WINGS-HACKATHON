/* eslint-disable no-unused-vars */
import Spline from '@splinetool/react-spline';
import LandingPage from '../LandingPage/LandingPage';
import FAQPage from './../../Components/FAQ/FAQ';
import TrendingEvents from '../TrendingEvents/TrendingEvents';


import GlobalBrands from '../GlobalBrands/GlobalBrands';

import MovingCards from '../MovingCards/MovingCards';
import ShowOf from '../ShowOf/ShowOf';




const Landing = () => {
   return (
      <div>

         <ShowOf />

         <LandingPage />

         
         <MovingCards />
         <TrendingEvents />
         <GlobalBrands />
         <FAQPage />
      </div>
   );
}

export default Landing;