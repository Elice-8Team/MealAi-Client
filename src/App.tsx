import { ErrorBoundary } from "react-error-boundary";
import AppRouter from "@/router/AppRouter";
import Fallback from "@/components/errorrBoundary/CommonErrorBoundary";
import { GlobalStyle } from "@/styles/GlobalStyles";
import MetaTag from "./utils/getMetaTag";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<ErrorBoundary FallbackComponent={Fallback}>
				<MetaTag
					title={"MealAi"}
					description={"식단 관리 서비스"}
					keywords={"다이어트"}
					imgsrc={"@/assets/icon_food_add.svg"}
					url={"https://github.com"}
					locale={"ko_KR"}
				/>
				<AppRouter />
			</ErrorBoundary>
		</>
	);
};

export default App;
