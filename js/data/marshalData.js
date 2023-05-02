const player1  = new Player({
    position: {
        x: 100,
        y: 300,
    },
    collisionBlocks,
    life:300,
    perso:1,
    platformCollisionBlocks,
    imageSrc: './img/marshal/sprite.png',
    frameRate: 5,
    animations: {
        Idle: {
            imageSrc: './img/marshal/sprite.png',
            frameRate: 5,
            frameBuffer: 5,
        },
        Run: {
            imageSrc: './img/marshal/sprite-run.png',
            frameRate: 6,
            frameBuffer: 6,
        },
        Jump: {
            imageSrc: './img/marshal/jump.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        Mattack1: {
            imageSrc: './img/marshal/attak1.png',
            frameRate: 6,
            frameBuffer: 6,
        },
        Fall: {
            imageSrc: './img/marshal/air.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        FallLeft: {
            imageSrc: './img/marshal/air2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        RunLeft: {
            imageSrc: './img/marshal/sprite-run2.png',
            frameRate: 6,
            frameBuffer: 6,
        },
        IdleLeft: {
            imageSrc: './img/marshal/sprite-2.png',
            frameRate: 5,
            frameBuffer: 5,
        },
        Mattack1Left: {
            imageSrc: './img/marshal/attak2.png',
            frameRate: 6,
            frameBuffer: 5,
        },
        JumpLeft: {
            imageSrc: './img/marshal/jump2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
    },
})

attack1 = new Attack({
    position: {
        x: player1.position.x-25,
        y: player1.position.y-25,
    },
    lifeTime: 900,
    power: 50,
    height2: 45,
    width2: 60,
    sens: 0,
    upSens:0,
    imageSrc: './img/marshal/alpha2.png',
    speedx: 6,
    speedy:0,
    frameRate: 8,
    animations: {
        go: {
            imageSrc: './img/marshal/Dark-fire.png',
            frameRate: 8,
            frameBuffer: 8,
        },
        explose: {
            imageSrc: './img/marshal/alpha2.png',
            frameRate: 9,
            frameBuffer: 9,
        },
        goLeft: {
            imageSrc: './img/marshal/Dark-fire2.png',
            frameRate: 8,
            frameBuffer: 8,
        },
    },
})