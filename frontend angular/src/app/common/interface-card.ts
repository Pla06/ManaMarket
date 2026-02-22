export interface InterfaceCards {
  status: Card[]
}
export interface InterfaceCard {
  status: Card
}
export interface Card {
  imdb: Imdb
  _id: string
  title: string
  year: number
  director: string
  plot: string
  genres: string[]
  poster: string
  __v?: number
}
export interface Imdb {
  rating: number
  votes: number
}
