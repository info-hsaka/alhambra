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
  //Geldmarkt + Währungsanzeige von Hausmarkt
  console.log(canvas.width)
  console.log(canvas.height)
  ctx.fillStyle = "rgb(194, 114, 22)"
  ctx.fillRect(100, 100, 180, 270)
  ctx.fillRect(380, 100, 180, 270)
  ctx.fillRect(660, 100, 180, 270)
  ctx.fillRect(940, 100, 180, 270)
  ctx.fillStyle = "yellow"
  ctx.fillRect(135, 450, 100, 100)
  ctx.fillStyle = "green"
  ctx.fillRect(415, 450, 100, 100)
  ctx.fillStyle = "blue"
  ctx.fillRect(695, 450, 100, 100)
  ctx.fillStyle = "orange"
  ctx.fillRect(975, 450, 100, 100)

  //Geldkarten zeichnen
  function geldzeichnen(farbe, zahl, x, y) {
    ctx.fillStyle = farbe
    ctx.fillRect(x, y, 180, 270)
    ctx.fillStyle = "black"
    ctx.font = "100px Arial"
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
  ctx.fillStyle = "rgb(194, 114, 22)"
  ctx.fillRect(135, 450, 150, 150)
  ctx.fillRect(415, 450, 100, 100)
  ctx.fillRect(695, 450, 100, 100)
  ctx.fillRect(975, 450, 100, 100)
}
