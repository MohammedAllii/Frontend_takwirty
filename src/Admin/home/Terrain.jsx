
import "./home.scss";
import Sidebar from '../sidebar/Sidebar';
import TerrainsList from '../views/Terrain/TerrainList';

const Terrain = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div >
        <TerrainsList />
     
        </div>
      
        
        

      </div>
    </div>
  );
};

export default Terrain;
