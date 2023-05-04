class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    life,
    perso,
    platformCollisionBlocks,
    imageSrc,
    persoAttack1,
    frameRate,
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale })
    this.position = position
    this.velocity = {
      x: 0,
      y: 3,
    }
    this.jumpSound = new Audio();
    this.dashSound = new Audio();
    this.deathSound= new Audio();
    this.collisionBlocks = collisionBlocks
    this.platformCollisionBlocks = platformCollisionBlocks
    this.life = life
    this.perso = perso
    this.persoAttack1 = persoAttack1
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 50,
      height: 50,
    }
    this.attaks1 = []
    this.attaks2 = []
    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }
    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return

    this.currentFrame = 0
    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate


  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y-90,
      },
      width: 200,
      height: 80,
    }
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0
    }
  }

/*  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
    const scaledDownCanvasWidth = canvas.width / 4
    if (cameraboxRightSide >= 576) return
    if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)){
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return
    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }*/

  shouldPanCameraDown({ canvas, camera }) {
    if (this.camerabox.position.y+90 + this.velocity.y <= 0) return

    if (this.camerabox.position.y+90 <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    if (this.camerabox.position.y + this.camerabox.height + this.velocity.y >=432) return
    const scaledCanvasHeight = canvas.height / 4
    if (this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight){
      camera.position.y -= this.velocity.y
    }
  }

  createAttack(){
    if(this.perso ===1) {
      this.attaks1.push(new Attack({
        position: {
          x: player1.position.x - 25,
          y: player1.position.y - 25,
        },
        lifeTime: 900,
        power: 20,
        height2: 45,
        width2: 60,
        sens: 0,
        upSens: 0,
        imageSrc: './img/marshal/alpha2.png',
        speedx: 6,
        speedy: 0,
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
      }))
    }
    else{
      this.attaks1.push(new Attack({position: {
          x: player2.position.x - 25,
          y: player2.position.y - 25,
        }, lifeTime: 900, power: 20, height2: 45, width2: 60, sens: 0, upSens: 0, imageSrc: './img/marshal/alpha2.png', speedx: 6, speedy: 0, frameRate: 8,
        animations: { go: {
            imageSrc: './img/darkMarshal/teeest.png',
            frameRate: 8,
            frameBuffer: 8,
          }, explose: {
            imageSrc: './img/marshal/alpha2.png',
            frameRate: 9,
            frameBuffer: 9,
          }, goLeft: {
            imageSrc: './img/darkMarshal/teeest2.png',
            frameRate: 8,
            frameBuffer: 8,
          },
        },
      }))
    }
    if(this.lastDirection === 'right'){
      this.attaks1[this.attaks1.length-1].switchSprites('go')
    }
    else{
      this.attaks1[this.attaks1.length-1].switchSprites('goLeft')
      this.attaks1[this.attaks1.length-1].velocity.x = -6
    }
    this.attaks1[this.attaks1.length-1].playfireSound()
}
  createAttackFinal(){
    this.playdeathSound()
    if(this.perso ===1) {
      this.attaks2.push(new Attack({
        position: {
          x: player1.position.x - 25,
          y: player1.position.y,
        },
        lifeTime: 900,
        power: 50,
        height2: 45,
        width2: 60,
        sens: 0,
        upSens: 0,
        imageSrc: './img/marshal/ultima10.png',
        speedx: 0,
        speedy: -6,
        frameRate: 6,
        animations: {
          go: {
            imageSrc: './img/marshal/ultima10.png',
            frameRate: 6,
            frameBuffer: 6,
          },
          explose: {
            imageSrc: './img/marshal/explosion.png',
            frameRate: 9,
            frameBuffer: 9,
          },
          goLeft: {
            imageSrc: './img/marshal/Dark-fire2.png',
            frameRate: 8,
            frameBuffer: 8,
          },
        },
      }))
    }
    else{
      this.attaks2.push(new Attack({position: {
          x: player2.position.x - 25,
          y: 432,
        }, lifeTime: 900, power: 50, height2: 45, width2: 60, sens: 0, upSens: 0, imageSrc: './img/darkMarshal/ultima5.png', speedx: 0, speedy: -6, frameRate: 6,
        animations: { go: {
            imageSrc: './img/darkMarshal/ultima5.png',
            frameRate: 6,
            frameBuffer: 6,
          }, explose: {
            imageSrc: './img/marshal/explosion.png',
            frameRate: 9,
            frameBuffer: 9,
          }, goLeft: {
            imageSrc: './img/darkMarshal/teeest2.png',
            frameRate: 8,
            frameBuffer: 8,
          },
        },
      }))
    }
    this.attaks2[this.attaks2.length-1].switchSprites('go')

  }
  playjumpSound() {
    //alert('The audio will start playing now.')
    this.jumpSound.src = './music/jump.mp3';
    this.jumpSound.autoplay = true;
    //jumpSound.loop = true;
  }
  playdeathSound() {
    this.deathSound.src = './music/death.mp3';
    this.deathSound.autoplay = true;
  }
  playDashSound() {
    //alert('The audio will start playing now.')
    this.jumpSound.src = './music/DBZDash.mp3';
    this.jumpSound.autoplay = true;
    //jumpSound.loop = true;
  }
  update() {
    this.updateFrames()
    this.updateHitbox()
    this.updateCamerabox()
    this.draw()
    this.position.x += this.velocity.x
    this.updateHitbox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollisions()
    this.updateAttack()
    this.updateAttack2()
    this.updateLife()
  }
  updateLife(){
    c.fillStyle = 'rgba(255,0,0)'
    c.fillRect(this.hitbox.position.x+5,this.hitbox.position.y-4,15,3)
    c.fillStyle = 'rgba(0,255,0)'
    c.fillRect(this.hitbox.position.x+5,this.hitbox.position.y-4,(15/300)*this.life,3)
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x ,
        y: this.position.y ,
      },
      width: 24,
      height: 33,
    }
    //if(this.image.width>40)this.playDashSound()
  }
  updateAttack(){
    this.attaks1.forEach(attack => {
      attack.update();
      if(attack.lifeTime === 0){
        this.attaks1.splice(0,1)
      }
      else if(attack.lifeTime <= 650&& attack.velocity.x !==0){
        attack.velocity.x = 0
        attack.switchSprites('explose')
        attack.playexplosion1Sound()
      }
    })
  }
  updateAttack2(){
    this.attaks2.forEach(attack => {
      attack.update();
      if(attack.lifeTime === 0){
        this.attaks.splice(0,1)
      }
      else if(attack.lifeTime <= 650&& attack.velocity.y !==0){
        attack.velocity.y = 0
        attack.width = 100
        attack.height = 100
        attack.switchSprites('explose')
        attack.playexplosion2Sound()
      }
    })
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width

          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
      }
    }

    // platform collision blocks
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i]

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = platformCollisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
  restart(){
    this.velocity.x = 0
    this.velocity.y = 0
    this.life = 300
    this.attaks1.forEach(attack => {
      this.attaks1.splice(0,1)
    })
  }
}
