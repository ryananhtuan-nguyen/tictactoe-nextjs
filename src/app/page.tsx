'use client'

import { useState } from 'react'

const Home = () => {
  //innertext for each box
  const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', ''])
  //player's turn
  const [player, setPlayer] = useState<'X' | 'O'>('X')
  //If game is over or not
  const [isOver, setIsOver] = useState(false)

  //handle click on each box
  function handleClick(idx: number) {
    const newArr = [...boxes]
    newArr[idx] = boxes[idx] === '' ? player : boxes[idx]
    if (newArr != boxes) {
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
      <h1>{player} s turn</h1>
    </div>
  )
}

export default Home
