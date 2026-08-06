function häuserScoring(farbIndex) {
  let anzahlen = [
    {
      player: 0,
      anzahl: G.farbigeHäuser0[farbIndex],
    },
    {
      player: 1,
      anzahl: G.farbigeHäuser1[farbIndex],
    },
    {
      player: 2,
      anzahl: G.farbigeHäuser2[farbIndex],
    },
  ]
  anzahlen.sort((a, b) => b.anzahl - a.anzahl)
  let result = [[anzahlen[0].player], [], []]

  let previousIndex = 0
  for (let i = 1; i < 3; i++) {
    if (anzahlen[i].anzahl < anzahlen[i - 1].anzahl) {
      previousIndex++
    }
    result[previousIndex].push(anzahlen[i].player)
  }
  return result
}

export function score1(farbIndex) {
  let farbWerte = [1, 2, 3, 4, 5, 6]
  let sortedPlayers = häuserScoring(farbIndex)
  let numPlayers = sortedPlayers[0].length
  let scorePerPlayer = Math.floor(farbWerte[farbIndex] / numPlayers)
  let resultScorePerPlayer = [0, 0, 0]
  for (const playerNumber of sortedPlayers[0]) {
    resultScorePerPlayer[playerNumber] = scorePerPlayer
  }
  return resultScorePerPlayer
}

export function score2(farbIndex) {
  let farbWerte2 = [1, 2, 3, 4, 5, 6]
  let farbWerte1 = [8, 9, 10, 11, 12, 13]
  let sortedPlayers = häuserScoring(farbIndex)
  let numBestPlayers = sortedPlayers[0].length
  let gleichstand = numBestPlayers == 2
  let resultScorePerPlayer = [0, 0, 0]
  if (!gleichstand) {
    //Score für besten Spieler
    resultScorePerPlayer[sortedPlayers[0]] = farbWerte1[farbIndex]

    //Score für Platz zwei mit potentiellem Gleichstand
    let numPlayers = sortedPlayers[1].length
    let tempScorePerPlayer = Math.floor(
      farbWerte2[farbIndex] / numPlayers,
    )

    for (const playerNumber of sortedPlayers[1]) {
      resultScorePerPlayer[playerNumber] = tempScorePerPlayer
    }
    return resultScorePerPlayer
  } else {
    let tempScorePerPlayer = Math.floor(
      (farbWerte1[farbIndex] + farbWerte2[farbIndex]) / 2,
    )
    for (const playerNumber of sortedPlayers[0]) {
      resultScorePerPlayer[playerNumber] = tempScorePerPlayer
    }
  }
  return resultScorePerPlayer
}

export function score3(farbIndex) {
  let farbWerte3 = [1, 2, 3, 4, 5, 6]
  let farbWerte2 = [8, 9, 10, 11, 12, 13]
  let farbWerte1 = [16, 17, 18, 19, 20, 21]
  let sortedPlayers = häuserScoring(farbIndex)
  let resultScorePerPlayer = [0, 0, 0]

  //Score für beste Spieler
  let numBestPlayers = sortedPlayers[0].length

  if (numBestPlayers == 1) {
    resultScorePerPlayer[sortedPlayers[0][0]] = farbWerte1
  } else if (numBestPlayers == 2) {
    let tempScorePerPlayer = Math.floor(
      (farbWerte1[farbIndex] + farbWerte2[farbIndex]) / 2,
    )
    for (const playerNumber of sortedPlayers[0]) {
      resultScorePerPlayer[playerNumber] = tempScorePerPlayer
    }
  } else {
    //numBestPlayers == 3 right here
    let tempScorePerPlayer = Math.floor(
      (farbWerte1[farbIndex] +
        farbWerte2[farbIndex] +
        farbWerte3[farbIndex]) /
        3,
    )
    for (const playerNumber of sortedPlayers[0]) {
      resultScorePerPlayer[playerNumber] = tempScorePerPlayer
    }
    return resultScorePerPlayer
  }
  //Score für zweitbeste Spieler
  let numSecondBestPlayers = sortedPlayers[1].length
  if (numBestPlayers == 1) {
    if (numSecondBestPlayers == 1) {
      resultScorePerPlayer[sortedPlayers[1][0]] =
        farbWerte2[farbIndex]
    } else {
      //numSecondBestPlayers == 2 right here
      let tempScorePerPlayer = Math.floor(
        (farbWerte2[farbIndex] + farbWerte3[farbIndex]) / 2,
      )
      for (const playerNumber of sortedPlayers[1]) {
        resultScorePerPlayer[playerNumber] = tempScorePerPlayer
      }
    }
  } else {
    let tempScorePerPlayer = Math.floor(farbWerte3[farbIndex] / 2)
    for (const playerNumber of sortedPlayers[1]) {
      resultScorePerPlayer[playerNumber] = tempScorePerPlayer
    }
  }

  if (sortedPlayers[0].length + sortedPlayers[1].length == 3) {
    return resultScorePerPlayer
  }

  //Score für drittbeste Spieler
  resultScorePerPlayer[sortedPlayers[2][0]] = farbWerte3[farbIndex]

  return resultScorePerPlayer
}