console.log("frontend Running.")

let socket = io()

socket.on('connected', ()=>{
    console.log("Connected with :", socket.id)
})


$(function() {

        const canvas = document.querySelector('canvas')
        canvas.width = 0.75 * window.innerWidth;
        canvas.height = 0.8 * window.innerHeight
    
        let pressed = false;
    
        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        })
    
        const c = canvas.getContext('2d')
        $('#clear').click(() => {
            
            c.clearRect(0, 0, canvas.width, canvas.height);
    
        })
    
    
        canvas.addEventListener('mousedown', (e) => {
            
            pressed = true;
            c.beginPath()
            // c.moveTo(e.x, e.y);
            c.moveTo(e.pageX, e.pageY);
        
        })
    
        canvas.addEventListener('mouseup', (e) => {
            pressed = false;
        })
    
        canvas.addEventListener('mousemove', (e) => {
            if (pressed) {
                // c.lineTo(e.x, e.y);
                c.lineTo(e.pageX, e.pageY);
                c.stroke();
            }
        });
    
})