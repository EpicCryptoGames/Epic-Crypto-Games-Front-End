export interface IPlayer {
  player_id: string;
  public_address: string;
}

export interface TopLeaderBoard {
  leader_board_id: string;
  player: IPlayer;
  points: number;
}

export interface IUserRanking {
  leader_board_id: string;
  player: IPlayer;
  points: number;
  rank: number;
  onTopList: boolean;
}

export interface ITopic {
  topic_id: string;
  name: string;
  next_reset: string;
}

export interface ILeaderBoard {
  leaderBoard: TopLeaderBoard[];
  userPosition: IUserRanking | null;
}

// Games
export interface IGame {
  game_id: string;
  name: string;
  route: string;
  image: string;
  topic: ITopic;
}
