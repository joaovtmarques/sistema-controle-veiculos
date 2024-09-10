import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthRoutes } from './auth.routes';
import {
	Home,
	Login,
	HomeAdmin,
	Vehicles,
	Stamps,
	ApproveStamp,
} from '../pages';

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path="*" element={<NotFound />} /> */}
				<Route path="" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/controle-veiculos" element={<Home />} />
				<Route path="/admin/login" element={<Login />} />
				<Route
					path="/admin"
					element={
						<AuthRoutes>
							<HomeAdmin />
						</AuthRoutes>
					}
				/>
				<Route
					path="/admin/vehicles"
					element={
						<AuthRoutes>
							<Vehicles />
						</AuthRoutes>
					}
				/>
				<Route
					path="/admin/stamps"
					element={
						<AuthRoutes>
							<Stamps />
						</AuthRoutes>
					}
				/>
				<Route
					path="/admin/approve-stamp"
					element={
						<AuthRoutes>
							<ApproveStamp />
						</AuthRoutes>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
