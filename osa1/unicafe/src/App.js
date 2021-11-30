import React, { useState } from 'react'

const Tekstit = ['good', 'neutral', 'bad', 'all', 'average', 'positive']

const Header = (props) => {
  return (<h1>{props.teksti}</h1>)
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.teksti}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.teksti}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  var keskiarvo = (props.hyva + (-props.huono)) / props.yhteensa
  var positiiviset = (props.hyva / props.yhteensa) * 100

  if (props.hyva === 0 && props.neutraali === 0 && props.huono === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine teksti={props.tekstit[0]} value={props.hyva} />
        <StatisticsLine teksti={props.tekstit[1]} value={props.neutraali} />
        <StatisticsLine teksti={props.tekstit[2]} value={props.huono} />
        <StatisticsLine teksti={props.tekstit[3]} value={props.yhteensa} />
        <StatisticsLine teksti={props.tekstit[4]} value={keskiarvo} />
        <StatisticsLine teksti={props.tekstit[5]} value={positiiviset + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [yht, setYht] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setYht(yht + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setYht(yht + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setYht(yht + 1)
  }

  return (
    <div>
      <Header teksti='give feedback' />
      <Button handleClick={handleGood} teksti='good' />
      <Button handleClick={handleNeutral} teksti='neutral' />
      <Button handleClick={handleBad} teksti='bad' />
      <Header teksti='statistics' />
      <Statistics tekstit={Tekstit} hyva={good} neutraali={neutral} huono={bad} yhteensa={yht} />
    </div>
  );
}

export default App;