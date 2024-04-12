import {PieChart, Pie, Tooltip, Cell, Legend} from 'recharts'

import './index.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']
const NAME = ['Won', 'Lose', 'Draw']

const Chart = props => {
  const {recentmatchesDataList} = props
  let winCount = 0
  let loseCount = 0
  let drawCount = 0
  recentmatchesDataList.map(each => {
    const countData = {winCount, loseCount, drawCount}
    if (each.matchStatus === 'Won') {
      return (winCount += 1)
    } else if (each.matchStatus === 'Lost') {
      return (loseCount += 1)
    } else {
      drawCount += 1
    }
    return countData
  })

  const data = [
    {
      count: winCount,
      status: 'Won',
    },
    {
      count: loseCount,
      status: 'Lose',
    },
    {
      count: drawCount,
      status: 'Draw',
    },
  ]

  return (
    <div className="chart">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          innerRadius={0}
          outerRadius={100}
          dataKey="count"
          label
        >
          {data.map((entry, index) => (
            <Cell
              name={NAME[index % NAME.length]}
              Key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </PieChart>
    </div>
  )
}

export default Chart
