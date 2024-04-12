// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import Chart from '../Chart'

class TeamMatches extends Component {
  state = {
    listObject: {},
    teamDetails: {},
    recentmatchesDataList: [],
    isLoader: true,
  }

  componentDidMount() {
    this.getMatchesDetails()
  }

  getColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'CSK':
        return 'csk'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'SH':
        return 'sh'
      case 'RR':
        return 'rr'
      case 'DC':
        return 'dc'
      case 'MI':
        return 'mi'
      default:
        return ''
    }
  }

  getMatchesDetails = async () => {
    const {listObject} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const dataObject = await response.json()
    const updatedObject = {
      teamBannerUrl: dataObject.team_banner_url,
      latestMatchDetails: dataObject.latest_match_details,
      recentMatches: dataObject.recent_matches,
    }

    const matchDetails = updatedObject.latestMatchDetails

    const upadatedMatchdata = {
      competingTeam: matchDetails.competing_team,
      competingTeamLogo: matchDetails.competing_team_logo,
      date: matchDetails.date,
      id: matchDetails.id,
      firstInnings: matchDetails.first_innings,
      secondInnings: matchDetails.second_innings,
      manOfTheMatch: matchDetails.man_of_the_match,
      matchStatus: matchDetails.match_status,
      result: matchDetails.result,
      venue: matchDetails.venue,
      umpires: matchDetails.umpires,
    }

    const recentMatchesData = updatedObject.recentMatches

    const updatedRecentMatchesData = recentMatchesData.map(eachData => ({
      competingTeam: eachData.competing_team,
      competingTeamLogo: eachData.competing_team_logo,
      date: eachData.date,
      id: eachData.id,
      firstInnings: eachData.first_innings,
      secondInnings: eachData.second_innings,
      manOfTheMatch: eachData.man_of_the_match,
      matchStatus: eachData.match_status,
      result: eachData.result,
      venue: eachData.venue,
      umpires: eachData.umpires,
    }))

    const latestMatchDetails = this.setState({
      listObject: updatedObject,
      teamDetails: upadatedMatchdata,
      recentmatchesDataList: updatedRecentMatchesData,
      isLoader: false,
    })
  }

  onClickBackBtn = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {listObject, teamDetails, recentmatchesDataList, isLoader} =
      this.state

    console.log(listObject)
    const {teamBannerUrl} = listObject
    return (
      <div className={`container ${this.getColor()}`}>
        {isLoader ? (
          <div>
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <Chart recentmatchesDataList={recentmatchesDataList} />
            <h1 className="latest-matches">Latest Matches</h1>
            <LatestMatch matchData={teamDetails} />
            <ul className="recent-matches-container">
              {recentmatchesDataList.map(eachItem => (
                <MatchCard cardDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
            <div className="btn-container">
              <button
                type="button"
                className="backBtn"
                onClick={this.onClickBackBtn}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
