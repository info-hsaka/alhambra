/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    let score = [0, 0, 0, 0]
    let geldstapel = []
    // Geldstapel wird befüllt
      let geldzahlen = [1,2,3,4,5,6,7,8,9]
      let geldfarben = ["blau", "gelb", "grün", "orange"]
      for (let x = 0; x < 3; x++) {
        for (const zahl of geldzahlen) {
          for (const farbe of geldfarben) {
           let neueKarte = {farbe: farbe, zahl: zahl}
           geldstapel.push(neueKarte)
      }
      }
      }
      // Geldstapel wird befüllt, fertig

      let hausstapel = []
      // hausstapel füllen
      let hausfarben = ["blau", "rot", "braun", "weiß", "gruen", "lila"]

       for (let i = 0; i < 7; i++) {
       let x = 8
       for (const hausfarbe of hausfarben) {
       let neueHauskarte = {farbe: hausfarbe, zahl: x }
       x= x+1
       hausstapel.push(neueHauskarte)


      }
      }
      for (let index = 0; index < 2; index++) {
        hausstapel.push({farbe: "braun", zahl: 10 },{farbe: "weiß", zahl: 11 })

      }
     for (let index = 0; index < 4; index++) {
        hausstapel.push({farbe: "gruen", zahl: 12 },{farbe: "lila", zahl: 13 })

      }
      //hausstapel füllen, fertig
    return { score: score, geldstapel: geldstapel, hausstapel: hausstapel }
  },

  moves: {
    /** @type {Move} */
    playCard: ({ G, ctx, playerID, events, random }, cardIndex) => {},
    drawCard(ctx) {},
  },

  seed: "random-seed",

  turn: {
    order: TurnOrder.DEFAULT,

    onBegin: ({ G, ctx, events, random }) => {},
    onEnd: ({ G, ctx, events, random }) => {},

    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 4,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}

