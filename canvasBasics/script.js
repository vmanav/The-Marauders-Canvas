$(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    const debounce = (func) => {
        let timer
        return (event) => {
            if (timer) { clearTimeout(timer) }
            timer = setTimeout(func, 100, event)
        }
    }

    window.addEventListener('resize', debounce(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }))

    const c = canvas.getContext('2d')

    // Drawing a basic rectangle
    c.fillStyle = 'white'
    c.fillRect(100, 100, 100, 100)

    // // 60x60 Squares
    // for (let i = 0; i < 60; i++) {
    //     for (let j = 0; j < 100; j++) {
    //         // 1
    //         // c.fillStyle = `rgb(${i * 5}, ${j * 5}, ${(i + j) * 50})`
    //         // c.fillRect(j * 20, i * 20, 20, 20)  

    //         // 2
    //         // c.fillStyle = `rgb(${i * 5}, ${j * 5}, ${(i + j) * 50})`
    //         //   c.fillRect(j * 20, i * 20, 10, 10)

    //         c.strokeStyle = `rgb(${i * 5}, ${j * 5}, ${(i + j) * 50})`
    //         c.strokeRect(j * 20, i * 20, 20, 20)

    //     }
    // }

    c.beginPath()
    c.moveTo(0,0)
    c.lineTo(300,300)
    c.stroke()

})