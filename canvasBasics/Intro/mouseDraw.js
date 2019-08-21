$(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    let pressed = false;

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    const c = canvas.getContext('2d')
    $('#clear').click(()=>{
            // const canvas = document.querySelector('canvas') 
            // const c = canvas.getContext('2d')
        c.clearRect(0, 0, canvas.width, canvas.height);

    })


    canvas.addEventListener('mousedown', (e) => {
        pressed = true;
        c.beginPath()
        c.moveTo(e.x, e.y);
    })

    canvas.addEventListener('mouseup', (e) => {
        pressed = false;
    })

    canvas.addEventListener('mousemove', (e) => {
        if (pressed) {
            c.lineTo(e.x, e.y);
            c.stroke();
        }
    });




})