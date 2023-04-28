import Input from "@/components/atoms/Input";
import SelectWithLabel from "@/components/molecules/SelectWithLabel";
import ValidationInput from "@/components/atoms/ValidationInput";
import InputWithLabel from "@/components/molecules/InputWithLabel";
import BasicButton from "@/components/atoms/BasicButton";
import TinyButton from "@/components/atoms/TinyButton";
import TopButton from "@/components/atoms/TopButton";
import Header from "@/templates/Header";

const Home = () => {
	return (
		<div>
			<Header />
			<div>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam consequuntur laborum culpa non a aspernatur
				omnis possimus error accusamus illum illo soluta eius officiis recusandae, ipsum quaerat accusantium sapiente
				explicabo.
			</div>
			<div className="card shadow bg-bg-1">
				<div className="card-body">
					<h2 className="card-title">no border with shadow</h2>
					<p>Rerum reiciendis beatae tenetur excepturi</p>
				</div>
			</div>
			<div className="card shadow-lg">
				<div className="card-body">
					<h2 className="card-title">no border with shadow</h2>
					<p>Rerum reiciendis beatae tenetur excepturi</p>
				</div>
			</div>
			<br />
			<br />
			<p>basic button</p>
			<BasicButton type="button" onClick={() => {}} width={true} style="primary">
				primary button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={true} style="bg">
				bg button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={false} style="deactivated" deactivated={true}>
				deactivated button
			</BasicButton>
			<BasicButton type="button" onClick={() => {}} width={false} style="gray">
				gray button
			</BasicButton>
			<br />
			<br />
			<p>tiny button</p>
			<TinyButton type="button" onClick={() => {}} style="primary">
				tiny
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="bg">
				tiny button
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="deactivated" deactivated={true}>
				deactivated
			</TinyButton>
			<TinyButton type="button" onClick={() => {}} style="gray" deactivated={false}>
				gray
			</TinyButton>
			<br />
			<br />
			<p>basic input</p>
			<Input type="text" name="test" id="1" value="" placeholder="test" onChange={() => {}} />
			<br />
			<br />
			<p>validation input</p>
			<ValidationInput
				type="text"
				name="test"
				id="1"
				value="test"
				placeholder="test"
				isError={false}
				errorMessage="message test"
				onChange={() => {}}
			/>
			<br />
			<br />
			<p>validation input + label</p>
			<InputWithLabel
				type="text"
				name="test"
				id="1"
				value="test"
				placeholder="test"
				isError={false}
				errorMessage="message test"
				onChange={() => {}}
				label="label test"
				htmlFor="test"
			/>
			<br />
			<br />
			<p>select box</p>
			<select className="select select-bordered max-w-xs">
				<option disabled selected>
					선택
				</option>
				<option>test option 1</option>
				<option>test option 2</option>
			</select>
			<br />
			<br />
			<p>select box + label</p>
			<SelectWithLabel name="test" id="test" value="선택" label="select label" htmlFor="test" onChange={() => {}}>
				<option disabled selected>
					선택
				</option>
				<option>test option 1</option>
				<option>test option 2</option>
			</SelectWithLabel>
			<TopButton />
			<div className="h-96">여백</div>
		</div>
	);
};

export default Home;
