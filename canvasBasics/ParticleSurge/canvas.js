var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 40;
// const minRadius = 2;
var colorOptions = [
    '#025952',
    '#FAE3BA',
    '#F1523E',
    '#F27B35',
    '#FCA521'
]

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})


// Seperate code for resizing the browser
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

 
    this.color = colorOptions[Math.floor(Math.random() * colorOptions.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
       
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;

        // Adding the mouse interactivity.
        if ((mouse.x - this.x < 50 && mouse.x - this.x > -50) && (mouse.y - this.y < 50 && mouse.y - this.y > -50)) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        // draw again
        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = []; //setting to emty object

    for (let i = 0; i < 800; i++) {

        var radius = ((Math.random() * 4) + 1)
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;

        circleArray.push(new Circle(x, y, dx, dy, radius))
    }

}
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();   