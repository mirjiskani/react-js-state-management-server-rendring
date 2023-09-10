import NavigationBar from './NavigationBar';
import Users from './users';
import Products from './products';
import {
    Routes,
    Route,
} from "react-router-dom";
import Home from './home';
export default function App() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/products" element={<Products />}></Route>
            </Routes >
        </>
    )
}