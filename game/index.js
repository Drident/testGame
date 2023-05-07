var client = new Paho.MQTT.Client("mqtt-ws.sdi.hevs.ch", 80, "/ws", "chris");

var buttonOne = "sdi05/D5:2F:7E:30:10:5A/button"
var buttonTwo = "sdi05/FC:32:FA:4B:42:DE/button"

var eulerOne = "sdi05/D5:2F:7E:30:10:5A/controller"
var eulerTwo = "sdi05/FC:32:FA:4B:42:DE/controller"

var left_detected = false
var right_detected = false
var jump_detected = false
var fire_detected = false

var client_detected = false
client.onConnectionLost = function(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.error("Lost connection:" + responseObject.errorMessage);
    console.log("Connection lost.");
  } else {
    console.log("Connection closed.");
  }
  client_detected = false
}
client.onMessageArrived = function(message) {
  switch (message.destinationName){
    case buttonOne:
      if(message.payloadString=="Pressed"){
        if(jump1) {
          console.log("jump.");
          player.playjumpSound()
          player.velocity.y = -4
          jump1 = false
          jump3 = true
        } else if (jump2) {
          player.playjumpSound()
          player.velocity.y = -4
          jump2 = false
          jump3 = false
        }
      }
      else{
        jump_detected = false
        if (jump3) {
          jump2 = true
        }
      }
      break
    case buttonTwo:
      if(message.payloadString=="Pressed"){
        fire_detected = true
        keys.s.pressed = true
      }
      else {
        keys.s.pressed = false
        player.width=24
        playOnce1 = true
        fire = true
      }
      break
    case eulerOne:
        console.log("yes")
      if(JSON.parse(message.payloadString).left){
        keys.a.pressed=true
      }
      else  {
        keys.a.pressed=false
      }
      if(JSON.parse(message.payloadString).right){
        keys.d.pressed=true
      }
      else {
        keys.d.pressed=false

      }
      break
    case eulerTwo:
      console.log("yes")
      break
    default:
      break
  }
}
client.connect({
  userName: 'sdi05',
  password: 'bb13ca08b476fbde0f6a0783f6632d50',
  keepAliveInterval: 5000,
  cleanSession: true,
  onSuccess: function() {
    client_detected = true
    console.log("Connected.");
    client.subscribe("sdi05/status");
    client.subscribe("sdi05/+/button");$
    client.subscribe("sdi05/+/controller");$
    client.send('sdi05/D5:2F:7E:30:10:5A/led', JSON.stringify({
      red: 0,
      green: 0,
      blue: 100
    }));
    client.send('sdi05/FC:32:FA:4B:42:DE/led', JSON.stringify({
      red: 0,
      green: 0,
      blue: 100
    }));
  },
  onFailure: function() {
    console.error("Failed to connect.");
    document.getElementById("log").textContent+= "Failed to connect.\n";
  }
});
////////////////////////////////////////////////////////////////////////////////////
// THYNGIES CONNECT
//////////////////////////////////////////////////////////////



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

  let game_on = true
  let playOnce1 = true
  let playOnce2 = true

  jump2 = false
  jump3 = false

  fire = true
  ultima = true
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
    o: {
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
    if (game_on) {
      player.checkForHorizontalCanvasCollision()
      playerDark.checkForHorizontalCanvasCollision()
      playerDark.update()
      player.update()
      player.width=24
      player2.width=24
      /*c.fillStyle = 'rgba(255,0,0,0.2)'
      c.fillRect(player.hitbox.position.x, player.hitbox.position.y, player.hitbox.width, player.hitbox.height)
      c.fillStyle = 'rgba(255,0,0,0.2)'
      c.fillRect(player2.hitbox.position.x, player2.hitbox.position.y, player2.hitbox.width, player2.hitbox.height)*/
      player.velocity.x = 0
      if (keys.d.pressed) {
        if(keys.s.pressed && (player.velocity.y !== 0)){
          player.switchSprite('go')
          player.velocity.x = 9
          player.width = 50
        }
        else{
          player.switchSprite('Run')
          player.velocity.x = 2
          player.width = 35
        }
        player.lastDirection = 'right'
      } else if (keys.a.pressed) {
        if(keys.s.pressed && (player.velocity.y !== 0)){
          player.switchSprite('goLeft')
          player.velocity.x = -9
          player.width = 50
        }
        else {
          player.switchSprite('RunLeft')
          player.velocity.x = -2
          player.width = 35
          player.lastDirection = 'left'
        }
      } else if (keys.s.pressed) {
        if (fire) {
          if (player.lastDirection === 'left') {
            player.switchSprite('Mattack1Left')
          } else {
            player.switchSprite('Mattack1')
          }
          player.createAttack()
          fire = false
        }
        player.width=45

      }else if(keys.o.pressed){
        if(ultima){
          //player.createAttackFinal()
          //ultima = false
        }
      }else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
        else player.switchSprite('IdleLeft')
      }


      if (player.velocity.y < 0) {
        if(!keys.s.pressed)player.width=24
        player.shouldPanCameraDown({canvas, camera})
        if (player.lastDirection === 'right') player.switchSprite('Jump')
        else player.switchSprite('JumpLeft')
      } else if (player.velocity.y > 0) {
        if(!keys.s.pressed)player.width=24
        player.shouldPanCameraUp({camera, canvas})
        if (player.lastDirection === 'right' && !keys.s.pressed) player.switchSprite('Fall')
        else if(!keys.s.pressed) player.switchSprite('FallLeft')
      } else if (player.velocity.y === 0) {
        jump1 = true
      }


      player2.velocity.x = 0
      if (keys.l.pressed) {
        if(keys.k.pressed && (player2.velocity.y !== 0)){
          player2.switchSprite('go')
          player2.velocity.x = 9
          player2.width = 50
        }
        else{
          player2.switchSprite('Run')
          player2.velocity.x = 2
          player2.width = 35
        }
        player2.lastDirection = 'right'
      } else if (keys.j.pressed) {
        if(keys.k.pressed && (player2.velocity.y !== 0)){
          player2.switchSprite('goLeft')
          player2.velocity.x = -9
          player2.width = 50
        }
        else {
          player2.switchSprite('RunLeft')
          player2.velocity.x = -2
          player2.width = 35
          player2.lastDirection = 'left'
        }
      } else if (keys.k.pressed) {
        if (darkFire) {
          if (player2.lastDirection === 'left') {
            player2.switchSprite('Mattack1Left')
          } else {
            player2.switchSprite('Mattack1')
          }
          player2.createAttack()
          darkFire = false
        }
        player2.width=45

      } else if (player2.velocity.y === 0) {
        if (player2.lastDirection === 'right') player2.switchSprite('Idle')
        else player2.switchSprite('IdleLeft')
      }


      if (player2.velocity.y < 0) {
        if(!keys.k.pressed)player2.width=24
        player2.shouldPanCameraDown({canvas, camera})
        if (player2.lastDirection === 'right') player2.switchSprite('Jump')
        else player2.switchSprite('JumpLeft')
      } else if (player2.velocity.y > 0) {
        if(!keys.k.pressed)player2.width=24
        player2.shouldPanCameraUp({camera, canvas})
        if (player2.lastDirection === 'right' && !keys.s.pressed) player2.switchSprite('Fall')
        else if(!keys.k.pressed) player2.switchSprite('FallLeft')
      } else if (player2.velocity.y === 0) {
        player2_jump1 = true
      }

      player.attaks1.forEach(attack => {
        if (((attack.hitbox.position.x + attack.hitbox.width) > player2.hitbox.position.x) && (attack.hitbox.position.x <= player2.position.x) ||
            ((attack.hitbox.position.x + attack.hitbox.width) > (player2.hitbox.position.x + player2.hitbox.width)) &&
            (attack.hitbox.position.x <= (player2.hitbox.position.x + player2.hitbox.width))) {
          if (((attack.hitbox.position.y + attack.hitbox.height) > player2.hitbox.position.y) && (attack.hitbox.position.y <= player2.position.y) ||
              ((attack.hitbox.position.y + attack.hitbox.height) > (player2.hitbox.position.y + player2.hitbox.height)) &&
              (attack.hitbox.position.y <= (player2.hitbox.position.y + player2.hitbox.height))) {
            if (attack.lifeTime >= 650 && !attack.hit) {
              attack.lifeTime = 640
              attack.hit = true
              player2.life = player2.life - attack.power
              if (attack.velocity.x > 0) {
                player2.velocity.x = 20
              } else {
                player2.velocity.x = -20
              }
              player2.velocity.y = -2
            }
          }
        }
      })
      player2.attaks1.forEach(attack => {
        if (((attack.hitbox.position.x + attack.hitbox.width) > player.hitbox.position.x) && (attack.hitbox.position.x <= player.position.x) ||
            ((attack.hitbox.position.x + attack.hitbox.width) > (player.hitbox.position.x + player.hitbox.width)) &&
            (attack.hitbox.position.x <= (player.hitbox.position.x + player.hitbox.width))) {
          if (((attack.hitbox.position.y + attack.hitbox.height) > player.hitbox.position.y) && (attack.hitbox.position.y <= player.position.y) ||
              ((attack.hitbox.position.y + attack.hitbox.height) > (player.hitbox.position.y + player.hitbox.height)) &&
              (attack.hitbox.position.y <= (player.hitbox.position.y + player.hitbox.height))) {
            if (attack.lifeTime >= 650 && !attack.hit) {
              attack.lifeTime = 640
              attack.hit = true
              player.life = player.life - 20
              if (attack.velocity.x > 0) {
                player.velocity.x = 20;
              } else {
                player.velocity.x = -20;
              }
              player.velocity.y = -2
            }
          }
        }
      })
      if(player.life<=0 || player2.life<=0){
        game_on = false
      }
    }
    else{
      document.querySelector('#displayText').style.display = 'flex'
      if (player.life > player2.life) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins \nPress P to \nRestart the Game'
      } else if (player2.life > player.life) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins \nPress P to \nRestart the Game'
      }
      //player.life = 300
      player.restart()
      player.position.x = 100
      player.position.y = 300
      //player2.life = 300
      player2.restart()
      player2.position.x = 400
      player2.position.y = 300
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
      case 's':
        keys.s.pressed = true
        break
      case 'w':
        if (jump1) {
          player.playjumpSound()
          player.velocity.y = -4
          jump1 = false
          jump3 = true
        } else if (jump2) {
          player.playjumpSound()
          player.velocity.y = -4
          jump2 = false
          jump3 = false
        }
        break
      case 'p':
        document.querySelector('#displayText').innerHTML = ''
        functionplayAudio()
        game_on = true;
        break
      case 'o':
        keys.o.pressed = true
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
          player2.playjumpSound()
          player2_jump1 = false
          player2_jump3 = true
        } else if (player2_jump2) {
          player2.velocity.y = -4
          player2.playjumpSound()
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
        player.width=24
        playOnce1 = true
        fire = true
        break
      case 'w':
        if (jump3) {
          jump2 = true
        }
        break
      case 'o':
        keys.o.pressed = false
        ultima = true
        break

      case 'l':
        keys.l.pressed = false
        break
      case 'j':
        keys.j.pressed = false
        break
      case 'k':
        keys.k.pressed = false
        player2.width=24
        darkFire = true
        break
      case 'i':
        if (player2_jump3) {
          player2_jump2 = true
        }
        break
    }
  })
