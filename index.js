
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')

  jump2 = false
  jump3 = false

  fire = true
  darkFire = true

  player2_jump2 = false
  player2_jump3 = false

  canvas.width = 1820
  canvas.height = 900


  const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
  }


  const gravity = 0.15


  const keys = {
    d: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    l: {
      pressed: false,
    },
    j: {
      pressed: false,
    },
    k: {
      pressed: false,
    },
  }

  const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: './img/background.png',
  })

  const backgroundImageHeight = 432

  const camera = {
    position: {
      x: 0,
      y:   scaledCanvas.height-backgroundImageHeight+150,
    },
  }
const player = player1
  player.persoAttack1 = attack1
const playerDark = player2
  function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.scale(3.2, 3)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    player.checkForHorizontalCanvasCollision()
    playerDark.checkForHorizontalCanvasCollision()
    playerDark.update()
    player.update()

    c.fillStyle = 'rgba(255,0,0,0.2)'
    c.fillRect(player.hitbox.position.x,player.hitbox.position.y,player.hitbox.width, player.hitbox.height)
    c.fillStyle = 'rgba(255,0,0,0.2)'
    c.fillRect(player2.hitbox.position.x,player2.hitbox.position.y,player2.hitbox.width, player2.hitbox.height)
    player.velocity.x = 0
    if (keys.d.pressed) {
      player.switchSprite('Run')
      player.velocity.x = 2
      player.lastDirection = 'right'
      //player.shouldPanCameraToTheLeft({canvas, camera})
    } else if (keys.a.pressed) {
      player.switchSprite('RunLeft')
      player.velocity.x = -2
      player.lastDirection = 'left'
      //player.shouldPanCameraToTheRight({canvas, camera})
    } else if(keys.s.pressed) {
      if(fire){
        if(player.lastDirection ==='left'){
          player.switchSprite('Mattack1Left')
        }
        else{
          player.switchSprite('Mattack1')
        }
        player.createAttack()
        fire = false
      }
    }
    else if (player.velocity.y === 0) {
      if (player.lastDirection === 'right') player.switchSprite('Idle')
      else player.switchSprite('IdleLeft')
    }


    if (player.velocity.y < 0) {
      player.shouldPanCameraDown({canvas, camera})
      if (player.lastDirection === 'right') player.switchSprite('Jump')
      else player.switchSprite('JumpLeft')
    } else if (player.velocity.y > 0) {
      player.shouldPanCameraUp({camera, canvas})
      if (player.lastDirection === 'right') player.switchSprite('Fall')
      else player.switchSprite('FallLeft')
    } else if (player.velocity.y === 0) {
      jump1 = true
    }


    player2.velocity.x = 0
    if (keys.l.pressed) {
      player2.switchSprite('Run')
      player2.velocity.x = 2
      player2.lastDirection = 'right'
      //player2.shouldPanCameraToTheLeft({canvas, camera})
    } else if (keys.j.pressed) {
      player2.switchSprite('RunLeft')
      player2.velocity.x = -2
      player2.lastDirection = 'left'
      //player2.shouldPanCameraToTheRight({canvas, camera})
    }else if(keys.k.pressed) {
      if(darkFire){
        if(player2.lastDirection ==='left'){
          player2.switchSprite('Mattack1Left')
        }
        else{
          player2.switchSprite('Mattack1')
        }
        player2.createAttack()
        darkFire = false
      }
    }else if (player2.velocity.y === 0) {
      if (player2.lastDirection === 'right') player2.switchSprite('Idle')
      else player2.switchSprite('IdleLeft')
    }


    if (player2.velocity.y < 0) {
      //player2.shouldPanCameraDown({camera, canvas})
      if (player2.lastDirection === 'right') player2.switchSprite('Jump')
      else player2.switchSprite('JumpLeft')
    } else if (player2.velocity.y > 0) {
      //player2.shouldPanCameraUp({camera, canvas})
      if (player2.lastDirection === 'right') player2.switchSprite('Fall')
      else player2.switchSprite('FallLeft')
    } else if (player2.velocity.y === 0) {
      player2_jump1 = true
    }
    player.attaks1.forEach(attack =>{
        if(((attack.hitbox.position.x+attack.hitbox.width)>player2.hitbox.position.x)&&(attack.hitbox.position.x<=player2.position.x)||
            ((attack.hitbox.position.x+attack.hitbox.width)>(player2.hitbox.position.x+player2.hitbox.width))&&
              (attack.hitbox.position.x<=(player2.hitbox.position.x+player2.hitbox.width))){
          if(((attack.hitbox.position.y-attack.hitbox.height)<player2.hitbox.position.y)&&(attack.hitbox.position.y>=player2.position.y)||
              ((attack.hitbox.position.y-attack.hitbox.height)<(player2.hitbox.position.y-player2.hitbox.height))&&
                (attack.hitbox.position.y>=(player2.hitbox.position.y+player2.hitbox.height))){
            if(attack.lifeTime>=650&&!attack.hit){
              attack.lifeTime = 640
              attack.hit = true
              player2.life = player2.life-20
              player2.velocity.x = 20
              player2.velocity.y = -2
            }
          }
        }
  })
    player2.attaks1.forEach(attack =>{
      if(((attack.hitbox.position.x+attack.hitbox.width)>player.hitbox.position.x)&&(attack.hitbox.position.x<=player.position.x)||
          ((attack.hitbox.position.x+attack.hitbox.width)>(player.hitbox.position.x+player.hitbox.width))&&
          (attack.hitbox.position.x<=(player.hitbox.position.x+player.hitbox.width))){
        if(((attack.hitbox.position.y-attack.hitbox.height)<player.hitbox.position.y)&&(attack.hitbox.position.y>=player.position.y)||
            ((attack.hitbox.position.y-attack.hitbox.height)<(player.hitbox.position.y-player.hitbox.height))&&
            (attack.hitbox.position.y>=(player.hitbox.position.y+player.hitbox.height))){
          if(attack.lifeTime>=650&&!attack.hit){
            attack.lifeTime = 640
            attack.hit = true
            player.life = player2.life-20
            player.velocity.x = 20
            player.velocity.y = -2
          }
        }
      }
    })

    c.restore()
  }

  animate()

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        break
      case 'a':
        keys.a.pressed = true
        break
      case 's':
        keys.s.pressed = true
        break
      case 'w':
        if (jump1) {
          player.velocity.y = -4
          jump1 = false
          jump3 = true
        } else if (jump2) {
          player.velocity.y = -4
          jump2 = false
          jump3 = false
        }
        break

      case 'l':
        keys.l.pressed = true
        break
      case 'j':
        keys.j.pressed = true
        break
      case 'k':
        keys.k.pressed = true
        break
      case 'i':
        if (player2_jump1) {
          player2.velocity.y = -4
          player2_jump1 = false
          player2_jump3 = true
        } else if (player2_jump2) {
          player2.velocity.y = -4
          player2_jump2 = false
          player2_jump3 = false
        }
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 's':
        keys.s.pressed = false
          fire = true
        break
      case 'w':
        if (jump3) {
          jump2 = true
        }
        break

      case 'l':
        keys.l.pressed = false
        break
      case 'j':
        keys.j.pressed = false
        break
      case 'k':
        keys.k.pressed = false
        darkFire = true
        break
      case 'i':
        if (player2_jump3) {
          player2_jump2 = true
        }
        break
    }
  })
