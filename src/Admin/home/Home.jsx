
import "./home.scss";
import Sidebar from '../sidebar/Sidebar';
import UsersList from '../views/Users/UsersList';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div >
        <UsersList />
     
        </div>
      
        
        

      </div>
    </div>
  );
};

export default Home;
