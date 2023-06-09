import { atom } from "recoil";

// 로그인 상태
export const isLoggedInState = atom({
	key: "isLoggedInState",
	default: localStorage.getItem("accessToken") ? true : false,
});

// 비밀번호 찾기 시도 후 로그인 화면에서의 toast
export const isPasswordToastState = atom({
	key: "isPasswordToastState",
	default: false,
});

export const imagePreviewState = atom({
	key: "imagePreviewState",
	default: "url",
});

// 피드 수정 완료 후 목록 버튼 분기를 위한 상태 관리
export const isEditFeedState = atom({
	key: "isEditFeedState",
	default: false,
});
