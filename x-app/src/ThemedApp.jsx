import { createContext, useMemo, useState, useEffect } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink, grey } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import App from "./App";
import { fetchNotis, fetchVerify, getToken } from "./libs/fetcher";

export const ThemeContext = createContext();
export const AuthContext = createContext();
export const UIContext = createContext();
export const NotiContext = createContext();

import useWebSocket from "./libs/WebSocketClient";

export default function ThemedApp() {
	const navigate = useNavigate();

	const [mode, setMode] = useState("dark");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackMessage, setSnackMessage] = useState("Action completed");
	const [notiCount, setNotiCount] = useState(0);

	const [auth, setAuth] = useState(false);
	const [authUser, setAuthUser] = useState({});

	useEffect(() => {
		const wsc = useWebSocket();
		wsc.addEventListener("message", e => {
			const msg = JSON.parse(e.data);
			if(msg.type === "notis") {
				setNotiCount(msg.count);
			}
		});

		(async () => {
			const notis = await fetchNotis();
			setNotiCount(notis.filter(noti => !noti.read).length);
		})();

		(async () => {
			const user = await fetchVerify();
			if(!user) return navigate("/login");

			user.following = user.following || [];
			user.followers = user.followers || [];

			if (user) {
				setAuth(true);
				setAuthUser(user);
			}
		})();
	}, []);

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
				...(mode === "light"
					? {
							banner: {
								background: grey[300],
							},
							appbar: {
								background: pink[500],
							},
							text: {
								fade: grey[500],
							},
					  }
					: {
							banner: {
								background: grey[900],
							},
							appbar: {
								background: "#111",
							},
							text: {
								fade: grey[700],
							},
					  }),
			},
		});
	}, [mode]);

	return (
		<AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
			<ThemeContext.Provider value={{ mode, setMode }}>
				<ThemeProvider theme={theme}>
					<UIContext.Provider
						value={{
							snackbarOpen,
							setSnackbarOpen,
							snackMessage,
							setSnackMessage,
						}}>
						<NotiContext.Provider
							value={{ notiCount, setNotiCount }}>
							<CssBaseline />
							<App />
						</NotiContext.Provider>
					</UIContext.Provider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</AuthContext.Provider>
	);
}
