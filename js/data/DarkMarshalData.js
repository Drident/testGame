const player2  = new Player({
    position: {
        x: 400,
        y: 300,
    },
    collisionBlocks,
    life:300,
    perso:2,
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
        Mattack1: {
            imageSrc: './img/darkMarshal/Dark-Attak.png',
            frameRate: 6,
            frameBuffer: 6,
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
        Mattack1Left: {
            imageSrc: './img/darkMarshal/Dark-Attak2.png',
            frameRate: 6,
            frameBuffer: 5,
        },
        JumpLeft: {
            imageSrc: './img/darkMarshal/Dark-air2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        go: {
            imageSrc: './img/darkMarshal/Dark-dash.png',
            frameRate: 3,
            frameBuffer: 3,
        },
        goLeft: {
            imageSrc: './img/darkMarshal/Dark-dash2.png',
            frameRate: 3,
            frameBuffer: 3,
        },
    },
})
attackDash2 = new Attack({
    position: {
        x: player2.position.x,
        y: player2.position.y,
    },
    lifeTime: 900,
    power: 50,
    height2: player2.hitbox.height,
    width2: player2.hitbox.width,
    sens: 0,
    upSens:0,
    imageSrc: './img/darkMarshal/dash1.png',
    speedx: 9,
    speedy:0,
    frameRate: 8,
    animations: {
        go: {
            imageSrc: './img/darkMarshal/dash1.png',
            frameRate: 3,
            frameBuffer: 3,
        },
        goLeft: {
            imageSrc: './img/darkMarshal/dash2.png',
            frameRate: 3,
            frameBuffer: 3,
        },
    },
})