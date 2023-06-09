import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { imagePreviewState, isLoggedInState } from "@/recoil/state";
import { feedsApi } from "@/api/feeds";
import { PostAiTypes } from "@/types/feeds/feedsRequestTypes";
import { GradientWrapper } from "@/pages/meal-ai/Ai.styles";
import AiRule from "@/components/atoms/aiRule/AiRule";
import BasicButton from "@/components/atoms/buttons/BasicButton";
import TinyButton from "@/components/atoms/buttons/TinyButton";
import AddIcon from "@/assets/icon_add_image.svg";
import InfoIcon from "@/assets/icon_info.svg";

const Ai = () => {
	const navigate = useNavigate();

	// 로그인 여부 확인
	const isLoggedIn = useRecoilValue(isLoggedInState);

	// 썸네일 버튼 클릭시 file input 활성화
	const handleButtonClick = () => {
		const inputFileEl = document.querySelector("#file") as HTMLInputElement;
		if (inputFileEl) inputFileEl.click();
	};

	// useform setting
	const { register, handleSubmit, watch } = useForm<PostAiTypes>({
		defaultValues: {
			date: new Date().toISOString().slice(0, 10),
			meal_time: undefined,
		},
	});

	const preview = watch("file");
	const mealTime = watch("meal_time");

	// button 상태 제어
	const [buttonActivated, setButtonActivated] = useState(true);

	useEffect(() => {
		if (!mealTime || mealTime === "식사 시간 선택" || !preview || preview.length === 0) {
			setButtonActivated(true);
		} else {
			setButtonActivated(false);
		}
	}, [mealTime, preview]);

	// api 통신
	const onSubmit: SubmitHandler<PostAiTypes> = async (data) => {
		// 버튼 상태 조작
		setButtonActivated(true);
		const button = document.querySelector(".button-text");
		button!.innerHTML = "분석 중 ...";

		// file set & api 통신
		const file = Array.from(data.file as ArrayLike<File>);
		const postData = { ...data, file: file[0] };

		const formData = new FormData();
		Object.entries(postData).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const result = await feedsApi.createFeedRequest("/api/feeds", formData);

		if (result.status === 200) {
			sessionStorage.setItem("aiPredictResultId", result.data);
			navigate("/meal-ai/result");
		} else {
			navigate("/meal-ai/fail");
		}
	};

	// thumbnail 미리보기
	const [imagePreview, setImagePreview] = useRecoilState(imagePreviewState);
	useEffect(() => {
		if (preview && preview.length > 0) {
			const file = preview[0];
			setImagePreview(URL.createObjectURL(file));
		}
	}, [preview]);

	return (
		<GradientWrapper>
			<h1 className="text-primary-1 text-center pt-20 mb-10">식단 AI 분석을 시작합니다.</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex item-center justify-center">
					<div>
						<div className="w-96 flex gap-2 mb-4">
							<input id="date" type="date" className="input input-bordered w-1/2 max-w-xs" {...register("date")} />
							<select
								id="meal_time"
								className="select select-bordered w-1/2"
								defaultValue="식사 시간 선택"
								{...register("meal_time")}
							>
								<option disabled>식사 시간 선택</option>
								<option value="breakfast">아침</option>
								<option value="lunch">점심</option>
								<option value="dinner">저녁</option>
								<option value="snack">간식</option>
							</select>
						</div>
						<div className="w-96 h-96 relative overflow-hidden">
							<input
								type="file"
								id="file"
								accept="image/*"
								className="w-96 h-96 absolute cursor-pointer hidden"
								{...register("file")}
							/>
							<div
								className="w-96 h-96 bg-white border border-solid border-primary-2 rounded-lg flex justify-center items-center cursor-pointer"
								onClick={handleButtonClick}
							>
								{preview && preview.length > 0 && (
									<img
										src={imagePreview}
										className="absolute w-96 h-96 object-cover border border-solid border-primary-2 rounded-lg "
									/>
								)}
								<div className="flex flex-col gap-6">
									<div className="flex justify-center">
										<img src={AddIcon} />
									</div>
									<p className="text-sm text-gray-6">식단 사진을 업로드 해주세요.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="ml-6 pt-4">
						<div className="flex justify-end gap-2 h-8 mb-4 ">
							<img src={InfoIcon} width={24} height={24} />
							<p className="text-xl text-gray-1 font-bold text-right mb-4">분석 전 꼭 확인해주세요.</p>
						</div>
						<AiRule />
					</div>
				</div>
				<div className="flex flex-col items-center mt-10">
					<div className="w-96">
						<BasicButton type="submit" width={true} style="primary" deactivated={buttonActivated}>
							<p className="button-text">분석 시작</p>
						</BasicButton>
						{!isLoggedIn && (
							<div className="flex items-center gap-1 mt-6">
								<p className="text-sm text-gray-4">비회원은 분석기록 저장과 커뮤니티 공유를 할 수 없습니다.</p>
								<TinyButton
									type="button"
									onClick={() => {
										navigate("/auth/sign-up");
									}}
									style="gray"
									deactivated={false}
								>
									회원가입
								</TinyButton>
							</div>
						)}
					</div>
				</div>
			</form>
		</GradientWrapper>
	);
};

export default Ai;
