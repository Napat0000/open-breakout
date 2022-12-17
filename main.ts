namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Hitbox = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.vy = 0 - Ball_speed_Y
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 835, 718, 255, 0, 82, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
scene.onHitWall(SpriteKind.Ball, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Left)) {
        Theball.vx = 0 - Ball_speed_X
    }
    if (sprite.isHittingTile(CollisionDirection.Right)) {
        Theball.vx = Ball_speed_X
    }
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        Theball.vy = 0 - Ball_speed_X
    }
    if (sprite.isHittingTile(CollisionDirection.Top)) {
        Theball.vy = Ball_speed_X
    }
    Block_amount += -1
    tiles.setTileAt(location, assets.tile`myTile`)
    tiles.setWallAt(location, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Ball_showed)) {
        Theball = sprites.create(img`
            . 1 1 . 
            1 1 1 1 
            1 1 1 1 
            . 1 1 . 
            `, SpriteKind.Ball)
        Theball.setPosition(Paddle.x, Paddle.y - 6)
        Hitbox = sprites.create(img`
            1 1 1 1 1 1 1 1 
            1 . . . . . . 1 
            1 . 1 1 1 1 . 1 
            1 . 1 . . 1 . 1 
            1 . 1 . . 1 . 1 
            1 . 1 1 1 1 . 1 
            1 . . . . . . 1 
            1 1 1 1 1 1 1 1 
            `, SpriteKind.Hitbox)
        Ball_speed_X = 50
        Ball_speed_Y = 50
        Turn = randint(0, 1)
        if (Turn == 0) {
            Theball.setVelocity(0 - Ball_speed_X, 0 - Ball_speed_Y)
        } else {
            Theball.setVelocity(Ball_speed_X, 0 - Ball_speed_Y)
        }
        Theball.setStayInScreen(true)
        Theball.setBounceOnWall(true)
        Hitbox.setFlag(SpriteFlag.Invisible, true)
        Hitbox.setFlag(SpriteFlag.GhostThroughWalls, true)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1, 1, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        Ball_showed = true
    }
})
function Map_setup () {
    for (let index = 0; index < Block_H_total; index++) {
        for (let index = 0; index < Block_W_total; index++) {
            tiles.setTileAt(tiles.getTileLocation(Block_W, Block_H), assets.tile`myTile0`)
            Block_W += 1
        }
        Block_W = 0
        Block_H += 1
    }
    Block_amount = Block_W_total * Block_H_total
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        tiles.setWallAt(value, true)
    }
}
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile2`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Hitbox, assets.tile`myTile0`, function (sprite, location) {
    Hit_wall += 1
    if (Hit_wall <= 1) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 3912, 3865, 255, 0, 55, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
function Game_setup () {
    Paddle = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
        1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 
        1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 
        9 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
        `, SpriteKind.Player)
    Paddle.setPosition(80, scene.screenHeight() - 10)
    Paddle.setStayInScreen(true)
    controller.moveSprite(Paddle, 100, 0)
}
let Turn = 0
let Hitbox: Sprite = null
let Paddle: Sprite = null
let Ball_speed_X = 0
let Theball: Sprite = null
let Ball_speed_Y = 0
let Block_H = 0
let Block_W = 0
let Block_W_total = 0
let Block_H_total = 0
let Block_amount = 0
let Ball_showed = false
let Hit_wall = 0
music.setVolume(255)
tiles.loadMap(tiles.createSmallMap(tilemap`level1`))
pause(2000)
Hit_wall = 0
tiles.loadMap(tiles.createSmallMap(tilemap`level6`))
Ball_showed = false
Block_amount = 0
Block_H_total = 6
Block_W_total = 20
Block_W = 0
Block_H = 0
Map_setup()
Game_setup()
game.onUpdate(function () {
    Hit_wall = 0
})
game.onUpdate(function () {
    if (Ball_showed) {
        if (Hitbox.x <= 1) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 248, 1, 255, 0, 189, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        }
        if (Hitbox.x >= scene.screenWidth() - 1) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 248, 1, 255, 0, 189, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        }
        if (Hitbox.y <= 1) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 248, 1, 255, 0, 189, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        }
    }
})
game.onUpdate(function () {
    if (Ball_showed) {
        Hitbox.setPosition(Theball.x, Theball.y)
    }
})
