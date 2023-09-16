import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const rulerRef = useRef(null);

	let BL_cm = 0.5;
	let BL_inch = 129.5;
	let begin_x = 20;

	const ResetCanvasSize = () => {
		if (navigator.userAgent.match(/iPhone|Android/i)) {
			rulerRef.current.width = screen.width;
		} else {
			if (screen.width <= 500) {
				rulerRef.current.width = screen.width;
			} else {
				rulerRef.current.width = screen.width - 34;
			}
		}
	};

	useEffect(() => {
		// set this value accoding to screen pixel resolution
		let dpi_x = 100.7;
		let ppcm = dpi_x / 2.54;

		let c = rulerRef.current;
		let cxt = c.getContext("2d");
		let w = c.clientWidth;
		const pattern = /^(\d+(?:\.\d+)?)\s*(cm|inch|mm)$/i;

		const drawMark = (px) => {
			cxt.strokeStyle = "#FF0000";
			cxt.lineWidth = 1;
			cxt.beginPath();
			cxt.moveTo(begin_x + px, 0);
			cxt.lineTo(begin_x + px, 130);
			cxt.stroke();
		};

		const drawCustomMark = (px) => {
			cxt.strokeStyle = "#0000FF";
			cxt.lineWidth = 1;
			cxt.beginPath();
			cxt.moveTo(begin_x + px, 0);
			cxt.lineTo(begin_x + px, 130);
			cxt.stroke();
		};

		const drawRuler = () => {
			cxt.setTransform(1, 0, 0, 1, 0, 0);
			cxt.clearRect(0, 0, c.width, c.height);
			//ruler for cm
			cxt.strokeStyle = "#000000";
			cxt.fillStyle = "#000000";
			cxt.lineWidth = 1;
			cxt.beginPath();
			cxt.moveTo(0, BL_cm);
			cxt.lineTo(w, BL_cm);
			cxt.stroke();

			for (let i = begin_x, j = 0; i <= w; i = i + ppcm, j++) {
				let Lh = BL_cm + 35;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_cm);
				cxt.stroke();
				cxt.font = "20px Arial";
				if (j < 10) {
					cxt.fillText(j, i - 6, Lh + 20);
				} else {
					cxt.fillText(j, i - 11, Lh + 20);
				}
			}

			let s2 = ppcm / 2;
			for (let i = begin_x, j = 0; i <= w; i = i + s2, j++) {
				if (j % 2 == 0) continue;
				let Lh = BL_cm + 25;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_cm);
				cxt.stroke();
			}

			let s10 = ppcm / 10;
			for (let i = begin_x, j = 0; i <= w; i = i + s10, j++) {
				if (j % 5 == 0 || j % 10 == 0) continue;
				let Lh = BL_cm + 15;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_cm);
				cxt.stroke();
			}

			//ruler for inch
			cxt.strokeStyle = "#000000"; //线条颜色
			cxt.fillStyle = "#000000";
			cxt.lineWidth = 1; //设置线宽
			cxt.beginPath();
			cxt.moveTo(0, BL_inch);
			cxt.lineTo(w, BL_inch);
			cxt.stroke(); //画线框

			for (let i = begin_x, j = 0; i <= w; i = i + dpi_x, j++) {
				let Lh = BL_inch - 35;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_inch);
				cxt.stroke();
				cxt.font = "20px Arial";
				if (j < 10) {
					cxt.fillText(j, i - 6, Lh - 5);
				} else {
					cxt.fillText(j, i - 12, Lh - 5);
				}
			}

			s2 = dpi_x / 2;
			for (let i = begin_x, j = 0; i <= w; i = i + s2, j++) {
				if (j % 2 == 0) continue;
				let Lh = BL_inch - 30;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_inch);
				cxt.stroke();
				cxt.font = "16px Arial";
				cxt.fillText("½", i - 7, Lh - 5);
			}

			let s4 = dpi_x / 4;
			for (let i = begin_x, j = 0; i <= w; i = i + s4, j++) {
				if (j % 2 == 0 || j % 4 == 0) continue;
				let Lh = BL_inch - 25;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_inch);
				cxt.stroke();
				cxt.font = "12px Arial";
				if (j % 4 == 1) {
					cxt.fillText("¼", i - 7, Lh - 5);
				} else if (j % 4 == 3) {
					cxt.fillText("¾", i - 7, Lh - 5);
				}
			}

			let s8 = dpi_x / 8;
			for (let i = begin_x, j = 0; i <= w; i = i + s8, j++) {
				if (j % 2 == 0 || j % 4 == 0) continue;
				let Lh = BL_inch - 18;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_inch);
				cxt.stroke();
				cxt.save();
				cxt.font = "12px Arial";
				cxt.scale(0.8, 1);
				if (j % 8 == 1) {
					cxt.fillText("⅛", (i - 7) / 0.8, Lh - 1);
				} else if (j % 8 == 3) {
					cxt.fillText("⅜", (i - 6) / 0.8, Lh - 1);
				} else if (j % 8 == 5) {
					cxt.fillText("⅝", (i - 6) / 0.8, Lh - 1);
				} else if (j % 8 == 7) {
					cxt.fillText("⅞", (i - 6) / 0.8, Lh - 1);
				}
				cxt.restore();
			}

			let s16 = dpi_x / 16;
			for (let i = begin_x, j = 0; i <= w; i = i + s16, j++) {
				if (j % 2 == 0 || j % 4 == 0 || j % 8 == 0) continue;
				let Lh = BL_inch - 15;
				cxt.beginPath();
				cxt.lineWidth = 1;
				cxt.moveTo(i, Lh);
				cxt.lineTo(i, BL_inch);
				cxt.stroke();
			}

			cxt.save();
			cxt.translate(0, 0);
			cxt.rotate((90 * Math.PI) / 180);
			cxt.font = "12px Arial";
			cxt.fillText("MM CM", 3, -2);
			cxt.fillText("INCH", 94, -2);
			cxt.restore();
			cxt.closePath();
		};

		const handleMouseDown = (e) => {
			if (typeof begin_x != "undefined" && begin_x !== null) {
				drawRuler();
				drawMark(0);
				var clickX = e.pageX - begin_x - e.target.offsetLeft;
				drawCustomMark(clickX);
				let clickY = e.pageY - e.target.offsetTop;
				// show_mouse_position(clickX, clickY);
				// say_the_length(clickX, clickY);
			}
		};

		ResetCanvasSize();
		drawRuler();

		// Use the regular expression to extract the numeric part and unit
		drawMark(0);

		c.addEventListener("mousedown", handleMouseDown);
	}, []);

	return (
		<div>
			<h1>Online-Ruler</h1>
			<canvas
				ref={rulerRef}
				id='ruler'
				height='130'
				width='1500'
				style={{ border: "1px solid #838383" }}
			>
				Your browser does not support the canvas element.
			</canvas>
		</div>
	);
}
