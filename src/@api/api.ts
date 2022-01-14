// https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
import axios from 'axios';
import { LinkResponseType } from '../@types';

const API_URL = 'https://api.shrtco.de/v2';

export const instance = axios.create({
  baseURL: API_URL,
});

export const LinkAPI = {
  getShortLink(url: string) {
    return instance.post<LinkResponseType>(`/shorten?url='${url}`);
  },
};
