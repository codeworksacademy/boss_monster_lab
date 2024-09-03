//#region Data
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
//#endregion

//#region Logic
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

  boss.health = boss.maxHealth
  boss.level = 1
  drawBossStats()

  heroes.forEach(hero => hero.health = hero.maxHealth)
}

function levelUpBoss() {
  boss.level++
  boss.maxHealth = Math.floor(boss.maxHealth * (boss.level * Math.random()))
  boss.health = boss.maxHealth
}
//#endregion

//#region Draw
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
//#endregion

// #region Page Load

drawHeroStats()

setInterval(bossAttack, 5000);
//#endregion