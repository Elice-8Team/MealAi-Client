import { forwardRef } from "react";

export interface SearchInputProps {
	name: string;
	id: string;
	value?: string;
	onClick?: () => void;
}

const SearchInput = ({ name, id, onClick }: SearchInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
	return (
		<div className="form-control">
			<div className="input-group">
				<input
					type="text"
					name={name}
					id={id}
					ref={ref}
					placeholder="식단 이름을 검색해주세요."
					className="input input-bordered w-full"
				/>
				<button onClick={onClick} className="btn btn-square">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default forwardRef(SearchInput);
