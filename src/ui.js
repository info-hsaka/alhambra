/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

export function draw(
  /** @type {ClientState<[ReturnType<Game["setup"]>]>} */
  state,
  /** @type{Record<string, (...args: any[]) => void>} */
  moves,
) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
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
  function geldzeichnen(farbe, zahl, x, y) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 180, 270)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 90, 225)
  }
  console.log(state.G.geldmarkt)
  geldzeichnen(
    state.G.geldmarkt[0][0].farbe,
    state.G.geldmarkt[0][0].zahl,
    100,
    100,
  )
  geldzeichnen(
    state.G.geldmarkt[1][0].farbe,
    state.G.geldmarkt[1][0].zahl,
    380,
    100,
  )
  geldzeichnen(
    state.G.geldmarkt[2][0].farbe,
    state.G.geldmarkt[2][0].zahl,
    660,
    100,
  )
  geldzeichnen(
    state.G.geldmarkt[3][0].farbe,
    state.G.geldmarkt[3][0].zahl,
    940,
    100,
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
  function hauszeichnen(farbe, zahl, x, y) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 150, 150)
    ctx.fillStyle = "black"
    ctx.font = "120px oldstandard"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(zahl, x + 75, y + 75)
    ctx.strokeRect(140, 600, 80, 80)
  }
  console.log(state.G.hausmarkt)
  hauszeichnen(
    state.G.hausmarkt[0][0].farbe,
    state.G.hausmarkt[0][0].zahl,
    110,
    560,
  )
  hauszeichnen(
    state.G.hausmarkt[1][0].farbe,
    state.G.hausmarkt[1][0].zahl,
    390,
    560,
  )
  hauszeichnen(
    state.G.hausmarkt[2][0].farbe,
    state.G.hausmarkt[2][0].zahl,
    670,
    560,
  )
  hauszeichnen(
    state.G.hausmarkt[3][0].farbe,
    state.G.hausmarkt[3][0].zahl,
    950,
    560,
  )
  // Hauszeichnen
}
