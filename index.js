
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')

  jump2 = false
  jump3 = false

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
      y: -backgroundImageHeight + scaledCanvas.height,
    },
  }
const player = player1
  function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    player.checkForHorizontalCanvasCollision()
    player.update()

    player.velocity.x = 0
    if (keys.d.pressed) {
      player.switchSprite('Run')
      player.velocity.x = 2
      player.lastDirection = 'right'
      player.shouldPanCameraToTheLeft({canvas, camera})
    } else if (keys.a.pressed) {
      player.switchSprite('RunLeft')
      player.velocity.x = -2
      player.lastDirection = 'left'
      player.shouldPanCameraToTheRight({canvas, camera})
    } else if (player.velocity.y === 0) {
      if (player.lastDirection === 'right') player.switchSprite('Idle')
      else player.switchSprite('IdleLeft')
    }

    if (player.velocity.y < 0) {
      player.shouldPanCameraDown({camera, canvas})
      if (player.lastDirection === 'right') player.switchSprite('Jump')
      else player.switchSprite('JumpLeft')
    } else if (player.velocity.y > 0) {
      player.shouldPanCameraUp({camera, canvas})
      if (player.lastDirection === 'right') player.switchSprite('Fall')
      else player.switchSprite('FallLeft')
    } else if (player.velocity.y === 0) {
      jump1 = true
    }

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
      case 'w':
        if (jump3) {
          jump2 = true
        }
        break
    }
  })
