import { api } from '../handler';

export const loginUser = async (req, res ,url) => {
    const {email,password}=req.body
    try {
        const user = await api.post(url, { email, password });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful', user });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
};

