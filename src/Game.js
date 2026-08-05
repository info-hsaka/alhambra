/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"
import { FlushAndValidate } from "boardgame.io/src/plugins/main"

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    let score = [0, 0, 0, 0]

    // Geldstapel wird befüllt
    let geldstapel = []
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

    let spielerReihenfolge = []

    // Spielerhände
    let spielerhände = []
    for (let index = 0; index < 3; index++) {
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
    // Fehler möglich 3 spieler
    while (true) {
      spielerhände[2].push(geldstapel.pop())
      let zahlen = spielerhände[2].length // 1
      let summeZahlen = 0
      for (const element of spielerhände[2]) {
        summeZahlen = element.zahl + summeZahlen
      }
      if (summeZahlen >= 20) {
        break
      }
    }
    // spielerreihenfolge
    if (
      spielerhände[0].length < spielerhände[1].length &&
      spielerhände[0].length < spielerhände[2].length
    ) {
      spielerReihenfolge = [0, 1, 2]
    } else if (
      spielerhände[1].length < spielerhände[0].length &&
      spielerhände[1].length < spielerhände[2].length
    ) {
      spielerReihenfolge = [1, 2, 0]
    } else {
      spielerReihenfolge = [2, 0, 1]
    }

    console.log(spielerReihenfolge)
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
      hausstapel.push(
        { farbe: "brown", zahl: 10 },
        { farbe: "white", zahl: 11 },
      )
    }
    for (let index = 0; index < 4; index++) {
      hausstapel.push(
        { farbe: "green", zahl: 12 },
        { farbe: "purple", zahl: 13 },
      )
    }
    hausstapel = random.Shuffle(hausstapel)

    //hausstapel füllen, fertig

    let geldmarkt = [[], [], [], []]
    let hausmarkt = [[], [], [], []]
    let hausspeicher = []
    let rundenGeld = 0
    let spielfeld = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [{ farbe: "green", zahl: "1" }], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ]
    let spielfeldRechts = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [{ farbe: "white", zahl: "1" }], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ]
    let spielfeldAFD = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [{ farbe: "blue", zahl: "1" }], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ]
    let hausangeklickt = false
    let geldbezahlt = 0
    let geklicktesHaus = 4
    let zwischenspeichergeld = []
    let ablegestapel = []
    // anzahl der farbigen häuser
    let farbigeHäuser0 = [0, 0, 0, 0, 0, 0]
    let farbigeHäuser1 = [0, 0, 0, 0, 0, 0]
    let farbigeHäuser2 = [0, 0, 0, 0, 0, 0]

    return {
      score: score,
      geldstapel: geldstapel,
      hausstapel: hausstapel,
      spielerhände: spielerhände,
      geldmarkt: geldmarkt,
      hausmarkt: hausmarkt,
      spielerReihenfolge: spielerReihenfolge,
      rundenGeld: rundenGeld,
      hausspeicher: hausspeicher,
      spielfeld: spielfeld,
      hausangeklickt: hausangeklickt,
      spielfeldRechts: spielfeldRechts,
      spielfeldAFD: spielfeldAFD,
      geldbezahlt: geldbezahlt,
      geklicktesHaus: geklicktesHaus,
      zwischenspeichergeld: zwischenspeichergeld,
      ablegestapel: ablegestapel,
      farbigeHäuser0: farbigeHäuser0,
      farbigeHäuser1: farbigeHäuser1,
      farbigeHäuser2: farbigeHäuser2,
      hausfarben: hausfarben,
    }
  },

  moves: {
    /** @type {Move} */

    clickGeld: ({ G, ctx, playerID, events, random }, z) => {
      G.spielerhände[playerID].push(G.geldmarkt[z].pop())
      events.endTurn()
    },
    clickHaus: ({ G, ctx, playerID, events, random }, z) => {
      G.hausangeklickt = true
      G.geklicktesHaus = z
      console.log(G.hausangeklickt, "Hausangeklickt ausgeführt")
    },
    clickFeld: ({ G, ctx, playerID, events, random }, spalte, zeile) => {
      if (G.spielfeld[zeile][spalte].length == 0) {
        G.spielfeld[zeile][spalte].push(G.hausspeicher.pop())
        G.hausangeklickt = false
        events.endTurn()
      }
    },
    clickFeldRechts: ({ G, ctx, playerID, events, random }, spalte, zeile) => {
      if (G.spielfeldRechts[zeile][spalte].length == 0) {
        G.spielfeldRechts[zeile][spalte].push(G.hausspeicher.pop())
        G.hausangeklickt = false
        events.endTurn()
      }
    },
    clickFeldAFD: ({ G, ctx, playerID, events, random }, spalte, zeile) => {
      if (G.spielfeldAFD[zeile][spalte].length == 0) {
        G.spielfeldAFD[zeile][spalte].push(G.hausspeicher.pop())
        G.hausangeklickt = false
        events.endTurn()
      }
    },
    clickHandkarte: ({ G, ctx, playerID, events, random }, i) => {
      if (
        G.spielerhände[playerID][i].farbe == "yellow" &&
        G.geklicktesHaus == 0
      ) {
        G.geldbezahlt = G.geldbezahlt + G.spielerhände[playerID][i].zahl
        G.zwischenspeichergeld.push(i)
      } else if (
        G.spielerhände[playerID][i].farbe == "green" &&
        G.geklicktesHaus == 1
      ) {
        G.geldbezahlt = G.geldbezahlt + G.spielerhände[playerID][i].zahl
        G.zwischenspeichergeld.push(i)
      } else if (
        G.spielerhände[playerID][i].farbe == "blue" &&
        G.geklicktesHaus == 2
      ) {
        G.geldbezahlt = G.geldbezahlt + G.spielerhände[playerID][i].zahl
        G.zwischenspeichergeld.push(i)
      } else if (
        G.spielerhände[playerID][i].farbe == "orange" &&
        G.geklicktesHaus == 3
      ) {
        G.geldbezahlt = G.geldbezahlt + G.spielerhände[playerID][i].zahl
        G.zwischenspeichergeld.push(i)
      }

      if (G.geldbezahlt >= G.hausmarkt[G.geklicktesHaus][0].zahl) {
        for (const i of G.zwischenspeichergeld) {
          G.ablegestapel.push(G.spielerhände[playerID][i])
          G.spielerhände[playerID].splice(i, 1)
        }
        G.hausspeicher.push(G.hausmarkt[G.geklicktesHaus].pop())
        G.geldbezahlt = 0
        G.geklicktesHaus = 4
      }
    },
    drawCard(ctx) {},
  },

  seed: "random-seed",

  turn: {
    order: TurnOrder.CUSTOM_FROM("spielerReihenfolge"),

    onBegin: ({ G, ctx, events, random }) => {
      //geldmarkt befüllen
      for (let i = 0; i < 4; i++) {
        if (G.geldmarkt[i].length == 0) {
          G.geldmarkt[i].push(G.geldstapel.pop())
        }
        if (G.geldmarkt[i] == "Wertungkarte1") {
          console.log("hallo")
          G.geldmarkt[i].pop()
          for (const zeile of G.spielfeld) {
            for (let spalte = 0; spalte < 5; spalte++) {
              let gebäudeFarbe = zeile[spalte][0].farbe
              for (const farben of G.hausfarben) {
                if (gebäudeFarbe == farben) {
                  G.farbigeHäuser0[hausfarben.indexOf(farben)] =
                    G.farbigeHäuser0[hausfarben.indexOf(farben)] + 1
                }
              }
            }
          }
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
    maxMoves: 100,
  },

  minPlayers: 3,
  maxPlayers: 4,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}
