/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"
import { FlushAndValidate } from "boardgame.io/src/plugins/main"

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    let score = [0, 0, 0, 0]
    let geldstapel = []
    // Geldstapel wird befüllt
    let geldzahlen = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let geldfarben = ["blue", "yellow", "green", "orange"]
    for (let x = 0; x < 3; x++) {
      for (const zahl of geldzahlen) {
        for (const farbe of geldfarben) {
          let neueKarte = { farbe: farbe, zahl: zahl }
          geldstapel.push(neueKarte)
        }
      }
    }
    geldstapel = random.Shuffle(geldstapel)

    // Spielerhände
    let spielerhände = []
    for (let index = 0; index < 2; index++) {
      let hand = []
      spielerhände.push(hand) //Karten in hand geben, in spielerhände zwei leere arrays (jetzt)
    }
    // {farbe: zahl:}
    // [[],[{farbe:blau, Zahl: 3},{}]]
    // karten aufteilen
    while (true) {
      spielerhände[1].push(geldstapel.pop()) // Karte ziehen
      let zahlen = spielerhände[1].length // 1
      let summeZahlen = 0
      for (const element of spielerhände[1]) {
        summeZahlen = element.zahl + summeZahlen
      }
      if (summeZahlen >= 20) {
        break
      }
    }
    while (true) {
      spielerhände[0].push(geldstapel.pop())
      let zahlen = spielerhände[0].length // 1
      let summeZahlen = 0
      for (const element of spielerhände[0]) {
        summeZahlen = element.zahl + summeZahlen
      }
      if (summeZahlen >= 20) {
        break
      }
    }
    // karten aufteilen fertig
    // geldstapel aufteilen
    let geldstapel1 = []
    let geldstapel2 = []
    let geldstapel3 = []
    let geldstapel4 = []
    let geldstapel5 = []
    let geldhaufen = [
      geldstapel1,
      geldstapel2,
      geldstapel3,
      geldstapel4,
      geldstapel5,
    ]

    let x = 0
    while (geldstapel.length != 0) {
      geldhaufen[x].push(geldstapel.pop())
      x = x + 1
      x = x % geldhaufen.length
    }

    let Wertungskarte1 = "Wertungskarte1"
    let Wertungskarte2 = "Wertungskarte2"
    geldstapel2.push(Wertungskarte1)
    geldstapel4.push(Wertungskarte2)

    geldstapel2 = random.Shuffle(geldstapel2)
    geldstapel4 = random.Shuffle(geldstapel4)
    // geldstapel aufteilen ferig
    function geldstapelStapeln(x) {
      while (x.length != 0) {
        geldstapel.push(x.pop())
      }
    }
    geldstapelStapeln(geldstapel5)
    geldstapelStapeln(geldstapel4)
    geldstapelStapeln(geldstapel3)
    geldstapelStapeln(geldstapel2)
    geldstapelStapeln(geldstapel1)

    // Geldstapel wird befüllt, fertig

    let hausstapel = []
    // hausstapel füllen
    let hausfarben = ["blue", "red", "brown", "white", "green", "purple"]

    for (let i = 0; i < 7; i++) {
      let x = 8
      for (const hausfarbe of hausfarben) {
        let neueHauskarte = { farbe: hausfarbe, zahl: x }
        x = x + 1
        hausstapel.push(neueHauskarte)
      }
    }
    for (let index = 0; index < 2; index++) {
      hausstapel.push({ farbe: "braun", zahl: 10 }, { farbe: "weiß", zahl: 11 })
    }
    for (let index = 0; index < 4; index++) {
      hausstapel.push({ farbe: "gruen", zahl: 12 }, { farbe: "lila", zahl: 13 })
    }
    hausstapel = random.Shuffle(hausstapel)

    //hausstapel füllen, fertig

    let geldmarkt = [[], [], [], []]
    let hausmarkt = [[], [], [], []]
    return {
      score: score,
      geldstapel: geldstapel,
      hausstapel: hausstapel,
      spielerhände: spielerhände,
      geldmarkt: geldmarkt,
      hausmarkt: hausmarkt,
    }
  },

  moves: {
    /** @type {Move} */
    clickGeld: ({ G, ctx, playerID, events, random }, z) => {
      G.geldmarkt[z][0].pop()
    },
    clickHaus: ({ G, ctx, playerID, events, random }, z) => {
      G.hausmarkt[z][0].pop()
    },
    drawCard(ctx) {},
  },

  seed: "random-seed",

  turn: {
    order: TurnOrder.DEFAULT,

    onBegin: ({ G, ctx, events, random }) => {
      //geldmarkt befüllen
      for (let i = 0; i < 4; i++) {
        if (G.geldmarkt[i].length == 0) {
          G.geldmarkt[i].push(G.geldstapel.pop())
        }
      }
      for (let i = 0; i < 4; i++) {
        if (G.hausmarkt[i].length == 0) {
          G.hausmarkt[i].push(G.hausstapel.pop())
        }
      }
    },
    onEnd: ({ G, ctx, events, random }) => {},

    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 4,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}
