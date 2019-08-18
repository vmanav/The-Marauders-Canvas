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

// // Arcs
// c.beginPath();
// c.arc(300, 300, 30, 0, 2 * Math.PI, false);
// c.strokeStyle = 'darkgreen';
// c.stroke();    

// Creating multiple cicrcles using a for loop
for (let i = 0; i < 5000; i++) {

    // Math.random() returns any random value form 0 to 1
    var x = Math.random() * window.innerWidth;
    var y = Math.random()* window.innerHeight;
    var r = Math.random()* 255;
    var b = Math.random()* 255;
    var g = Math.random()* 255;
    c.beginPath();
    c.arc(x, y, 30, 0, 2 * Math.PI, false);
    // c.strokeStyle = 'darkgreen';
    c.strokeStyle = `rgb(${r}, ${b} ,${g})`
    c.stroke();
}