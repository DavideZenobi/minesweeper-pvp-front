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
import { Multiplayer } from './v2/pages/Multiplayer';
import { Root } from './v2/Root';
import { TopBar } from './v2/components/TopBar';
import { GamePvE } from './v2/pages/GamePvE';
import { Profile } from './v2/pages/Profile';
import { MatchValidator } from './v2/components/MatchValidator';
import { AccountConfirmed } from './v2/pages/AccountConfirmed';
import { History } from './v2/pages/History';
import { HistoryMatch } from './v2/pages/HistoryMatch';
import { RootV2 } from './v2/components/RootV2';
import { Index } from './v2/pages/Index';
import { GamePvEOffline } from './v2/pages/GamePvEOffline';

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<ProtectedLogin><Login /></ProtectedLogin>} />
				<Route path='register' element={<Register />} />
				<Route path='confirm/:uuid' element={<AccountConfirmed />} />
				<Route path='*' element={<ProtectedRoute />} >
					<Route element={<TopBar />} >
						<Route path='multiplayer' element={<Multiplayer />} />
						<Route path='profile' element={<Profile />} />
						<Route path='history' element={<History />} />
						<Route path='history/:matchId' element={<HistoryMatch />} />
						<Route path='game' element={<GamePvE />} />
						<Route path='game/:matchId' element={<MatchValidator><GamePvP /></MatchValidator>} />
						<Route path='test' element={<h2>TEST</h2>} />
					</Route>
				</Route>
			</Route>
		)
	);

	const routerV2 = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootV2 />}>
				<Route index element={<GamePvEOffline />} />
				<Route path='gameoffline' element={<GamePvEOffline />} />
				<Route path='login' element={<ProtectedLogin><Login /></ProtectedLogin>} />
				<Route path='register' element={<Register />} />
				<Route path='confirm/:uuid' element={<AccountConfirmed />} />
				<Route path='404' element={<div className='flex justify-center items-center w-full'><h2 className='text-slate-300 text-3xl'>Error code: 404 - Page not found</h2></div>} />
				<Route path='*' element={<ProtectedRoute />} >
					<Route path='multiplayer' element={<Multiplayer />} />
					<Route path='history' element={<History />} />
					<Route path='history/:matchId' element={<HistoryMatch />} />
					<Route path='game/:matchId' element={<MatchValidator><GamePvP /></MatchValidator>} />
				</Route>
			</Route>
		)
	);

  	return (
    	<>
			<RouterProvider router={routerV2}>

			</RouterProvider>
    	</>
  	);
}

export default App;
