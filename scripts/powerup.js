function PowerUp({
    x,
    y,
    icon,
    fillColor,
    borderColor
}) {
    let tick = 0;
    let xVel = random(-5, 5);
    let yVel = random(-5, 5);
    return {
        draw() {
            const enterScale = min((tick + 1) / 60, 1);
            if (!paused) {
                x += xVel * cos(tick / 100);
                y += yVel * sin(tick / 100);
                xVel += (Math.random() - 0.5) * 0.025;
                yVel += (Math.random() - 0.5) * 0.025;
                if (dist(x, y, player.x, player.y) > 150) {
                    const toPlayer = vecTo(x, y, player.x, player.y, 0.025);
                    xVel += toPlayer.x;
                    yVel += toPlayer.y;
                }
                xVel *= 0.99;
                yVel *= 0.99;
            }
            stroke(borderColor);
            strokeWeight(3);
            fill(fillColor);
            circle(x, y, 30 * enterScale);
            imageMode(CENTER);
            image(icon, x + icon.xOffset, y + icon.yOffset, 25 * icon.scale * enterScale, 25 * icon.scale * enterScale);
            imageMode(CORNER);
            stroke(0);
            strokeWeight(1);
            if (!paused) {
                tick++;
            }
            if ((dist(x, y, player.x, player.y) < 50)) {
                sounds.pop.setVolume(2 * localProxy.sfxVolume);
                sounds.pop.play();
                powerupList.splice(powerupList.indexOf(this), 1);
                if (icon === powerups.heart) {
                    player.applyEffect("heal");
                } else if (icon === powerups.sword) {
                    player.applyEffect("strength");
                }
            }
        },
        get x() {
            return x;
        },
        get y() {
            return y;
        }
    }
}

const healthPowerup = (x, y) => PowerUp({
    x,
    y,
    fillColor: [200, 200, 200],
    borderColor: [255, 125, 125],
    icon: powerups.heart
});

const damagePowerup = (x, y) => PowerUp({
    x,
    y,
    fillColor: [0, 0, 255],
    borderColor: [125, 125, 255],
    icon: powerups.sword
});