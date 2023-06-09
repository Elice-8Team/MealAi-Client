import styled from "styled-components";

// styled
const AppLoader = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
`;

const LoaderSpin = styled.div`
	text-align: center;
`;

const Dot = styled.span`
	position: relative;
	display: inline-block;
	font-size: 20px;
	width: 30px;
	height: 30px;

	transform: rotate(45deg);
	animation: hipsterRotate 1.2s infinite linear;

	i {
		width: 9px;
		height: 9px;
		border-radius: 100%;
		background-color: #008b47;
		transform: scale(0.75);
		display: block;
		position: absolute;
		opacity: 0.5;
		animation: hipsterSpinMove 1s infinite linear alternate;
		transform-origin: 50% 50%;
	}
	i:nth-child(1) {
		left: 10px;
		background-color: #008b47;
		top: 0;
	}
	i:nth-child(2) {
		right: 0;
		top: 8px;
		background-color: #008b47;
		animation-delay: 0.4s;
	}
	i:nth-child(3) {
		right: 4px;
		bottom: 0;
		background-color: #008b47;
		animation-delay: 0.8s;
	}
	i:nth-child(4) {
		left: 4px;
		bottom: 0;
		background-color: #008b47;
		animation-delay: 1.2s;
	}
	i:nth-child(5) {
		left: 0;
		top: 8px;
		background-color: #008b47;
		animation-delay: 1.2s;
	}

	@keyframes hipsterSpinMove {
		to {
			opacity: 1;
		}
	}

	@keyframes hipsterRotate {
		to {
			transform: rotate(405deg);
		}
	}
`;

const Loader = () => {
	return (
		<AppLoader>
			<LoaderSpin>
				<Dot>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
				</Dot>
			</LoaderSpin>
		</AppLoader>
	);
};

export default Loader;
