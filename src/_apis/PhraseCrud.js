import axios from 'axios';
import {PHRASE_TOKEN,PHRASE_PROJECT} from '../utils/const.utils';

export function getPhraseData() { 
  return axios.get(`https://api.phrase.com/v2/projects/${PHRASE_PROJECT}/translations/?access_token=${PHRASE_TOKEN}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer bf3fa63f66e88f4453c018f568445a03889f494343973cc33c90401d9d525447`,
    }
  });
}
