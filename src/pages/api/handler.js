// pages/api/handler.js

import axios from 'axios';

const API_URL = 'https://closetconnect-dev-73814f63526e.herokuapp.com/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function handler(req, res) {
  const { method, body } = req;
  const { url, payload } = body; 
  console.log('==>12', method, body);

  switch (method) {
      case 'POST':
          const response = await api.post(url, payload);
          console.log('===>resss', response);
          return res.status(response.status).json(response.data);
      case 'GET':
          const getResponse = await api.get(url, { headers: payload.headers });
          console.log('==>getres3', getResponse);
          return res.status(getResponse.status).json(getResponse.data);
      default:
          res.setHeader('Allow', ['POST', 'GET']);
          return res.status(405).end(`Method ${method} Not Allowed`);
  }
}


