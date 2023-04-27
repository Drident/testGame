const player1  = new Player({
    position: {
        x: 100,
        y: 300,
    },
    collisionBlocks,
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
        JumpLeft: {
            imageSrc: './img/marshal/jump2.png',
            frameRate: 1,
            frameBuffer: 1,
        },
    },
})