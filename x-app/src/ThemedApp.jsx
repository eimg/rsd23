import { createContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";

export const ThemeContext = createContext();

export default function ThemedApp() {
	const [ mode, setMode ] = useState("dark");

	const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
