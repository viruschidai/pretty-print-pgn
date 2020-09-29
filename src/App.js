import React, { useState } from "react";
import "./App.css";
import PgnInput from "./components/PgnInput";

import Games from "./components/ScoreSheet";

const defaultGame = `
[Event "Belfort World Cup"]
[Site "Belfort FRA"]
[Date "1988.07.01"]
[EventDate "?"]
[Round "14"]
[Result "1-0"]
[White "Anatoly Karpov"]
[Black "Garry Kasparov"]
[ECO "D87"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "75"]

1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7
7.Bc4 c5 8.Ne2 Nc6 9.Be3 O-O 10.O-O Bg4 11.f3 Na5 12.Bxf7+
Rxf7 13.fxg4 Rxf1+ 14.Kxf1 Qd6 15.e5 Qd5 16.Bf2 Rd8 17.Qa4 b6
18.Qc2 Rf8 19.Kg1 Qc4 20.Qd2 Qe6 21.h3 Nc4 22.Qg5 h6 23.Qc1
Qf7 24.Bg3 g5 25.Qc2 Qd5 26.Bf2 b5 27.Ng3 Rf7 28.Re1 b4 29.Qg6
Kf8 30.Ne4 Rxf2 31.Kxf2 bxc3 32.Qf5+ Kg8 33.Qc8+ Kh7 34.Qxc5
Qf7+ 35.Kg1 c2 36.Ng3 Bf8 37.Nf5 Kg8 38.Rc1 1-0
`
function App() {
    const [pgn, setPgn] = useState(defaultGame);

    return (
        <div className="App">
            <div className="Header no-print">
                <h1 className="no-print">Pretty Print PGN</h1>
                <div className="no-print">
                    <PgnInput setPgn={setPgn}></PgnInput>
                </div>
            </div>
            <Games pgn={pgn}></Games>
        </div>
    );
}

export default App;
