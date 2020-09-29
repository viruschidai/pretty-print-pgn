import React from "react";
import parser from "../models/parser";
import "./ScoreSheet.css";
import transformGames from "../models/game";

function ScoreSheetHeader({ headers }) {
    const {
        Event,
        White,
        Black,
        Result,
        Date,
        WhiteElo,
        BlackElo,
        Round,
    } = headers;
    return (
        <div className="ScoreSheetHeader">
            <h2>
                <i
                    className="fas fa-chess logo"
                    style={{ "font-size": "36px" }}
                ></i>
                <div className="Event">
                    {Event} {Round && '- Round' + Round} {Date && Date}
                </div>
            </h2>

            <div className="flex-container">
                <div className="flex-item Players">
                    {White}{WhiteElo !== "?" ? `(#{WhiteElo})` : ""} <b><em>&#9876;</em></b> {Black}{BlackElo !== "?" ? `(#{BlackElo})` : ""}
                </div>
                <div className="flex-item Result">Results: {Result}</div>
            </div>
        </div>
    );
}

function ScoreSheetMoves({startMove, game}) {

    function renderRows(startMove, game) {
        const {whiteMoves, blackMoves} = game;
        const trs = [];
        for (let i = startMove; i < startMove + 30; i++) {
            console.log('inside loop = ', startMove)
            trs.push(
                <tr className={i % 2 === 0 ? "even" : "odd"} key={startMove + i}>
                    <td className="ScoreSheetID">{i}</td>
                    <td>
                        {whiteMoves[i-1] && whiteMoves[i - 1].move  }
                    </td>
                    <td>
                        {blackMoves[i - 1] && blackMoves[i - 1].move }
                    </td>
                    <td className="ScoreSheetID">{i + 30}</td>
                    <td>
                        {whiteMoves[i + 29] && whiteMoves[i + 29].move  }
                    </td>
                    <td>
                        {blackMoves[i + 29] && blackMoves[i + 29].move }
                    </td>
                </tr>
            );
        }

        return trs;
    }

    return <div className="ScoreSheetMoves">
        <table>
            <tr>
                <th>#</th>
                <th>White</th>
                <th>Black</th>
                <th>#</th>
                <th>White</th>
                <th>Black</th>
            </tr>
            { renderRows(startMove, game) }
        </table>
    </div>
}

function ScoreSheet({ game, index }) {
    const { headers } = game;

    return (
        <div className='ScoreSheet'>
            <ScoreSheetHeader key={`header#{index}`} headers={headers} />
            <ScoreSheetMoves key={`sheet#{index}`} startMove={index * 60 + 1} game={game} ></ScoreSheetMoves>
        </div>
    );
}

function GameScoreSheets({ game }) {
    const page = Math.ceil(game.noOfMoves / 60);

    const sheets = [];
    for (let i=0; i<page; i++) {
        sheets.push(<ScoreSheet game={game} index={i}></ScoreSheet>)
    }
   
    return <div className="GameScoreSheets">
        { sheets }
    </div>;
}

export function Games({ pgn }) {
    let rawgames, err;

    try {
        console.log('pgn -----', pgn)
        rawgames = parser.parse(pgn);
        console.log('rawgames after parsing = ', rawgames)
    } catch (error) {
        console.log("err  in Games =", error);
        err = error;
    }

    const renderGames =  function(rawgames) {
        if (!rawgames || !rawgames.length) return null;
        const games = transformGames(rawgames)
        return games.map(game => {
            return <GameScoreSheets game={game}></GameScoreSheets>
        })
    }             
    return (
        <div className="Games">
            {err && (
                <div className="no-print Error">
                    Failed to parse the PGN, please check to make sure the
                    syntax is correct
                </div>
            )}

            { !err && renderGames(rawgames) }
        </div>
    );
}


export default Games;
