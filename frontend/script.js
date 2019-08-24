console.log("frontend Running.")

let socket = io()
let prevX, prevY, currX, currY;
let pressed = false;

socket.on('connected', () => {
    console.log("Connected with :", socket.id)
})

$(function () {


    const canvas = document.getElementById('canvas1')
    console.log("My Canvas :", canvas);
    canvas.width = 0.75 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight


    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

    })

    const c = canvas.getContext('2d')
    $('#clear').click(() => {

        c.clearRect(0, 0, canvas.width, canvas.height);
    })


    canvas.addEventListener('mousedown', (e) => {

        // pressed = true;
        prevX = e.pageX - canvas.offsetLeft;
        prevY = e.pageY - canvas.offsetTop;
        // c.moveTo(prevX - 1, prevY - 1);
        // c.lineTo(prevX, prevY);
        // c.stroke();
        console.log("in mousedown, prevX and PrevY", prevX, prevY);

        socket.emit('down', {
            pressed: true,
            prevX: prevX,
            prevY: prevY
        })
    })

    socket.on('mouseIsDown', (mouseDownKaData) => {
        console.log("-->>", mouseDownKaData)

        c.beginPath();
        c.moveTo(mouseDownKaData.prevX - 1, mouseDownKaData.prevY - 1);
        c.lineTo(mouseDownKaData.prevX, mouseDownKaData.prevY);
        c.stroke();
    })





    // socket.on('mouseIsMoving', (mouseMoveKaData) => {
    //     // console.log("in mouseisMOving", mouseKaData)
    //     pressed = mouseKaData.pressed;
    //     if (pressed) {
    //         c.beginPath();
    //         prevX = mouseKaData.prevX;
    //         prevY = mouseKaData.prevY;
    //         c.moveTo(prevX, prevY);
    //         c.lineTo(currX, currY);
    //         c.stroke();
    //     }
    // })

    // canvas.addEventListener('mouseup', (e) => {
    //     pressed = false;
    // })

    // canvas.addEventListener('mousemove', (e) => {
    //     // if (pressed) {

    //     //     c.moveTo(prevX, prevY);
    //     currX = e.pageX - canvas.offsetLeft;
    //     currY = e.pageY - canvas.offsetTop;
    //     //     c.lineTo(currX, currY);
    //     //     c.stroke();
    //     //     prevX = currX;
    //     //     prevY = currY;
    //     // }
    //     console.log("previous Xand Y", prevX, prevY)
    //     socket.emit('moving', {
    //         pressed: true,
    //         prevX: prevX,
    //         prevY: prevY,
    //         currX: currX,
    //         currY: currY
    //     }, () => {
    //         console.log("yaha pahuche kya ?");
    //         prevX = currX;
    //         prevY = currY;
    //     })


    // });

})

// canvas.addEventListener('mouseout', (e) => {
//     pressed = false;
// });