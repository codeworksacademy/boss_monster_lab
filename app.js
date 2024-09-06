//#region Data 💾
let heroGold = 0

const heroes = [
  {
    name: 'harriet',
    type: 'hippo',
    damage: 5,
    health: 100,
    maxHealth: 100
  },
  {
    name: 'oslo',
    type: 'orangutan',
    damage: 10,
    health: 50,
    maxHealth: 50
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}

const potion = {
  price: 10,
  recoveryPoints: 10
}

//#endregion

//#region Logic 🧠
function attackBoss() {
  let totalDamage = 0

  heroes.forEach(hero => {
    if (hero.health == 0) return
    totalDamage += hero.damage
  })

  boss.health -= totalDamage

  if (boss.health < 1) {
    boss.health = 0
    levelUpBoss()
  }

  drawBossStats()
}

function bossAttack() {
  heroes.forEach(hero => {
    hero.health -= Math.floor(boss.damage * (boss.level * Math.random()))
    if (hero.health < 1) {
      hero.health = 0
    }
  })
  checkForLoss()
  drawHeroStats()
}

function checkForLoss() {
  const youLose = heroes.every(hero => hero.health == 0)
  if (!youLose) return

  const wantsToPlayAgain = window.confirm('You lose! Play again?')
  if (!wantsToPlayAgain) return

  boss.maxHealth = 100
  boss.health = boss.maxHealth
  boss.level = 1
  drawBossStats()

  heroes.forEach(hero => hero.health = hero.maxHealth)
}

function levelUpBoss() {
  boss.level++
  boss.maxHealth = Math.floor(boss.maxHealth * (boss.level * Math.random()))
  boss.health = boss.maxHealth
  heroGold += Math.ceil(Math.random() * 100)
  drawHeroGold()
}

function healHero(heroName) {
  if (heroGold < potion.price) {
    window.alert(`You need ${potion.price - heroGold} more gold to afford a potion!`)
    return
  }

  const hero = heroes.find(hero => hero.name == heroName)
  hero.health += potion.recoveryPoints
  heroGold -= potion.price
  drawHeroGold()
  drawHeroStats()
}
//#endregion

//#region Drawing ✏️
function drawBossStats() {
  const bossHealthPercentage = Math.floor((boss.health / boss.maxHealth) * 100)

  const bossElem = document.getElementById('boss')

  const progressElem = bossElem.querySelector('.progress')
  progressElem.ariaValueNow = bossHealthPercentage.toString()
  const progressBarElem = bossElem.querySelector('.progress-bar')
  // @ts-ignore
  progressBarElem.style.width = bossHealthPercentage + '%'
}

function drawHeroStats() {
  heroes.forEach(hero => {
    const heroElem = document.getElementById(hero.name)
    const heroHealthElem = heroElem.querySelector('.health')
    // @ts-ignore
    heroHealthElem.innerText = hero.health

    const heroEmojiElem = heroElem.querySelector('.emoji')
    if (hero.health == 0) {
      heroEmojiElem.classList.add('perished')
    }
    else {
      heroEmojiElem.classList.remove('perished')
    }
  })
}

function drawHeroGold() {
  const heroGoldElem = document.getElementById('hero-gold')
  heroGoldElem.innerText = heroGold.toString()
}
//#endregion

// #region Page Load 🔃

drawHeroStats()

setInterval(bossAttack, 5000);
//#endregion