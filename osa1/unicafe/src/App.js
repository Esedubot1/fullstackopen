import { useState } from 'react'

const Button = (props) => {
  console.log(props)

  return (
    <input type='button' onClick={() => props.set(props.number + 1)} value={props.text}/>
  )
}

const StatisticLine = (props) => {
  console.log(props)

  if (props.text === 'positive') {
    return (
      <tr>
        <th>{props.text}</th>
        <th>{props.number}</th>
        <th>%</th>
      </tr>
    )
  }
  return (
    <tr>
      <th>{props.text}</th>
      <th>{props.number}</th>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)

  const all = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / all;
  const positive = props.good / all * 100;

  if (all === 0) {
    return <div>No feedback given.</div>
  } else return (
    <div>
      <table>
        <StatisticLine text='good' number={props.good}/>
        <StatisticLine text='neutral' number={props.neutral}/>
        <StatisticLine text='bad' number={props.bad}/>
        <StatisticLine text='all' number={all}/>
        <StatisticLine text='average' number={average}/>
        <StatisticLine text='positive' number={positive}/>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button set={setGood} number={good} text='good'/>
      <Button set={setNeutral} number={neutral} text='neutral'/>
      <Button set={setBad} number={bad} text='bad'/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App