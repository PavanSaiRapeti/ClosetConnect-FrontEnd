import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

const Layout = (props) => {
  const { children, title } = props
  const router = useRouter();
  console.log('===>props',props)
  return (
    <>
      <Head>
        <title>Closet Connect</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className="min-h-screen flex flex-col bg-ccBlack" >
        <Header />
        <main>{children}</main>
        {router.pathname !== '/login' && <Footer />}
      </div>
    </>
  )
}

export default Layout