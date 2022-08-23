export default class Calculator {
  static table(data: any, location: string) {
    const table = data.map((team: any) => ({
      name: team.teamName,
      totalPoints: Calculator.calPoints(team, location),
      totalGames: Calculator.calGames(team, location),
      totalVictories: Calculator.calVictories(team, location),
      totalDraws: Calculator.calDraws(team, location),
      totalLosses: Calculator.calLosses(team, location),
      goalsFavor: Calculator.calGoalFavor(team, location),
      goalsOwn: Calculator.calGoalOwn(team, location),
      goalsBalance: Calculator.calGoalBalance(team, location),
      efficiency: Calculator.calEfficiency(team, location),
    }));

    return table;
  }

  static calGames(team: any, location: string) {
    const gameHome = [
      ...team.homeTeam.map((play: any) => play.homeTeamGoals),
    ].length;
    const gameAway = [
      ...team.awayTeam.map((play: any) => play.awayTeamGoals),
    ].length;

    if (location === 'home') return gameHome;
    return gameAway;
  }

  static calVictories(team:any, location: string) {
    const winHome = team.homeTeam
      .reduce((wins: any, play: any) => play.homeTeamGoals > play.awayTeamGoals && wins + 1, 0);
    const winAway = team.awayTeam
      .reduce((wins: any, play: any) => play.awayTeamGoals < play.homeTeamGoals && wins + 1, 0);

    switch (location) {
      case 'home':
        return !winHome ? 0 : winHome;
      case 'away':
        return !winAway ? 0 : winAway;
      default:
        break;
    }
  }

  static calLosses(team: any, location: string) {
    const losehome = team.homeTeam
      .reduce((lose: any, play: any) => play.homeTeamGoals < play.awayTeamGoals && lose + 1, 0);
    const loseAway = team.homeTeam
      .reduce((lose: any, play: any) => play.awayTeamGoals < play.homeTeamGoals && lose + 1, 0);

    switch (location) {
      case 'home':
        return !losehome ? 0 : losehome;
      case 'away':
        return !loseAway ? 0 : loseAway;
      default:
        break;
    }
  }

  static calDraws(team: any, location: string) {
    const drawHome = team.homeTeam
      .reduce((draw: any, play: any) => play.homeTeamGoals === play.awayTeamGoals && draw + 1, 0);
    const drawAway = team.homeTeam
      .reduce((draw: any, play: any) => play.awayTeamGoals === play.homeTeamGoals && draw + 1, 0);

    switch (location) {
      case 'home':
        return !drawHome ? 0 : drawHome;
      case 'away':
        return !drawAway ? 0 : drawAway;
      default:
        break;
    }
  }

  static calGoalFavor(team: any, location: string) {
    const goalsHome = team.homeTeam
      .reduce((goals: any, play: any) => goals + play.homeTeamGoals, 0);
    const goalsAway = team.homeTeam
      .reduce((goals: any, play: any) => goals + play.awayTeamGoals, 0);

    switch (location) {
      case 'home':
        return goalsHome;
      case 'away':
        return goalsAway;
      default:
        break;
    }
  }

  static calGoalOwn(team: any, location: string) {
    const goalsHome = team.homeTeam
      .reduce((goals: any, play: any) => goals + play.awayTeamGoals, 0);
    const goalsAway = team.homeTeam
      .reduce((goals: any, play: any) => goals + play.homeTeamGoals, 0);

    switch (location) {
      case 'home':
        return goalsHome;
      case 'away':
        return goalsAway;
      default:
        break;
    }
  }

  static calGoalBalance(team: any, location: string) {
    const balance = Calculator.calGoalFavor(team, location) - Calculator.calGoalOwn(team, location);

    return balance;
  }

  static calPoints(team: any, location: string) {
    const winPoints = Calculator.calGoalFavor(team, location) * 3;
    const drawoints = Calculator.calGoalOwn(team, location);

    return winPoints + drawoints;
  }

  static calEfficiency(team: any, location: string) {
    const efficiency = (Calculator.calPoints(team, location)
    / (Calculator.calGames(team, location) * 3)) * 100;

    return efficiency.toFixed(2);
  }
}
