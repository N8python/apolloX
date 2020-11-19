function Coin({
    x,
    y,
    value
}) {
    let xOffset = x - (player.head.position.x + 170 - 11 * (coins.toString().length - 1));
    let yOffset = y - player.head.position.y;
    return {
        draw() {
            image(coin, player.head.position.x - 11 * (coins.toString().length - 1) + xOffset, player.head.position.y + yOffset, 30, 30);
            //x = player.head.position.x;
            //y = player.head.position.y;
            xOffset += (170 - xOffset) / 15;
            yOffset += (-290 - yOffset) / 15;
            //console.log(dist(player.head.position.x + xOffset, player.head.position.y + yOffset, 170, -290));
            if (dist(player.head.position.x + xOffset, player.head.position.y + yOffset, player.head.position.x + 170, player.head.position.y - 290) < 2) {
                coinList.splice(coinList.indexOf(this), 1);
                coins += value;
            }
        }
    }
}