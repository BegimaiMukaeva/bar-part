import { Route, Routes } from 'react-router-dom';
import Auth from "./pages/Auth";
import OrdersPage from "./pages/OrdersPage";
import ProfileBaristaPage from './pages/ProfileBaristaPage';
import MenuPage from './pages/MenuPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element = {<Auth/>}/>
                <Route path='/all-orders' element = {<OrdersPage/>}/>
                <Route path='/menu' element={<MenuPage/>}/>
                <Route path='/profile-page' element = {<ProfileBaristaPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
