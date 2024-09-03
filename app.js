//#region Data
const heroes = [
  {
    name: 'harriet',
    type: 'hippo',
    damage: 5,
    health: 100
  },
  {
    name: 'oslo',
    type: 'orangutan',
    damage: 10,
    health: 50
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
    totalDamage += hero.damage
  })
  boss.health -= totalDamage
}
//#endregion

//#region Draw

//#endregion