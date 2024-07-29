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
  const { url, payload, headers } = body; 

  switch (method) {
    case 'POST': {
      try {
        const response = await api.post(url, payload);
        console.log('===>resss', response);
        return res.status(response.status).json(response.data);
      } catch (error) {
        console.error('Error in POST request:',error.response.data.message);
        return res.status(error.response?.status || 500).json({
          message: error.response.data.message,
          error: error,
        });
      }
    }
    case 'GET': {
      console.log(`==>getreq`, url, headers);
      try {
        const getResponse = await api.get(url, { headers });
        console.log('==>getres3', getResponse);

        // Check if the status code is not 200
        if (getResponse.status !== 200) {
          return res.status(getResponse.status).json({
            message: 'Received non-200 status code',
            data: getResponse.data,
          });
        }

        return res.status(getResponse.status).json(getResponse.data);
      } catch (error) {
        console.error('Error in GET request:', error);
        return res.status(error.response?.status || 500).json({
          message: 'An error occurred while processing the GET request.',
          error: error.message,
        });
      }
    }
    default: {
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}