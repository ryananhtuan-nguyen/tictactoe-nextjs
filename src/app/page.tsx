'use client'

import { useEffect, useState } from 'react'

const Home = () => {
  //innertext for each box
  const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', ''])
  //player's turn
  const [player, setPlayer] = useState<'X' | 'O'>('X')
  //If game is over or not
  const [isOver, setIsOver] = useState(false)

  //Logic of the game
  function checkWin(symbol: string) {
    const winningSet = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    winningSet.forEach(([a, b, c]) => {
      if (boxes[a] == symbol && boxes[b] == symbol && boxes[c] == symbol)
        setIsOver(true)
    })
  }

  //useEffect to check win every turn
  useEffect(() => {
    checkWin(player == 'X' ? 'O' : 'X')
  }, [player])

  //handle click on each box
  function handleClick(idx: number) {
    const newArr = [...boxes]
    //if clicked on a not empty box do not change value
    newArr[idx] = boxes[idx] === '' ? player : boxes[idx]
    //if nothing changed do not change turn/values of the box
    if (newArr.some((item, idx) => item !== boxes[idx])) {
      setPlayer((pre) => (pre == 'X' ? 'O' : 'X'))
      setBoxes(newArr)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-center">Home</h1>

      <table className="border-spacing-0 border-collapse w-[500px] h-[500px]">
        <tr>
          {boxes.slice(0, 3).map((item, idx) => (
            <td
              key={idx}
              className="border-2 border-black text-center w-[8vw] h-[8vh] text-5xl"
              onClick={() => (!isOver ? handleClick(idx) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(3, 6).map((item, idx) => (
            <td
              key={idx + 3}
              className="border-2 border-black text-center w-[8vw] h-[8vh] text-5xl"
              onClick={() => (!isOver ? handleClick(idx + 3) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(6, 9).map((item, idx) => (
            <td
              key={idx + 6}
              className="border-2 border-black text-center w-[8vw] h-[8vh] text-5xl"
              onClick={() => (!isOver ? handleClick(idx + 6) : {})}
            >
              {item}
            </td>
          ))}{' '}
        </tr>
      </table>
      {!isOver && <h1 className="text-center">{player} s turn</h1>}
      {isOver && (
        <div className="flex flex-col justify-center items-center">
          <h1>{player == 'X' ? 'O' : 'X'} has won!</h1>
          <button
            onClick={() => {
              setBoxes(['', '', '', '', '', '', '', '', ''])
              setIsOver(false)
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
