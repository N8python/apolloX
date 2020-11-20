function Coin({
    x,
    y,
    value
}) {
    let xOffset = x - (player.head.position.x + 170 + 200 - 11 * (coins.toString().length - 1));
    let yOffset = y - player.head.position.y - 50;
    return {
        draw() {
            image(coin, player.head.position.x - 11 * (coins.toString().length - 1) + xOffset, player.head.position.y + yOffset, 30, 30);
            //x = player.head.position.x;
            //y = player.head.position.y;
            if (!paused) {
                xOffset += (370 - xOffset) / 15;
                yOffset += (-340 - yOffset) / 15;
            }
            //console.log(dist(player.head.position.x + xOffset, player.head.position.y + yOffset, 170, -290));
            if (dist(player.head.position.x + xOffset, player.head.position.y + yOffset, player.head.position.x + 370, player.head.position.y - 340) < 2) {
                coinList.splice(coinList.indexOf(this), 1);
                coins += value;
            }
        }
    }
}