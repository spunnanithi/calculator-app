"use client";

import React, { useContext } from "react";
import { CalcContext } from "../_context/CalcContext";

export default function Button({ value }) {
	const { calc, setCalc } = useContext(CalcContext);

	const decimalClick = () => {
		setCalc({
			...calc,
			num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
		});
	};

	const clearClick = () => {
		setCalc({
			num: 0,
			res: 0,
			sign: "",
		});
	};

	const reverseSignClick = () => {
		setCalc({
			...calc,
			num: calc.num ? calc.num * -1 : 0,
			res: calc.res ? calc.res * -1 : 0,
			sign: "",
		});
	};

	const percentClick = () => {
		let num = calc.num ? parseFloat(calc.num) : 0;
		let res = calc.res ? parseFloat(calc.res) : 0;

		setCalc({
			...calc,
			num: (num /= Math.pow(100, 1)),
			res: (res /= Math.pow(100, 1)),
			sign: "",
		});
	};

	const operatorClick = () => {
		setCalc({
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0,
		});
	};

	const numbersClick = (val) => {
		// allow number to be clicked as long as it is less than 15 digits
		if (calc.num.toString().length < 15) {
			// change to allow larger numbers during number click
			setCalc({
				...calc,
				num:
					calc.num === 0 && val === "0"
						? "0"
						: calc.num % 1 === 0
						? Number(calc.num + val)
						: calc.num + val,
				res: !calc.sign ? 0 : calc.res,
			});
		}
	};

	const handleBtnClick = (e) => {
		const val = e.target.value;

		if (val === ".") {
			decimalClick();
		} else if (val === "C") {
			clearClick();
		} else if (val === "+/-") {
			reverseSignClick();
		} else if (val === "%") {
			percentClick();
		} else if (val === "÷" || val === "⨉" || val === "-" || val === "+") {
			operatorClick();
		} else {
			numbersClick(val);
		}
	};

	return (
		<div className="w-1/4 border-r border-b border-indigo-400">
			<button
				onClick={handleBtnClick}
				value={value}
				className="w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-xl font-light">
				{value}
			</button>
		</div>
	);
}
