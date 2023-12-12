import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home'
import { Root } from './Root';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { Lobbies } from './pages/Lobbies';
import { ProtectedLogin } from './components/routes/ProtectedLogin';
import { Play } from './pages/Play';
import { GamePvE } from './pages/GamePvE';
import { RoomsValidator } from './components/RoomsValidator';
import { GamePvP } from './pages/GamePvP';
import { Register } from './pages/Register';

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<ProtectedLogin><Login /></ProtectedLogin>} />
				<Route path='register' element={<Register />} />
				<Route path='profile' element={<ProtectedRoute><Login /></ProtectedRoute>} />
				<Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
				<Route path='play' element={<ProtectedRoute><Play /></ProtectedRoute>} />
				<Route path='lobbies' element={<ProtectedRoute><Lobbies /></ProtectedRoute>} />
				<Route path='game' element={<GamePvE />} />
				<Route path='game/:roomId' element={<ProtectedRoute><RoomsValidator><GamePvP /></RoomsValidator></ProtectedRoute>} />
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
