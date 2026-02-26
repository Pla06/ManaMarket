import axios from 'axios';
import { Card, InterfaceCard, InterfaceCards } from '../common/interfaces';

const BASE_URL = 'http://localhost:3000/api/v1/cards/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

export interface ApiResponse {
  status: string;
}

export interface ApiResponseGenres {
  status: string[];
}

export const cardService = {
  getCards: (): Promise<InterfaceCards> => {
    return axiosInstance.get<InterfaceCards>('').then(res => res.data);
  },

  getCard: (id: string): Promise<InterfaceCard> => {
    return axiosInstance.get<InterfaceCard>(id).then(res => res.data);
  },

  addCard: (card: Omit<Card, '_id'>): Promise<ApiResponse> => {
    return axiosInstance.post<ApiResponse>('', card).then(res => res.data);
  },

  updateCard: (card: Card): Promise<ApiResponse> => {
    return axiosInstance.put<ApiResponse>(card._id, card).then(res => res.data);
  },

  deleteCard: (id: string): Promise<ApiResponse> => {
    return axiosInstance.delete<ApiResponse>(id).then(res => res.data);
  },

  getCollections: (): Promise<ApiResponseGenres> => {
    return axiosInstance.get<ApiResponseGenres>('collections').then(res => res.data);
  },
};
