import { axiosHandler } from "@/utils/axios.utils";
import { EditFeedTypes, GetFeedsParamsTypes, PostSearchFoodTypes } from "@/types/feeds/feedsRequestTypes";

/**
 * feeds apis
 * 피드 조회 및 등록, 업데이트, 삭제를 담당하는 api 객체
 */

export const feedsApi = Object.freeze({
	async getFeedsRequest(endPoint: string, params: GetFeedsParamsTypes) {
		try {
			const response = await axiosHandler.get(endPoint, { params });
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async createFeedRequest(endPoint: string, params: any) {
		try {
			const response = await axiosHandler.post(endPoint, params, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async getMyLikesRequest(endPoint: string, params: GetFeedsParamsTypes) {
		try {
			const response = await axiosHandler.get(endPoint, { params });
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async updateLikesRequest(endPoint: string) {
		try {
			const response = await axiosHandler.patch(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async getFeedRequest(endPoint: string) {
		try {
			const response = await axiosHandler.get(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async deleteFeedRequest(endPoint: string) {
		try {
			const response = await axiosHandler.delete(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async updateFeedRequest(endPoint: string, params: EditFeedTypes) {
		try {
			const response = await axiosHandler.patch(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async getSearchFoodRequest(endPoint: string) {
		try {
			const response = await axiosHandler.get(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async createSearchFoodRequst(endPoint: string, params: PostSearchFoodTypes) {
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
});
