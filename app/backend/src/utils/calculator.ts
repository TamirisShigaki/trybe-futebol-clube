import ITeam from '../interfaces/team.interfaces';
import IPlay from '../interfaces/play.interface';
import ITable from '../interfaces/table.interfaces';

export default class Calculator {
  static table(data: ITeam[], location: string) {
    const table = data.map((team: ITeam) => ({
      name: team.teamName,
      totalPoints: Calculator.calPoints(team, location),
      totalGames: Calculator.calGames(team, location),
      totalVictories: Calculator.calVictories(team, location),
      totalDraws: Calculator.calDraws(team, location),
      totalLosses: Calculator.calLosses(team, location),
      goalsFavor: Calculator.calGoalFavor(team, location),
      goalsOwn: Calculator.calGoalsOwn(team, location),
      goalsBalance: Calculator.calGoalBalance(team, location),
      efficiency: Calculator.calEfficiency(team, location),
    }));

    return table;
  }

  static calGames(team: ITeam, location: string) {
    const homeGame = [
      ...team.homeTeam.map((play: IPlay) => play.homeTeamGoals),
    ].length;
    const awayGame = [
      ...team.awayTeam.map((play: IPlay) => play.awayTeamGoals),
    ].length;

    if (location === 'home') return homeGame;
    if (location === 'away') return awayGame;
    return homeGame + awayGame;
  }

  static calVictories(team: ITeam, location: string) {
    const homeWin = team.homeTeam
      .reduce((wins: number, play: IPlay) => (play.homeTeamGoals > play.awayTeamGoals
        ? wins + 1 : wins + 0), 0);
    const awayWin = team.awayTeam
      .reduce((wins: number, play: IPlay) => (play.awayTeamGoals > play.homeTeamGoals
        ? wins + 1 : wins + 0), 0);

    switch (location) {
      case 'home':
        return !homeWin ? 0 : homeWin;
      case 'away':
        return !awayWin ? 0 : awayWin;
      default:
        return homeWin + awayWin;
    }
  }

  static calLosses(team: ITeam, location: string) {
    const homeLose = team.homeTeam
      .reduce((lose: number, play: IPlay) => (play.awayTeamGoals > play.homeTeamGoals
        ? lose + 1 : lose + 0), 0);
    const awayLose = team.awayTeam
      .reduce((lose: number, play: IPlay) => (play.homeTeamGoals > play.awayTeamGoals
        ? lose + 1 : lose + 0), 0);

    switch (location) {
      case 'home':
        return !homeLose ? 0 : homeLose;
      case 'away':
        return !awayLose ? 0 : awayLose;
      default:
        return homeLose + awayLose;
    }
  }

  static calDraws(team: ITeam, location: string) {
    return Calculator.calGames(team, location)
          - (Calculator.calVictories(team, location)
          + Calculator.calLosses(team, location));
  }

  static calGoalFavor(team: ITeam, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: number, play:
      IPlay) => goals + play.homeTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: number, play: IPlay) => goals + play.awayTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calGoalsOwn(team: ITeam, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: number, play: IPlay) => goals + play.awayTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: number, play: IPlay) => goals + play.homeTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calGoalBalance(team: ITeam, location: string) {
    const balance = Calculator.calGoalFavor(team, location)
      - Calculator.calGoalsOwn(team, location);
    return balance;
  }

  static calPoints(team: ITeam, location: string) {
    const winPoints = Calculator.calVictories(team, location) * 3;
    const drawPoints = Calculator.calDraws(team, location);
    return winPoints + drawPoints;
  }

  static calEfficiency(team: ITeam, location: string) {
    const efficiency = (Calculator.calPoints(team, location)
      / (Calculator.calGames(team, location) * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static calOrder(team: ITeam[], location: string) {
    const order = Calculator.table(team, location)
      .sort((a: ITable, b: ITable) => {
        if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
        if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
        if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
        if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
        return b.goalsOwn - a.goalsOwn;
      });
    return order;
  }
}
