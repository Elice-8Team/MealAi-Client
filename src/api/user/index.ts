import { axiosHandler } from "@/utils/axios.utils";
import { ChangePasswordTypes, CheckPasswordType, EditUserInfoTypes } from "@/types/user/userTypes";

/**
 * user apis
 * 사용자 조회 및 업데이트, 삭제를 담당하는 api 객체
 */
export const userApi = Object.freeze({
	async getUserInfoRequest(endPoint: string) {
		const response = axiosHandler.get(endPoint);
		return response;
	},
	async updatePasswordRequest(endPoint: string, params: ChangePasswordTypes) {
		try {
			const response = await axiosHandler.patch(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async createCheckPasswordRequest(endPoint: string, params: CheckPasswordType) {
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async updateUserInfoRequest(endPoint: string, params: EditUserInfoTypes) {
		try {
			const response = await axiosHandler.patch(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async deleteUserRequest(endPoint: string) {
		const response = axiosHandler.delete(endPoint);
		return response;
	},
});
