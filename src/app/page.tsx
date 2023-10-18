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
    let over = false
    // HORIZONTAL LINES //
    if (boxes[0] == symbol && boxes[1] == symbol && boxes[2] == symbol) {
      over = true
      setIsOver(over)
    } else if (boxes[3] == symbol && boxes[4] == symbol && boxes[5] == symbol) {
      over = true
      setIsOver(over)
    } else if (boxes[6] == symbol && boxes[7] == symbol && boxes[8] == symbol) {
      over = true
      setIsOver(over)
    }
    // VERTICAL LINES //

    if (boxes[0] == symbol && boxes[3] == symbol && boxes[6] == symbol) {
      over = true
      setIsOver(over)
    } else if (boxes[1] == symbol && boxes[4] == symbol && boxes[7] == symbol) {
      over = true
      setIsOver(over)
    } else if (boxes[2] == symbol && boxes[5] == symbol && boxes[8] == symbol) {
      over = true
      setIsOver(over)
    }

    // DIAGONAL LINES //

    if (boxes[0] == symbol && boxes[4] == symbol && boxes[8] == symbol) {
      over = true
      setIsOver(over)
    } else if (boxes[2] == symbol && boxes[4] == symbol && boxes[6] == symbol) {
      over = true
      setIsOver(over)
    }
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
    <div className="flex flex-col justify-center gap-12">
      <h1>Home</h1>

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
      {!isOver && <h1>{player} s turn</h1>}
      {isOver && (
        <>
          <h1>{player == 'X' ? 'O' : 'X'} has won!</h1>
          <button
            onClick={() => {
              setBoxes(['', '', '', '', '', '', '', '', ''])
              setIsOver(false)
            }}
          >
            Restart
          </button>
        </>
      )}
    </div>
  )
}

export default Home
