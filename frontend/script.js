
let socket = io()
let prevX, prevY, currX, currY;
let pressed = false;

strokeColour = "black";
lineWidth = 1;

socket.on('connected', () => {
    console.log("Connected with :", socket.id)
})

$(function () {

    const canvas = document.getElementById('canvas1')
   
    canvas.width = 0.8 * canvas.parentElement.clientWidth;
    canvas.height = 0.7 * window.innerHeight;

    window.addEventListener('resize', function () {
        canvas.width = 0.8 * canvas.parentElement.clientWidth;
        canvas.height = 0.7 * window.innerHeight;
    })

    const c = canvas.getContext('2d')
    $('#clear').click(() => {

        c.clearRect(0, 0, canvas.width, canvas.height);
    })

    canvas.addEventListener('mousedown', (e) => {

        pressed = true;
        prevX = e.pageX - canvas.offsetLeft;
        prevY = e.pageY - canvas.offsetTop;
       
        socket.emit('down', {
            prevX: prevX,
            prevY: prevY,
            strokeColour: strokeColour,
            lineWidth: lineWidth
        })
    })

    socket.on('mouseIsDown', (mouseDownKaData) => {
        // console.log("stroke colour jo mila ", mouseDownKaData.strokeColour)

        c.beginPath();
        c.moveTo(mouseDownKaData.prevX - 1, mouseDownKaData.prevY - 1);
        c.strokeStyle = mouseDownKaData.strokeColour;
        c.lineWidth = mouseDownKaData.lineWidth;
        c.lineTo(mouseDownKaData.prevX, mouseDownKaData.prevY);
        c.stroke();
    })

    canvas.addEventListener('mousemove', (e) => {
        if (pressed) {
            currX = e.pageX - canvas.offsetLeft;
            currY = e.pageY - canvas.offsetTop;

            socket.emit('moving', {
                prevX: prevX,
                prevY: prevY,
                currX: currX,
                currY: currY
            })
            prevX = currX;
            prevY = currY;
        }
    })
    socket.on('mouseIsMoving', (mouseMoveKaData) => {
        c.moveTo(mouseMoveKaData.prevX, mouseMoveKaData.prevY);
        c.lineTo(mouseMoveKaData.currX, mouseMoveKaData.currY);
        c.stroke();


    })

    canvas.addEventListener('mouseup', (e) => {
        pressed = false;
        // when mouse getComputedStyle, out of the canvas that line is finished, start new stroke
    })

    canvas.addEventListener('mouseout', (e) => {
        pressed = false;
    });

    document.getElementById('controls').addEventListener('click', (event) => {

        const cvalue = event.target.dataset.cvalue;
        const linewidth = event.target.dataset.linewidth;
        if (cvalue) {
            strokeColour = cvalue;
        }
        if (linewidth) {
            lineWidth = linewidth;
        }
    })

})
