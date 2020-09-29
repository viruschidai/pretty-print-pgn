// Format the games from parser to something easier to use in views
// Mainly convert the headers to an object from an array
function transformGames(rawGames) {
    if (!rawGames) return [];
    return rawGames.map(transformGame)
}

function transformGame(rawGame) {
    const headers = {};
    rawGame.headers.forEach((item) => {
        headers[item.name] = item.value;
    });

    const whiteMoves = [], blackMoves = [];
    rawGame.moves.forEach((move, index) => {
        if (index % 2 === 0) {
            whiteMoves.push(move)
        } else {
            blackMoves.push(move)
        }
    })

    return {
        headers: headers,
        whiteMoves,
        blackMoves,
        noOfMoves: whiteMoves.length,
        result: rawGame.result,
    }
}

export default transformGames;
