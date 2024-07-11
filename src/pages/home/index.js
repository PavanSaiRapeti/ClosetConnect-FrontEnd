
// import { validateTokenAndGetUser } from '../src/store/actions/authAction';
import { validateTokenAndGetUser } from 'store/actions/authAction';
import Header from '../../components/Header';

const Home = ({ user }) => {
  console.log('user',user)
  return (
    <div>
      <Header user={user} />
      <h1>Welcome to ClosetConnect</h1>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const token = req?.cookies?.token || true; 

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const user = await validateTokenAndGetUser(token);

  if (user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}

export default Home;