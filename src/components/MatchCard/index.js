// Write your code here
import {Component} from 'react'

import './index.css'

class MatchCard extends Component {
  state = {iswin: 'Won'}

  render() {
    const {iswin} = this.state
    const {cardDetails} = this.props
    const {competingTeam, competingTeamLogo, result, matchStatus} = cardDetails

    let resultElement
    if (iswin === matchStatus) {
      resultElement = (
        <p className="match-status winteam-color">{matchStatus}</p>
      )
    } else {
      resultElement = (
        <p className="match-status loseteam-color">{matchStatus}</p>
      )
    }

    return (
      <li className="card-item">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="logo-image"
        />
        <p className="team-heading">{competingTeam}</p>
        <p className="result-stat">{result}</p>
        {resultElement}
      </li>
    )
  }
}

export default MatchCard
