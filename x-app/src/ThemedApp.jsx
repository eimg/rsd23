import { createContext, useMemo, useState } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";

export const ThemeContext = createContext();
export const AuthContext = createContext();

export default function ThemedApp() {
	const [mode, setMode] = useState("dark");
	const [auth, setAuth] = useState(false);
	const [authUser, setAuthUser] = useState({});

	const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

	return (
		<AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
			<ThemeContext.Provider value={{ mode, setMode }}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</ThemeContext.Provider>
		</AuthContext.Provider>
	);
}
