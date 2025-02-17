import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    buttons: {
        "jump": {
            mouse: "left"
        },
        "move": {
            mouse: "right"
        }
    }
});

k.setGravity(1600)

const MOVE_SPEED = 480;
let direcao = -1;

k.scene("game", ()=>{
    k.loadRoot("./"); // A good idea for Itch.io publishing later
    k.loadSprite("bean", "sprites/bean.png");

    const player = k.add([
        k.sprite("bean"),
        k.pos(k.center()),
        k.area(),
        k.body()
       // , direcao > 0 ? k.move(RIGHT, MOVE_SPEED) : k.move(LEFT, MOVE_SPEED)
    ])

    k.add([
        k.rect(k.width(), 48),
        k.outline(4),
        k.area(),
        k.pos(0, k.height() - 48),
        k.body({ isStatic: true })
    ])

    k.add([
        k.color("ff0000"),
        k.rect(48, k.height()-150),
        k.outline(4),
        k.area(),
        k.pos(0, 100),
        k.body({ isStatic: true }),
        "parede"
    ])

     k.add([
        k.color("ff0000"),
        k.rect(48, k.height()-150),
        k.outline(4),
        k.area(),
        k.pos(k.width()-48, 100),
        k.body({ isStatic: true }),
        "parede"
    ])

    onButtonPress("jump", () => {
    
        // Now we'll check if the player is on the ground to make it jump
        if (player.isGrounded()) {
            // .jump() is provided by body()
            player.jump();
        }
    });

    player.onUpdate(() => {
        player.move(MOVE_SPEED * direcao, 0)
    })
    
   // onButtonDown("move", ()=>{
   //     player.move(MOVE_SPEED * direcao, 0)
   // })
    
  //  console.log(direcao)

    player.onCollide("parede", ()=>{
        direcao *= -1
      //  console.log(direcao)
    })

   
  
})

k.go("game")

