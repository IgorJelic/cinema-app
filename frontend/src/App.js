import { Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="content">
      <Navbar/>
        <div className="container">
          <Outlet/>  
        </div>  
        <Footer/>
        <ToastContainer
          position="bottom-right"
          autoClose={1700}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          theme="light"
          transition={Zoom}
        />
    </div>
  );
}

export default App;
