const myCanvas = document.getElementById("myCanvas");
  myCanvas.width = 400;
  myCanvas.height = 400;

const ctx = myCanvas.getContext("2d");

function chartPiece(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(centerX,centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();
	ctx.fill();
};

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const carsInRussia = () => ({
  Russia: Math.random(),
	Japan: Math.random(),
	Germany: Math.random(),
	England: Math.random(),
  France: Math.random(),
  USA: Math.random(),
  China: Math.random(),
  Korea: Math.random()
});

class Piechart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
  }

	draw(data) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		let total_value = 0;
		let color_index = 0;
		for (let categ in data) {
			const val = data[categ];
			total_value += val;
		}

		let start_angle = 0;

		for (let categ in data) {
			const val = data[categ];
			const slice_angle = 2 * Math.PI * val / total_value;
			chartPiece(
				this.ctx,
				this.canvas.width/2,
				this.canvas.height/2,
				getRandom(70, 200),
				start_angle,
				start_angle+slice_angle,
				this.colors[color_index%this.colors.length]
			);
			start_angle += slice_angle;
			color_index++;
		}

    if (this.options.doughnutHoleSize) {
			chartPiece(
				this.ctx,
				this.canvas.width/2,
				this.canvas.height/2,
				this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
				0,
				2 * Math.PI,
				"#1e1e1e"
			);
		}
	}
};

const myDougnutChart = new Piechart(
    {
		canvas: myCanvas,
		colors: ["#F2994A", "#6FCF97", "#9B51E0", "#2F80ED", "#56CCF2", "#219653", "#F2C94C", "#EB5757"],
		doughnutHoleSize: 0.16
	}
);

myDougnutChart.draw(carsInRussia());

myCanvas.addEventListener("click", () => myDougnutChart.draw(carsInRussia()));

