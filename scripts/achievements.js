function displayAchievement({ title, desc, opacity, index }) {
    const xOffset = gameState === "play" ? (player.head.position.x - 300) : (gameState === "play" ? 0 : -25);
    const yOffset = gameState === "play" ? (player.head.position.y - 300) : (gameState === "play" ? 0 : 500);
    fill(150, 150, 150, opacity * 255);
    rect(xOffset + 212.5 - (index % 3) * 200, yOffset + 0 + floor(index / 3) * 100, 201, 100);
    fill(255, 255, 255, opacity * 255);
    textAlign(CENTER);
    textSize(25);
    text(title, xOffset + 312.5 - (index % 3) * 200, yOffset + 30 + floor(index / 3) * 100);
    textSize(13);
    text(desc, xOffset + 312.5 - (index % 3) * 200, yOffset + 50 + floor(index / 3) * 100);
}

function displayHatUnlock({ hat, opacity, index }) {
    fill(150, 150, 150, opacity * 255);
    rect((player.head.position.x - 300) + 400 - (index % 3) * 200, (player.head.position.y - 300) + 500 - floor(index / 3) * 100, 201, 100);
    fill(255, 255, 255, opacity * 255);
    textAlign(CENTER);
    textSize(25);
    text(hat + "\nUnlocked!", (player.head.position.x - 300) + 500 - (index % 3) * 200, (player.head.position.y - 300) + 550 - floor(index / 3) * 100);
}
/*const pieceOfCake = { title: "Piece of Cake", desc: "Beat easy difficulty. \n Easiest achievement of all time.", hatsUnlocked: ["cake"] };
const fightScene = { title: "Fight Scene", desc: "Beat medium difficulty. \n A decent challenge.", hatsUnlocked: ["cap"] };
const axeTheHead = { title: "Axe the Head", desc: "Beat hard difficulty. \n Only true legends make it this far.", hatsUnlocked: ["axe"] };
const undying = { title: "Undying", desc: "Beat insane difficulty. \n How long have you been playing?", hatsUnlocked: ["voidhat"] };
const headsUp = { title: "Heads Up", desc: "Hit someone’s decapitated head.", hatsUnlocked: ["head"] };
const strangerDanger = { title: "Stranger Danger", desc: "Win a multiplayer duel." };
const gg = { title: "GG", desc: "Win a game in thirty seconds \nor less." }
const ggNoob = { title: "GG Noob", desc: "Win a game in fifteen seconds \nor less." };
const lolGGEz = { title: "Lol GG Ez", desc: "Win a game in ten seconds \nor less.", hatsUnlocked: ["tongue"] };
const gitGud = { title: "Git Gud", desc: "Lose a game after fighting \nten seconds or less.", hatsUnlocked: ["cry"] };
const lastStand = { title: "Last Stand", desc: "Lose a game after fighting \nfor a minute or more." };
const stylish = { title: "Stylish", desc: "Be obsessed with the hats. Think about \nthem in your sleep and change them constantly.", hatsUnlocked: ["bowtie"] };
const neverGiveUp = { title: "Never Give Up", desc: "Evade death for 60 full seconds \nafter being disarmed.", hatsUnlocked: ["potato"] };
const hatTrick = { title: "Hat Trick", desc: "Win three games in a row.", hatsUnlocked: ["ball"] };
const fiver = { title: "Fiver", desc: "Win five games in a row." };
const hamilton = { title: "Hamilton", desc: "Win ten games in a row.", hatsUnlocked: ["hamilton"] };
const benFranklin = { title: "Ben Franklin", desc: "Win a hundred games in a row.", hatsUnlocked: ["ben"] };
const technoblade = { title: "Technoblade", desc: "Play two hundred games.", hatsUnlocked: ["techno"] };
const hacker = { title: "Hacker", desc: "For extremely cool people only, so you have to figure it out.", hatsUnlocked: ["sunglasses"] };
*/
const firstBlood = { title: "First Blood", desc: "Kill an enemy." };
const secondBlood = { title: "Second Blood", desc: "Get killed by an enemy \n(or just die like a noob)." };
const bigBrain = { title: "Big Brain", desc: "Open the instructions screen." };
const clutchGod = { title: "Clutch God", desc: "Win a level with less than\n one fifth of your health\n remaining." };
const spaceEagle = { title: "Space Eagle", desc: "Acquire the pistol." };
const roundTable = { title: "Round Table", desc: "Acquire the laser lance." };
const rubiedOn = { title: "Rubied On", desc: "Acquire the railgun." };
const fourthState = { title: "Fourth State", desc: "Acquire the plasma rifle." };
const mobyStar = { title: "Moby's Star", desc: "Acquire the harpoon." };
const medic = { title: "Medic", desc: "Use a health power up." };
const bodyBuilder = { title: "Body Builder", desc: "Use a strength power up." };
const doctor = { title: "Doctor", desc: "Upgrade the health power up." };
const hercules = { title: "Hercules", desc: "Upgrade the strength power up." };
const tickSpeed = { title: "Tick Speed", desc: "Upgrade the speed at which a \npower up spawns." };
const steroids = { title: "Steroids", desc: "Upgrade your character’s damage\n and health a total of\n 15 times." };
const jeffBezos = { title: "Jeff Bezos", desc: "Have 999 coins in the bank." };
const johnDRockefeller = { title: "John D. Rockefeller", desc: "Have 9999 coins in the bank." };
const mansaMusa = { title: "Mansa Musa", desc: "Have 99999 coins in the bank." };
const moonLanding = { title: "Moon Landing", desc: "Beat all 10 levels of\nthe main game." }
const georgeWashington = { title: "George Washington", desc: "Complete one wave on endless." };
const theSenses = { title: "The Senses", desc: "Complete five waves on endless." };
const alexanderHamilton = { title: "Alexander Hamilton", desc: "Complete ten waves on endless." };
const allTheSenses = { title: "All the Senses", desc: "Complete twenty one waves\n on endless." };
const tinPentecost = { title: "Tin Pentecost", desc: "Complete fifty waves on endless." };
const benFranklin = { title: "Ben Franklin", desc: "Complete one hundred waves\n on endless." };
const headsUp = { title: "Heads Up", desc: "Play with an enemy's \n decapitated head." };
const sweatlord = { title: "Sweatlord", desc: "Complete all achievements\n (except this one)." };
const displayHats = {
    "spaceHelmet": "Space Helmet",
}
const achievementList = [firstBlood, secondBlood, bigBrain, clutchGod, spaceEagle, roundTable, rubiedOn, fourthState, mobyStar, medic, bodyBuilder, doctor, hercules, tickSpeed, steroids, jeffBezos, johnDRockefeller, mansaMusa, moonLanding, georgeWashington, theSenses, alexanderHamilton, allTheSenses, tinPentecost, benFranklin, headsUp, sweatlord];
const achievements = {
    currAchievements: [],
    currHatsUnlocked: [],
    add({ title, desc, hatsUnlocked }) {
        if (hatsUnlocked) {
            localProxy.unlockedHats = localProxy.unlockedHats.concat(...hatsUnlocked);
        }
        if (!localProxy.achievements.includes(title)) {
            localProxy.achievements = localProxy.achievements.concat(title);
            this.currAchievements.push({ title, desc, step: 0 });
            if (hatsUnlocked) {
                this.currHatsUnlocked.push(...hatsUnlocked.map(x => ({ hat: displayHats[x], step: 0 })));
            }
        }
    },
    render() {
        this.currAchievements.forEach((a, i) => {
            let opacity;
            if (a.step < 60) {
                opacity = a.step / 60;
            } else if (a.step < 180) {
                opacity = 1;
            } else {
                opacity = (240 - a.step) / 60;
            }
            displayAchievement({ title: a.title, desc: a.desc, opacity, index: i });
            a.step++;
            if (a.step > 240) {
                this.currAchievements.splice(i, 1);
            }
        });
        this.currHatsUnlocked.forEach((h, i) => {
            let opacity;
            if (h.step < 60) {
                opacity = h.step / 60;
            } else if (h.step < 180) {
                opacity = 1;
            } else {
                opacity = (240 - h.step) / 60;
            }
            displayHatUnlock({ hat: h.hat, opacity, index: i });
            h.step++;
            if (h.step > 240) {
                this.currHatsUnlocked.splice(i, 1);
            }
        })
    }
}