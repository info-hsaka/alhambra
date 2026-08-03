/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */
import { onClick } from "./canvas"

export function draw(
  /** @type {ClientState<[ReturnType<Game["setup"]>]>} */
  state,
  /** @type{Record<string, (...args: any[]) => void>} */
  moves,
) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  //background
  ctx.fillStyle = "rgb(189, 169, 127)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //Geldmarkt + Währungsanzeige von Hausmarkt
  console.log(canvas.width)
  console.log(canvas.height)
  ctx.fillStyle = "rgb(194, 114, 22)"
  ctx.fillRect(100, 100, 180, 270)
  ctx.fillRect(380, 100, 180, 270)
  ctx.fillRect(660, 100, 180, 270)
  ctx.fillRect(940, 100, 180, 270)
  ctx.fillStyle = "yellow"
  ctx.fillRect(140, 450, 90, 90)
  ctx.fillStyle = "green"
  ctx.fillRect(420, 450, 90, 90)
  ctx.fillStyle = "blue"
  ctx.fillRect(700, 450, 90, 90)
  ctx.fillStyle = "orange"
  ctx.fillRect(980, 450, 90, 90)

  //Geldkarten zeichnen
  function geldzeichnen(farbe, zahl, x, y, z) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 180, 270)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 90, 225)
    if (state.G.hausangeklickt == false) {
      onClick(x, y, 180, 270, () => {
        moves.clickGeld(z)
      })
    }
  }
  geldzeichnen(
    state.G.geldmarkt[0][0].farbe,
    state.G.geldmarkt[0][0].zahl,
    100,
    100,
    0,
  )
  geldzeichnen(
    state.G.geldmarkt[1][0].farbe,
    state.G.geldmarkt[1][0].zahl,
    380,
    100,
    1,
  )
  geldzeichnen(
    state.G.geldmarkt[2][0].farbe,
    state.G.geldmarkt[2][0].zahl,
    660,
    100,
    2,
  )
  geldzeichnen(
    state.G.geldmarkt[3][0].farbe,
    state.G.geldmarkt[3][0].zahl,
    940,
    100,
    3,
  )

  //Hauskartenfelder
  ctx.fillStyle = "rgb(230, 147, 52)"
  ctx.fillRect(110, 560, 150, 150)
  ctx.fillRect(390, 560, 150, 150)
  ctx.fillRect(670, 560, 150, 150)
  ctx.fillRect(950, 560, 150, 150)

  ctx.fillStyle = "rgb(128, 66, 9)"
  ctx.font = "100px oldstandard"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("1", 185, 635)
  ctx.fillText("2", 465, 635)
  ctx.fillText("3", 745, 635)
  ctx.fillText("4", 1025, 635)

  ctx.strokeStyle = "black"
  ctx.strokeText("1", 185, 635)
  ctx.strokeText("2", 465, 635)
  ctx.strokeText("3", 745, 635)
  ctx.strokeText("4", 1025, 635)

  //Hauskarten
  function hauszeichnen(farbe, zahl, x, y, z) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 150, 150)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 75, y + 75)
    if (state.G.hausangeklickt == false) {
      onClick(x, y, 150, 150, () => {
        moves.clickHaus(z)
      })
    }
  }
  if (state.G.hausmarkt[0] != 0) {
    hauszeichnen(
      state.G.hausmarkt[0][0].farbe,
      state.G.hausmarkt[0][0].zahl,
      110,
      560,
      0,
    )
  }
  if (state.G.hausmarkt[1] != 0) {
    hauszeichnen(
      state.G.hausmarkt[1][0].farbe,
      state.G.hausmarkt[1][0].zahl,
      390,
      560,
      1,
    )
  }
  if (state.G.hausmarkt[2] != 0) {
    hauszeichnen(
      state.G.hausmarkt[2][0].farbe,
      state.G.hausmarkt[2][0].zahl,
      670,
      560,
      2,
    )
  }
  if (state.G.hausmarkt[3] != 0) {
    hauszeichnen(
      state.G.hausmarkt[3][0].farbe,
      state.G.hausmarkt[3][0].zahl,
      950,
      560,
      3,
    )
  }
  // Hauszeichnen
  //Handkarten zeichnen
  function handkartenzeichnen(farbe, zahl, x, y, z) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 120, 180)
    ctx.fillStyle = "black"
    ctx.font = "100px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 60, y + 90)
  }
  let x = 0
  for (let i = 0; i < state.G.spielerhände[1].length; i++) {
    handkartenzeichnen(
      state.G.spielerhände[1][i].farbe,
      state.G.spielerhände[1][i].zahl,
      100 + x,
      800,
      1,
    )
    x = x + 150
  }
  /*for (let i = 0; i < state.G.spielerhände[0].length; i++) {
    handkartenzeichnen(
      state.G.spielerhände[0][i].farbe,
      state.G.spielerhände[0][i].zahl,
      380,
      800,
      0,
    )
  }*/
  //hausspeicher
  function hausspeicher(farbe, zahl, x, y, z) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 150, 150)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 75, y + 75)
  }
  if (state.G.hausspeicher.length != 0) {
    hausspeicher(
      state.G.hausspeicher[0].farbe,
      state.G.hausspeicher[0].zahl,
      100,
      1200,
      0,
    )
  }
  //Alhambragitter
  for (let spalte = 0; spalte < 5; spalte = spalte + 1) {
    for (let zeile = 0; zeile < 5; zeile++) {
      ctx.strokeStyle = "black"
      ctx.strokeRect(spalte * 150 + 350, zeile * 150 + 1200, 150, 150)
      if (state.G.hausangeklickt == true) {
        onClick(spalte * 150 + 350, zeile * 150 + 1200, 150, 150, () => {
          moves.clickFeld(spalte, zeile)
        })
      }
    }
  }
  //Karten anlegen
  function gitter(farbe, zahl, x, y, z) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 150, 150)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 75, y + 75)
  }
  for (let spalte = 0; spalte < 5; spalte++) {
    for (let zeile = 0; zeile < 5; zeile++) {
      gitter(
        state.G.spielfeld[spalte][zeile].farbe,
        state.G.spielfeld[zeile].zahl,
        100,
        1200,
        0,
      )
    }
  }
}
