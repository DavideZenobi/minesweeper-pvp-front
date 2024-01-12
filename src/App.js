import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
//import { Login } from './pages/Login';
//import { Home } from './pages/Home'
//import { Root } from './Root';
//import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { Lobbies } from './pages/Lobbies';
//import { ProtectedLogin } from './components/routes/ProtectedLogin';
import { ProtectedLogin } from './v2/middlewares/ProtectedLogin';
import { ProtectedRoute } from './v2/middlewares/ProtectedRoute';
import { Play } from './pages/Play';
//import { GamePvE } from './pages/GamePvE';
import { RoomsValidator } from './components/RoomsValidator';
//import { GamePvP } from './pages/GamePvP';
import { GamePvP } from './v2/pages/GamePvP';
//import { Register } from './pages/Register';
import { Login } from './v2/pages/Login';
import { Register } from './v2/pages/Register';
import { Home } from './v2/pages/Home';
import { Root } from './v2/Root';
import { TopBar } from './v2/components/TopBar';
import { GamePvE } from './v2/pages/GamePvE';
import { Profile } from './v2/pages/Profile';
import { MatchValidator } from './v2/components/MatchValidator';
import { AccountCreated } from './v2/pages/AccountCreated';

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<ProtectedLogin><Login /></ProtectedLogin>} />
				<Route path='register' element={<Register />} />
				<Route path='accountcreated' element={<AccountCreated />} />
				<Route path='*' element={<ProtectedRoute />} >
					<Route element={<TopBar />} >
						<Route path='home' element={<Home />} />
						<Route path='profile' element={<Profile />} />
						<Route path='game' element={<GamePvE />} />
						<Route path='game/:matchId' element={<MatchValidator><GamePvP /></MatchValidator>} />
						<Route path='test' element={<h2>TEST</h2>} />
					</Route>
				</Route>
			</Route>
		)
	);

  	return (
    	<>
			<RouterProvider router={router}>

			</RouterProvider>
    	</>
  	);
}

export default App;
