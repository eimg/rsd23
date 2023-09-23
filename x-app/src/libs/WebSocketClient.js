import { getToken } from "./fetcher";

const wsc = new WebSocket(import.meta.env.VITE_WS_URL);
wsc.onopen = () => {
	wsc.send(getToken());
};

// TODO: Custom hook
export default function useWebSocket() {
	return wsc;
}
