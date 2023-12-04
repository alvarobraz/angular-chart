export interface IData {
  data: {
    coins: ICoins[]
  }
}

export interface ICoins {
  price: number;
  name: string
}
