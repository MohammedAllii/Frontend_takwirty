
import "./home.scss";
import Sidebar from '../sidebar/Sidebar';
import PriosList from '../views/Prios/PriosList';

const Propriétaire = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div >
        <PriosList />
     
        </div>
      
        
        

      </div>
    </div>
  );
};

export default Propriétaire;
