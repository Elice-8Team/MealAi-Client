import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isEditFeedState, isLoggedInState } from "@/recoil/state";
import { feedsApi } from "@/api/feeds";
import { authApi } from "@/api/auth";
import getMealTime from "@/utils/getMealTime";
import { GetFeedsTypes, UserDailyNutrientTypes } from "@/types/feeds/feedsResponseTypes";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import Modal from "@/components/organisms/Modal";
import HorizontalProgressBars from "@/components/atoms/progressBars/HorizontalProgressBars";
import FoodCardViewOnly from "@/components/organisms/FoodCardViewOnly";
import LikeWithCount from "@/components/organisms/LikeWithCount";
import GoalText from "@/components/organisms/GoalText";
import BasicButton from "@/components/atoms/buttons/BasicButton";

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// 로그인 여부 확인
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

	// 피드 수정 여부 확인
	const [isEditFeed, setIsEditFeedState] = useRecoilState(isEditFeedState);

	const handleListButton = () => {
		if (isEditFeed) {
			navigate(-3);
			setIsEditFeedState(false);
		} else {
			navigate(-1);
		}
	};

	// data set
	const [feedDetail, setFeedDetail] = useState<GetFeedsTypes>();
	const [isLike, setIsLike] = useState(false);
	const [likeCount, setLikeCount] = useState<number>();
	const [nutry, setNutry] = useState<UserDailyNutrientTypes>({
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	});
	const usersNutry = {
		kcal: 0,
		carbohydrate: 0,
		protein: 0,
		fat: 0,
	};

	// 데이터 불러오기
	useEffect(() => {
		const getFeed = async () => {
			const data = await feedsApi.getFeedRequest(`/api/feeds/${id}`);

			if (data.status === 200) {
				// 좋아요, 좋아요 수, 피드영양정보 외 데이터는 묶어서 set처리
				setFeedDetail(data.data);
				setIsLike(data.data.my_like); // 좋아요
				setLikeCount(data.data.likes); // 좋아요 수
				setNutry({
					kcal: data.data.kcal,
					carbohydrate: data.data.carbohydrate,
					protein: data.data.protein,
					fat: data.data.fat,
				}); // 피드영양정보
			} else {
				alert(data.response.data.message);
				navigate(-1);
			}
		};
		getFeed();
	}, []);

	// 좋아요버튼
	const toggleLike = async (feedId: number) => {
		if (!isLoggedIn) {
			navigate("../auth/sign-in");
			return;
		}

		if (isLike) {
			setLikeCount(likeCount! - 1);
			setIsLike(false);
		} else {
			setLikeCount(likeCount! + 1);
			setIsLike(true);
		}
		const patchLikes = await feedsApi.updateLikesRequest(`/api/feeds/likes/${feedId}`);

		if (patchLikes.status !== 200) {
			setIsLoggedIn(false);
			navigate("/auth/sign-in");
			alert("다시 로그인 해주세요.");
			await authApi.createLogoutRequest("/api/auth/logout");
			localStorage.clear();
		}
	};

	// 피드 삭제
	const [deleteModal, setDeleteModal] = useState(false);
	const handleDeleteModal = () => setDeleteModal(!deleteModal);

	const handleDeleteFeed = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const data = await feedsApi.deleteFeedRequest(`/api/feeds/${id}`);
		if (data.status === 200) {
			alert("피드가 삭제되었습니다.");
			navigate(-1);
		} else {
			alert("삭제하지 못했습니다. 다시 시도해주세요.");
		}
	};

	return (
		<>
			<div className="flex justify-center gap-36">
				<div className="w-fit">
					<div className="pt-20 mb-10 flex justify-between items-center">
						<h1>
							{feedDetail?.user_name}님의 {getMealTime(feedDetail ? feedDetail.meal_time : "breakfast")}
						</h1>
						<LikeWithCount isLike={isLike} onClick={() => toggleLike(Number(id))} count={likeCount ? likeCount : 0} />
					</div>
					<div className="flex gap-6 mb-10">
						<Thumb src={feedDetail ? feedDetail.image_url : null} size="lg" type="none" />
						<div>
							<div className="flex gap-4 items-center mb-6">
								<p className="text-lg font-bold text-gray-4">{feedDetail?.date}</p>
								<GoalText goal={feedDetail ? feedDetail.goal : "balance"} />
							</div>
							<h4 className="mb-4">영양소 정보</h4>
							<div className="w-96 p-8 border-solid border border-gray-7 rounded-lg">
								<p className="text-sm text-gray-5 mb-6 text-right">일일 영양 섭취량 대비</p>
								<HorizontalProgressBars
									nutry={nutry}
									usersNutry={feedDetail ? feedDetail?.user_daily_nutrient : usersNutry}
								/>
							</div>
						</div>
					</div>
					{feedDetail && feedDetail.foods.length >= 1 && <h4 className="mb-4">상세 식단</h4>}
					<div className="flex flex-wrap w-792 gap-5 items-start">
						{feedDetail &&
							feedDetail.foods.map((v, i) => {
								return (
									<FoodCardViewOnly
										key={v.food_id}
										src={v.image_url}
										size="sm"
										type="none"
										name={v.food_name}
										weight={v.weight}
									/>
								);
							})}
					</div>
					<div className="flex justify-center gap-2 mt-14">
						<BasicButton type="button" onClick={handleListButton} width={false} style="primary">
							목록
						</BasicButton>
						{feedDetail && feedDetail.is_mine && (
							<>
								<BasicButton
									type="button"
									onClick={() => {
										navigate(`/feeds/${id}/edit`);
									}}
									width={false}
									style="bg"
								>
									수정
								</BasicButton>
								<BasicButton type="button" onClick={handleDeleteModal} width={false} style="bg">
									삭제
								</BasicButton>
							</>
						)}
					</div>
				</div>
			</div>

			{deleteModal && (
				<Modal onClose={handleDeleteModal} title="피드 삭제">
					<div className="mb-6">정말 삭제하시겠어요? 삭제 후 되돌릴 수 없습니다.</div>
					<div className="flex justify-center gap-2">
						<BasicButton type="button" onClick={handleDeleteModal} width={false} style="bg">
							취소
						</BasicButton>
						<BasicButton type="button" onClick={handleDeleteFeed} width={false} style="gray">
							삭제
						</BasicButton>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Detail;
