import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/state";
import { authApi } from "@/api/auth";
import Logo from "@/assets/logo.svg";
import { axiosHandler } from "@/utils/axios.utils";

interface MenuObjProps {
	name: string;
	path: string;
}

const Header = () => {
	const [isLoggedIn, setisLoggedInState] = useRecoilState(isLoggedInState);

	useEffect(() => {
		const isLoggedInValid = !localStorage.getItem("accessToken") ? false : true;
		setisLoggedInState(isLoggedInValid);
	}, [isLoggedIn]);

	const handleLogout = async () => {
		await authApi.createLogoutRequest("/api/auth/logout");
		localStorage.clear();
		setisLoggedInState(false);
	};

	const menuObj: MenuObjProps[] = [
		{
			name: "식단AI분석",
			path: "/meal-ai",
		},
		{
			name: "식단톡",
			path: "/feeds",
		},
	];

	return (
		<div className="flex flex-row w-full h-90 gap-12 items-center bg-white border-solid border-b border-gray-7 z-50 fixed top-0">
			<div className="ml-20">
				<Link to="/">
					<img src={Logo} width="115" height="27" />
				</Link>
			</div>
			{menuObj.map(({ name, path }: MenuObjProps) => (
				<Link to={path} key={path}>
					<p key={name} className="text-gray-1 font-bold text-xl">
						{name}
					</p>
				</Link>
			))}
			{isLoggedIn ? (
				<div className="flex ml-auto mr-20 gap-10 text-base text-gray-6">
					<Link to="/mypage">
						<p>마이페이지</p>
					</Link>
					<Link to={`/mylog/${1}`}>
						<p>식단일지</p>
					</Link>
					<Link to="/" onClick={handleLogout}>
						<p>로그아웃</p>
					</Link>
				</div>
			) : (
				<div className="flex ml-auto mr-20 gap-10 text-base text-gray-6">
					<Link to="/auth/sign-in">
						<p>로그인</p>
					</Link>
					<Link to="/auth/sign-up">
						<p>회원가입</p>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
