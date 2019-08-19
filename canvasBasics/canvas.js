var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c -> context
var c = canvas.getContext('2d');

// Rectangles
// // c.fillRect(x, y, width, height); of the rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0,255, 0, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 300, 100, 100);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 200);
// c.strokeStyle = "red";
// c.stroke();

// // Arcs and Circles
// c.beginPath();
// c.arc(300, 300, 30, 0, 2 * Math.PI, false);
// c.strokeStyle = 'darkgreen';
// c.stroke();    


// // Creating multiple cicrcles using a for loop
// for (let i = 0; i < 5000; i++) {

//     // Math.random() returns any random value form 0 to 1
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random()* window.innerHeight;
//     var r = Math.random()* 255;
//     var b = Math.random()* 255;
//     var g = Math.random()* 255;
//     c.beginPath();
//     c.arc(x, y, 30, 0, 2 * Math.PI, false);
//     // c.strokeStyle = 'darkgreen';
//     c.strokeStyle = `rgb(${r}, ${b} ,${g})`
//     c.stroke();
// }

// Animations in Canvas for one circle

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 30;
// function animate() {
//     requestAnimationFrame(animate);
//     // we are basically creating a loop

//     // console.log("animating.")
//     // clearing canvas each time to avoid overwriting
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     c.beginPath();
//     c.arc(x, y, radius, 0, 2 * Math.PI, false);
//     c.strokeStyle = 'blue';
//     c.stroke();

//     if (x + radius > innerWidth || x - radius < 0) {
//         dx = -dx;
//     }
//     x += dx;

//     if (y + radius > innerHeight || y - radius < 0) {
//         dy = -dy;
//     }
//     y += dy;

// }
// animate();



// Now to Create and Animate more than 1 cirlcea we use 
// JS Oject Oriented Programing

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
    // function will be called
    // console.log(event);

    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})


// Seperate code for resizing the browser
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // call to function init()
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    // this.color = color;
    // // thfStyle=this.color;
    // this.fStyle = fStyle;

    this.color = colorOptions[Math.floor(Math.random() * colorOptions.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // c.strokeStyle = color;
        // c.stroke();
        // c.fillStyle = fStyle;
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

        // Adding the interactivity portion

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
// circleArray,  we will create random new circles and push them into the array

// for (let i = 0; i < 800; i++) {

//     var radius = ((Math.random() * 3) + 1)
//     var x = Math.random() * (innerWidth - radius * 2) + radius;
//     var y = Math.random() * (innerHeight - radius * 2) + radius;
//     var dx = (Math.random() - 0.5) * 8;
//     var dy = (Math.random() - 0.5) * 8;

//     // old method 
//     // var rang = `rgb(${Math.random() * 255}, ${Math.random() * 255} ,${Math.random() * 255})`;
//     circleArray.push(new Circle(x, y, dx, dy, radius))

// }
// Moving this code into the init function()

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
// console.log(circleArray);
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    // circle.update();
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


}
init();
animate();   