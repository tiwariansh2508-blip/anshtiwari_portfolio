
import { useState, useCallback, useMemo } from 'react';

type Piece =
  | 'P' | 'N' | 'B' | 'R' | 'Q' | 'K'
  | 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
  | null;

type Board = Piece[][];
type Position = [number, number];

const initialBoard: Board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const pieceSymbols: Record<string, string> = {
  K: '\u2654',
  Q: '\u2655',
  R: '\u2656',
  B: '\u2657',
  N: '\u2658',
  P: '\u2659',
  k: '\u265A',
  q: '\u265B',
  r: '\u265C',
  b: '\u265D',
  n: '\u265E',
  p: '\u265F',
};

const fileChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const isWhite = (piece: Piece) =>
  piece !== null && piece === piece.toUpperCase();

const isBlack = (piece: Piece) =>
  piece !== null &&
  piece === piece.toLowerCase() &&
  piece !== piece.toUpperCase();

function inBounds(r: number, c: number) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function getRawMoves(board: Board, r: number, c: number): Position[] {
  const piece = board[r][c];

  if (!piece) return [];

  const white = isWhite(piece);
  const moves: Position[] = [];
  const type = piece.toUpperCase();

  const addIfEmptyOrEnemy = (r2: number, c2: number) => {
    if (!inBounds(r2, c2)) return false;

    const target = board[r2][c2];

    if (target === null) {
      moves.push([r2, c2]);
      return true;
    }

    if (white !== isWhite(target)) {
      moves.push([r2, c2]);
    }

    return false;
  };

  if (type === 'P') {
    const dir = white ? -1 : 1;
    const startRow = white ? 6 : 1;

    if (inBounds(r + dir, c) && board[r + dir][c] === null) {
      moves.push([r + dir, c]);

      if (
        r === startRow &&
        inBounds(r + 2 * dir, c) &&
        board[r + 2 * dir][c] === null
      ) {
        moves.push([r + 2 * dir, c]);
      }
    }

    for (const dc of [-1, 1]) {
      const nr = r + dir;
      const nc = c + dc;

      if (!inBounds(nr, nc)) continue;

      const target = board[nr][nc];

      if (target !== null && white !== isWhite(target)) {
        moves.push([nr, nc]);
      }
    }
  } else if (type === 'N') {
    const knightMoves: Position[] = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (const [dr, dc] of knightMoves) {
      addIfEmptyOrEnemy(r + dr, c + dc);
    }
  } else if (type === 'B' || type === 'R' || type === 'Q') {
    const directions: Position[] = [];

    if (type === 'B' || type === 'Q') {
      directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    }

    if (type === 'R' || type === 'Q') {
      directions.push([0, 1], [0, -1], [1, 0], [-1, 0]);
    }

    for (const [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;

      while (inBounds(nr, nc)) {
        const target = board[nr][nc];

        if (target === null) {
          moves.push([nr, nc]);
        } else {
          if (white !== isWhite(target)) {
            moves.push([nr, nc]);
          }

          break;
        }

        nr += dr;
        nc += dc;
      }
    }
  } else if (type === 'K') {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        addIfEmptyOrEnemy(r + dr, c + dc);
      }
    }
  }

  return moves;
}

function findKing(board: Board, white: boolean): Position | null {
  const king = white ? 'K' : 'k';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === king) return [r, c];
    }
  }

  return null;
}

function isInCheck(board: Board, white: boolean): boolean {
  const kingPos = findKing(board, white);

  if (!kingPos) return false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];

      if (piece && isWhite(piece) !== white) {
        const moves = getRawMoves(board, r, c);

        if (
          moves.some(
            ([mr, mc]) => mr === kingPos[0] && mc === kingPos[1],
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

function getLegalMoves(board: Board, r: number, c: number): Position[] {
  const piece = board[r][c];

  if (!piece) return [];

  const white = isWhite(piece);
  const rawMoves = getRawMoves(board, r, c);

  return rawMoves.filter(([nr, nc]) => {
    const testBoard = cloneBoard(board);
    testBoard[nr][nc] = piece;
    testBoard[r][c] = null;

    return !isInCheck(testBoard, white);
  });
}

function hasAnyLegalMove(board: Board, white: boolean): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];

      if (piece && isWhite(piece) === white) {
        if (getLegalMoves(board, r, c).length > 0) return true;
      }
    }
  }

  return false;
}

export function ChessBoard() {
  const [board, setBoard] = useState<Board>(() => cloneBoard(initialBoard));
  const [selected, setSelected] = useState<Position | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [legalMoves, setLegalMoves] = useState<Position[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{
    from: Position;
    to: Position;
  } | null>(null);
  const [status, setStatus] = useState('White to move');

  const check = useMemo(
    () => isInCheck(board, turn === 'white'),
    [board, turn],
  );

  const checkmate = useMemo(
    () => check && !hasAnyLegalMove(board, turn === 'white'),
    [board, turn, check],
  );

  const stalemate = useMemo(
    () => !check && !hasAnyLegalMove(board, turn === 'white'),
    [board, turn, check],
  );

  const handleSquareClick = useCallback(
    (r: number, c: number) => {
      if (checkmate || stalemate) return;

      const piece = board[r][c];

      if (selected) {
        const [sr, sc] = selected;

        if (sr === r && sc === c) {
          setSelected(null);
          setLegalMoves([]);
          return;
        }

        if (legalMoves.some(([mr, mc]) => mr === r && mc === c)) {
          const newBoard = cloneBoard(board);
          const movingPiece = newBoard[sr][sc];

          newBoard[r][c] = movingPiece;
          newBoard[sr][sc] = null;

          // Automatically promote a pawn to a queen.
          if (movingPiece && movingPiece.toUpperCase() === 'P') {
            if (
              (isWhite(movingPiece) && r === 0) ||
              (isBlack(movingPiece) && r === 7)
            ) {
              newBoard[r][c] = isWhite(movingPiece) ? 'Q' : 'q';
            }
          }

          const notation = `${fileChars[sc]}${8 - sr} → ${fileChars[c]}${8 - r}`;

          setBoard(newBoard);
          setMoveHistory((prev) => [...prev, notation]);
          setLastMove({ from: [sr, sc], to: [r, c] });
          setSelected(null);
          setLegalMoves([]);

          const nextTurn = turn === 'white' ? 'black' : 'white';

          setTurn(nextTurn);

          const nextCheck = isInCheck(newBoard, nextTurn === 'white');
          const nextHasMoves = hasAnyLegalMove(
            newBoard,
            nextTurn === 'white',
          );

          if (nextCheck && !nextHasMoves) {
            setStatus(`Checkmate! ${turn === 'white' ? 'White' : 'Black'} wins.`);
          } else if (!nextCheck && !nextHasMoves) {
            setStatus('Stalemate! Draw.');
          } else if (nextCheck) {
            setStatus(
              `Check! ${nextTurn === 'white' ? 'White' : 'Black'} must respond.`,
            );
          } else {
            setStatus(`${nextTurn === 'white' ? 'White' : 'Black'} to move`);
          }

          return;
        }

        if (piece && isWhite(piece) === (turn === 'white')) {
          setSelected([r, c]);
          setLegalMoves(getLegalMoves(board, r, c));
          return;
        }

        setSelected(null);
        setLegalMoves([]);
        return;
      }

      if (piece && isWhite(piece) === (turn === 'white')) {
        setSelected([r, c]);
        setLegalMoves(getLegalMoves(board, r, c));
      }
    },
    [board, selected, legalMoves, turn, checkmate, stalemate],
  );

  const reset = useCallback(() => {
    setBoard(cloneBoard(initialBoard));
    setSelected(null);
    setLegalMoves([]);
    setTurn('white');
    setMoveHistory([]);
    setLastMove(null);
    setStatus('White to move');
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#00bfff]/25 bg-[#070b12]/95 p-4 shadow-[0_0_35px_rgba(0,191,255,0.08)] sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#00bfff]/[0.06] blur-3xl" />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00bfff]">
            Interactive Arena
          </p>
          <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            Chess <span className="text-[#00e5ff]">Board</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#00bfff]/25 bg-[#00bfff]/[0.07] px-3 py-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              turn === 'white'
                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                : 'bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]'
            }`}
          />
          <span className="font-mono text-xs text-[#b7c8d9]">
            {turn === 'white' ? 'WHITE' : 'BLACK'} TURN
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="flex min-w-0 flex-col items-center">
          <div className="w-full max-w-[440px]">
            <div className="grid grid-cols-[18px_repeat(8,minmax(0,1fr))]">
              <div />
              {fileChars.map((file) => (
                <div
                  key={file}
                  className="pb-2 text-center font-mono text-[10px] text-[#00bfff]/70"
                >
                  {file}
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-lg border border-[#00bfff]/35 shadow-[0_0_24px_rgba(0,191,255,0.09)]">
              {board.map((row, r) => (
                <div
                  key={r}
                  className="grid grid-cols-[18px_repeat(8,minmax(0,1fr))]"
                >
                  <div className="flex items-center justify-center bg-[#070b12] font-mono text-[10px] text-[#00bfff]/70">
                    {8 - r}
                  </div>

                  {row.map((piece, c) => {
                    const isLight = (r + c) % 2 === 0;
                    const isSelected =
                      selected?.[0] === r && selected?.[1] === c;
                    const isLegal = legalMoves.some(
                      ([mr, mc]) => mr === r && mc === c,
                    );
                    const isCapture = isLegal && piece !== null;
                    const isLastMove =
                      lastMove &&
                      ((lastMove.from[0] === r && lastMove.from[1] === c) ||
                        (lastMove.to[0] === r && lastMove.to[1] === c));

                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleSquareClick(r, c)}
                        aria-label={`Square ${fileChars[c]}${8 - r}${piece ? ` with ${piece}` : ''}`}
                        aria-pressed={Boolean(isSelected)}
                        className={`relative flex aspect-square min-w-0 items-center justify-center text-[clamp(18px,5vw,34px)] transition-all duration-150 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00e5ff] ${
                          isLight
                            ? 'bg-[#12202d] hover:bg-[#18384a]'
                            : 'bg-[#09111b] hover:bg-[#102737]'
                        } ${
                          isSelected
                            ? 'z-[1] bg-[#00bfff]/35 ring-2 ring-inset ring-[#00e5ff] shadow-[inset_0_0_18px_rgba(0,229,255,0.2)]'
                            : ''
                        } ${
                          isLastMove && !isSelected
                            ? 'bg-[#00bfff]/20'
                            : ''
                        }`}
                      >
                        {piece && (
                          <span
                            className={`relative z-[1] select-none leading-none ${
                              isWhite(piece)
                                ? 'text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]'
                                : 'text-[#00d9ff] drop-shadow-[0_0_4px_rgba(0,191,255,0.3)]'
                            }`}
                          >
                            {pieceSymbols[piece]}
                          </span>
                        )}

                        {isLegal && !isCapture && (
                          <span className="pointer-events-none absolute h-[28%] w-[28%] rounded-full bg-[#00e5ff]/65 shadow-[0_0_10px_rgba(0,229,255,0.65)]" />
                        )}

                        {isCapture && (
                          <span className="pointer-events-none absolute inset-[5%] rounded-full border-2 border-[#00e5ff]/80 shadow-[0_0_9px_rgba(0,229,255,0.3)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex w-full max-w-[440px] flex-wrap items-center justify-between gap-3">
            <div
              className={`flex items-center gap-2 text-sm ${
                checkmate || stalemate
                  ? 'text-[#00e5ff]'
                  : check
                    ? 'text-amber-300'
                    : 'text-[#b7c8d9]'
              }`}
              role="status"
              aria-live="polite"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  checkmate || stalemate
                    ? 'bg-[#00e5ff]'
                    : check
                      ? 'bg-amber-300'
                      : 'bg-[#00bfff]'
                }`}
              />
              {status}
            </div>

            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-[#00bfff]/35 bg-[#00bfff]/[0.08] px-4 py-2 font-mono text-xs text-[#00e5ff] transition-all hover:border-[#00e5ff]/70 hover:bg-[#00bfff]/15 hover:shadow-[0_0_14px_rgba(0,191,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
            >
              ↻ Reset Game
            </button>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-xl border border-[#00bfff]/20 bg-[#0b1420] p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
                Move History
              </h3>
              <span className="rounded-md bg-[#00bfff]/10 px-2 py-1 font-mono text-[10px] text-[#00bfff]">
                {moveHistory.length} MOVES
              </span>
            </div>

            <div className="max-h-64 min-h-28 overflow-y-auto rounded-lg border border-[#00bfff]/10 bg-[#070b12]/80 p-3">
              {moveHistory.length === 0 ? (
                <div className="flex min-h-20 flex-col items-center justify-center gap-2 text-center">
                  <span className="text-2xl text-[#00bfff]/50">♞</span>
                  <p className="text-xs text-slate-500">No moves yet</p>
                  <p className="text-[10px] text-slate-600">
                    Select a piece to begin
                  </p>
                </div>
              ) : (
                <ol className="space-y-1.5">
                  {moveHistory.map((move, i) => (
                    <li
                      key={`${i}-${move}`}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-xs ${
                        i === moveHistory.length - 1
                          ? 'bg-[#00bfff]/10 text-[#00e5ff]'
                          : 'text-[#b7c8d9]'
                      }`}
                    >
                      <span className="w-7 shrink-0 text-[#00bfff]/60">
                        {Math.floor(i / 2) + 1}
                        {i % 2 === 1 ? '...' : '.'}
                      </span>
                      <span>{move}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#00bfff]/20 bg-[#0b1420] p-4">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
              Board Legend
            </h3>

            <div className="space-y-3 text-xs text-[#b7c8d9]">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#00e5ff]/70 shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
                Legal move
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full border-2 border-[#00e5ff]/80" />
                Capture available
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-sm border border-[#00e5ff] bg-[#00bfff]/30" />
                Selected square
              </div>

              <div className="mt-3 border-t border-[#00bfff]/15 pt-3 text-[11px] leading-relaxed text-slate-500">
                Pawns automatically promote to queens on reaching the final
                rank.
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#00bfff]/15 bg-gradient-to-br from-[#00bfff]/[0.08] to-transparent p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00bfff]/70">
              Game Mode
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Local 2-Player
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Play against a friend on the same device.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
