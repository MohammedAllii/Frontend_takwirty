import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TerrainForm from './components/TerrainForm';
import Details from './pages/proprietaire/DetailsTerrain';
import Reservation from './pages/proprietaire/Reservation';
import AdminHome from '../src/Admin/home/Home';
import AdminUser from '../src/Admin/home/User';
import AdminProp from '../src/Admin/home/Propriétaire';
import AdminTerrain from '../src/Admin/home/Terrain';
import AdminApp from '../src/AdminApp';

// Separate layout for the page without the standard header and footer
const HomeLayout = ({ children }) => <>{children}</>;
const LoginLayout = ({ children }) => <>{children}</>;
const UserLayout = ({ children }) => <>{children}</>;
const PropLayout = ({ children }) => <>{children}</>;
const TerrainLayout = ({ children }) => <>{children}</>;

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={
                  <LoginLayout>
                    <Header />
                    <Dashboard />
                  </LoginLayout>} />
            <Route  path='/login'
              element={
                <LoginLayout>
                  <Header />
                  <Login />
                </LoginLayout>
              } />
            <Route path='/register' element={
                <LoginLayout>
                  <Header />
                  <Register />
                </LoginLayout>} />
            <Route path='/add' element={
              <LoginLayout>
              <Header />
                  <TerrainForm />
            </LoginLayout>} />
            <Route path='/profile' element={
            <LoginLayout>
            <Header />
            <Profile />
          </LoginLayout>
            } />
            <Route path='/reservation' element={
            <LoginLayout>
            <Header />
            <Reservation />
          </LoginLayout>
            } />
            <Route path='/details/:id' element={<LoginLayout>
                  <Header />
                  <Details />
                </LoginLayout>} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route
              path='/home'
              element={
                <UserLayout>
                  <AdminHome />
                </UserLayout>
              }/>
              <Route
              path='/user'
              element={
                <HomeLayout>
                  <AdminUser />
                </HomeLayout>
              }/>
              <Route
              path='/prop'
              element={
                <PropLayout>
                  <AdminProp />
                </PropLayout>
              }/>
              <Route
              path='/terrain'
              element={
                <TerrainLayout>
                  <AdminTerrain />
                </TerrainLayout>
              }/>
          </Routes>
          <br />
          <hr />
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
