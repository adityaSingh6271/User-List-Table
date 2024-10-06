import "./App.css";
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <UserList />
    </div>
  );
}

export default App;
