import { ChangeEvent, useState } from "react";
import Thumb from "@/components/atoms/thumbnail/Thumbnail";
import TempImage from "@/assets/temp_image.jpg"; // TODO : 실제 데이터 연동 후 지우기

const Feeds = () => {
	// 좋아요버튼
	const [isLike, setIsLike] = useState(false);

	// 최신순, 인기순 클릭시 색상 변경
	const [clickNewest, setClickNewest] = useState(true);
	const [clickPopularity, setClickPopularity] = useState(false);

	// 목표 검색 카테고리
	const [isGoal, setIsGoal] = useState("");

	function handleGoal(e: ChangeEvent<HTMLSelectElement>) {
		setIsGoal(e.target.value);
	}

	return (
		<div className="flex flex-col items-center mt-20">
			<h1 className="mb-14">식단톡</h1>
			<div className="w-1200 h-80 mb-14 bg-bg-1 rounded-2xl flex justify-center items-center">
				<div className="flex items-center gap-67">
					<div>
						<div className="flex gap-3 mb-4">
							<h2 className="text-gray-1">인기 랭킹</h2>
							<h2 className="text-primary-1">TOP 3</h2>
						</div>
						<p className="text-gray-1 text-xl">가장 많은 💛를 받은 인기 식단이에요!</p>
					</div>
					{/* TODO : API 명세 받은 후 map함수 돌려서 상위 3개 적용 */}
					<div className="flex gap-6">
						<Thumb
							src={TempImage}
							id={1}
							size="md"
							type="like"
							isLike={isLike}
							onClick={() => {
								setIsLike(!isLike);
							}}
						/>
						<Thumb
							src={TempImage}
							id={1}
							size="md"
							type="like"
							isLike={isLike}
							onClick={() => {
								setIsLike(!isLike);
							}}
						/>
						<Thumb
							src={TempImage}
							id={1}
							size="md"
							type="like"
							isLike={isLike}
							onClick={() => {
								setIsLike(!isLike);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-between w-1200 items-center">
				<h4 className="mr-771">식단 피드</h4>
				<div className="flex gap-6">
					<button
						className={`text-gray-5 font-bold ${clickNewest ? "text-primary-1" : ""}`}
						onClick={() => {
							setClickNewest(true);
							setClickPopularity(false);
						}}
					>
						최신순
					</button>
					<p>|</p>
					<button
						className={`text-gray-5 font-bold ${clickPopularity ? "text-primary-1" : ""}`}
						onClick={() => {
							setClickPopularity(true);
							setClickNewest(false);
						}}
					>
						인기순
					</button>
				</div>
				<>
					<select className="select select-bordered max-w-xs ml-9" onChange={handleGoal}>
						<option disabled selected>
							목표 검색
						</option>
						<option value="balance">균형잡힌 식단</option>
						<option value="diet">다이어트</option>
						<option value="muscle">근력보강</option>
						<option value="lchf">키토제닉</option>
					</select>
				</>
			</div>
			<div className="flex flex-wrap w-1200 mt-8 gap-6">
				{/* TODO : API 명세 받은 후 map함수 적용 */}
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>{" "}
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>
				<Thumb
					src={TempImage}
					id={1}
					size="md"
					type="like"
					isLike={isLike}
					onClick={() => {
						setIsLike(!isLike);
					}}
				/>
			</div>
		</div>
	);
};

export default Feeds;