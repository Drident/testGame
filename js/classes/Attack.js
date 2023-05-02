class Attack extends Sprite {
    constructor({
                    position,
                    lifeTime,
                    power,
                    height2,
                    width2,
                    sens,
                    upSens,
                    imageSrc,
                    speedx,
                    speedy,
                    frameRate,
                    scale = 0.5,
                    animations,
                }) {
            super({imageSrc, frameRate, scale})
            this.speedx = speedx
            this.speedy = speedy
            this.position = position
            this.height2 = height2
            this.width2 = width2
            this.sens = sens
            this.hit = false;
            this.upSens = upSens
            this.velocity = {
                x: this.speedx,
                y: this.speedy,
            }
            this.power = power
            this.lifeTime = lifeTime
            this.hitbox = {
                position: {
                    x: this.position.x,
                    y: this.position.y + this.upSens,
                },
                width: this.width,
                height: this.height,
            }

            this.animations = animations
            this.lastDirection = 'right'

            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc

                this.animations[key].image = image
            }
    }

    switchSprites(key) {
       // if (this.image === this.animations[key].image || !this.loaded) return

        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }
    update() {
        this.updateFrames()
        this.updateHitbox()
        this.draw()
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.updateLifeTime()
    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x+10,
                y: this.position.y+20,
            },
            width: this.width2,
            height: this.height2,
        }
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.width2, this.height2)
    }
    updateLifeTime(){
            this.lifeTime = this.lifeTime-10
    }
}