const player2  = new Player({
    position: {
        x: 400,
        y: 300,
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: './img/darkMarshal/Dark.png',
    frameRate: 5,
    animations: {
        Idle: {
            imageSrc: './img/darkMarshal/Dark.png',
            frameRate: 5,
            frameBuffer: 5,
        },
        Run: {
            imageSrc: './img/darkMarshal/Dark-run1.png',
            frameRate: 6,
            frameBuffer: 6,
        },
        Jump: {
            imageSrc: './img/darkMarshal/Dark-jump.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        Fall: {
            imageSrc: './img/darkMarshal/Dark-air.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        FallLeft: {
            imageSrc: './img/darkMarshal/Dark-air2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        RunLeft: {
            imageSrc: './img/darkMarshal/Dark-run2.png',
            frameRate: 6,
            frameBuffer: 6,
        },
        IdleLeft: {
            imageSrc: './img/darkMarshal/Dark2.png',
            frameRate: 5,
            frameBuffer: 5,
        },
        JumpLeft: {
            imageSrc: './img/darkMarshal/Dark-air2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
    },
})