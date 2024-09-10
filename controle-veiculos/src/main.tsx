import React from 'react';
import ReactDOM from 'react-dom/client';

import './global/styles.css';

import { AppRoutes } from './routes';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	</React.StrictMode>,
);
