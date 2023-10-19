import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import './App.css'


function App() {
  // const [authToken] = authStore((state)=>[state.token]);
  return (
   
      <div className='dark:bg-dark'>
        <MainRoutes/>
      </div>
  
  );
}

export default App;
