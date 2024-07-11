import Layout from 'pages/Layout'
import Login from '@/components/Login'
import LogoSymbol from 'websiteInfo/LogoSymbol'

const loginPage = () => {
  return (
    <Layout>
      <div className='flex w-3/4 m-auto mt-20 gap-3'>
        <div className='w-1/2'>
          <div className='relative'>
              <LogoSymbol width={600} height={600} />
            <div className='absolute top-0 left-0 w-full h-full text-9xl' style={{ color: '#EAEFFB' }}>
              WELCOME TO
              <br />
              CLOSET CONNECT
            </div>
          </div>
        </div>
        <div className='w-1/2 rounded-lg bg-ccGreen' style={{height:"fit-content"}}>
          <Login />
        </div>
      </div>
    </Layout>
  )
}

export default loginPage
