// Write your code here

import './index.css'

const LatestMatch = props => {
  const {matchData} = props
  const {
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    date,
    umpires,
    venue,
    manOfTheMatch,
    matchStatus,
    result,
  } = matchData

  return (
    <div className="latestmatch-container">
      <div className="team-container">
        <p className="teamname">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue">{venue}</p>
        <p className="result">{result}</p>
      </div>
      <img src={competingTeamLogo} alt={`latest match ${competingTeam}`} className="logo" />
      <div className="stats-container">
        <h1 className="innings">First Innings</h1>
        <p className="title">{firstInnings}</p>
        <h1 className="innings">Second Innings</h1>
        <p className="title">{secondInnings}</p>
        <h1 className="innings">Man Of The Match</h1>
        <p className="title">{manOfTheMatch}</p>
        <h1 className="innings">Umpires</h1>
        <p className="title">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
