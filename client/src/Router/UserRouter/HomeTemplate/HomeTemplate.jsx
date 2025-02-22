
import { Outlet } from 'react-router-dom';
import HomeNavbar from '../../../Home/HomeNavbar/HomeNavbar';
import Footer from '../../../Home/Footer/Footer';

const HomeTemplate = () => {


   return (
      <div>


         <header className=''>
            <HomeNavbar />
         </header>

         <main className='mt-20'>
      
            <Outlet />
         </main>
         
         <footer>
            <Footer />
         </footer>
      </div>
   );
}

export default HomeTemplate;
