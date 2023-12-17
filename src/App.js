import React from 'react';
import { HomeOutlined , FundOutlined , MoneyCollectOutlined , BulbOutlined , MenuOutlined } from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';
import { Link  , BrowserRouter , Route ,  Routes} from 'react-router-dom';
import { Homepage , CryptoDetails , Cryptocurrencies } from './components/index';
import logo from './images/logo.png'
const { Header, Content, Footer, Sider } = Layout;






const items = [
  {icon: HomeOutlined, label: 'Home', path: '/'},
  {icon: FundOutlined, label: 'Cryptocurrencies', path: '/cryptocurrencies'},
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.label,
  path: item.path,
  component: item.component,
}));



const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <BrowserRouter>
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            {items.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            height : '100px',
            background: 'dark',

          }}
        >
          <Link to='/' style={{display : 'flex' ,
            justifyContent : 'center' ,
            alignItems : 'center'}}>
            <img src={logo} alt='logo' style={{width : '60px'}} />
            <h1 style={{color : 'white' , padding: '0 20px'}}>CryptoVerse</h1>            
          </Link>

        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
                <Routes>
                  <Route exact path='/' element={<Homepage />}/>
                  <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />}/>
                  <Route exact path='/crypto/:coinId' element={<CryptoDetails  />}/>
                </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          CryptoVerse©2023
        </Footer>
      </Layout>
    </Layout>
    </BrowserRouter>
  );
};
export default App;