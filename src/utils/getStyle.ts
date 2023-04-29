// BasicButton, TinyButton 스타일 적용 함수
interface GetStyleProps {
	style: "primary" | "bg" | "deactivated" | "gray";
}

export default function getStyle({ style }: GetStyleProps) {
	switch (style) {
		case "primary":
			return "bg-primary-1 text-white";
		case "bg":
			return "bg-bg-1 text-primary-1";
		case "deactivated":
			return "bg-gray-8 text-gray-6";
		case "gray":
			return "bg-gray-1 text-white";
	}
}
