
export function draw(state) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	// draw here
	ctx.fillStyle = "rgb(201, 112, 49)"
	ctx.fillRect(100, 100, 180, 270)
}