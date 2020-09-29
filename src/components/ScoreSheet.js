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
        <>
            <h2>
                <i className="fas fa-chess ChessLogo"></i>
                <div className="Event">
                    {Event} {Round && "- Round" + Round} {Date && Date}
                </div>
            </h2>

            <div className="flex-container">
                <div className="flex-item Players">
                    {White}
                    {WhiteElo !== "?" ? `(#{WhiteElo})` : ""}{" "}
                    <b>
                        <em>&#9876;</em>
                    </b>{" "}
                    {Black}
                    {BlackElo !== "?" ? `(#{BlackElo})` : ""}
                </div>
                <div className="flex-item Result">Results: {Result}</div>
            </div>
        </>
    );
}

function renderRows(startMove, game) {
    const { whiteMoves, blackMoves } = game;
    const trs = [];
    for (let i = startMove; i < startMove + 30; i++) {
        trs.push(
            <tr className={i % 2 === 0 ? "even" : "odd"} key={startMove + i}>
                <td className="ScoreSheetID">{i}</td>
                <td>{whiteMoves[i - 1] && whiteMoves[i - 1].move}</td>
                <td>{blackMoves[i - 1] && blackMoves[i - 1].move}</td>
                <td className="ScoreSheetID">{i + 30}</td>
                <td>{whiteMoves[i + 29] && whiteMoves[i + 29].move}</td>
                <td>{blackMoves[i + 29] && blackMoves[i + 29].move}</td>
            </tr>
        );
    }

    return trs;
}

function ScoreSheetMoves({ startMove, game }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="ScoreSheetID">#</th>
                    <th>White</th>
                    <th>Black</th>
                    <th className="ScoreSheetID">#</th>
                    <th>White</th>
                    <th>Black</th>
                </tr>
            </thead>
            <tbody>{renderRows(startMove, game)}</tbody>
        </table>
    );
}

function ScoreSheet({ game, index }) {
    const { headers } = game;

    return (
        <div className="ScoreSheet">
            <ScoreSheetHeader key={`header#{index}`} headers={headers} />
            <ScoreSheetMoves
                key={`sheet#{index}`}
                startMove={index * 60 + 1}
                game={game}
            ></ScoreSheetMoves>
        </div>
    );
}

function GameScoreSheets({ game, index }) {
    const page = Math.ceil(game.noOfMoves / 60);

    const sheets = [];
    for (let i = 0; i < page; i++) {
        sheets.push(
            <ScoreSheet
                key={`ScoreSheet-${i}`}
                game={game}
                index={i}
            ></ScoreSheet>
        );
    }

    return <>{sheets}</>;
}

export function Games({ pgn }) {
    let rawgames, err;

    try {
        rawgames = parser.parse(pgn);
    } catch (error) {
        err = error;
    }

    const renderGames = function (rawgames) {
        if (!rawgames || !rawgames.length) return null;
        const games = transformGames(rawgames);
        return games.map((game, index) => {
            return (
                <GameScoreSheets
                    key={`gamescoresheet-${index}`}
                    game={game}
                ></GameScoreSheets>
            );
        });
    };
    return (
        <>
            {err && (
                <div className="no-print Error">
                    Failed to parse the PGN, please check to make sure the
                    syntax is correct
                </div>
            )}
            {!err && renderGames(rawgames)}
        </>
    );
}

export default Games;
