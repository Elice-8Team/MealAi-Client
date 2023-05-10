import axios from "axios";
import { authApi } from "@/api/auth";
import { API_ENDPOINT } from "@/config/constants";

const axiosOptions = {
	baseURL: API_ENDPOINT,
	withCredentials: true,

	headers: {
		"Content-Type": "application/json",
	},
	timeout: 3000, //  3초 지나면 요청 중단, 임의로 해놨어요
};

const axiosHandler = axios.create(axiosOptions);

axiosHandler.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		if (localStorage.getItem("accessToken")) {
			config.headers["authorization-"] = `Bearer ${localStorage.getItem("accessToken")}`;
		}
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		return Promise.reject(error);
	}
);

axiosHandler.interceptors.response.use(
	function (res) {
		return res;
	},
	async function (error) {
		const originalConfig = error.config;
		const code = error.response.data.error_code;

		if (code === 2002 || code === 2004 || code === 2005 || code === 2006) {
			alert("토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요🤗");
			localStorage.clear();
			if (window !== undefined) {
				location.href = "/auth/sign-in";
			}
			return;
		}

		if (code === 2001 || code === 2003 || code === 2007) {
			const currentRefreshToken = await localStorage.getItem("refreshToken");

			const data = await authApi.authRefreshRequest("/api/auth/refresh", {
				refresh_token: currentRefreshToken!,
			});

			localStorage.setItem("accessToken", data.data.access_token);
			localStorage.setItem("refreshToken", data.data.refresh_token);
			axiosHandler.defaults.headers.common["authorization-"] = `Bearer ${localStorage.getItem("accessToken")}`;

			return axiosHandler(originalConfig);
		}

		return Promise.reject(error);
	}
);

export { axiosHandler, axios, API_ENDPOINT };
