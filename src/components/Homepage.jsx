import React from 'react'
import { Col, Row , Typography } from 'antd';
import {useGetCryptoQuery} from '../services/cryptoApi';
import millify from 'millify';
import Cryptocurrencies from './Cryptocurrencies';
import {Link} from 'react-router-dom';
const {Title} = Typography

const Homepage = () => {
  const {data , isLoading , erroe} = useGetCryptoQuery()
  const globalState = data?.data?.stats
  if( isLoading) return 'Loding...'

  return (
    <div style={{textAlign : 'left'}} >
      <Row>
        <Col span={12}>
          <Title level={1}>
          Total Cryptocurrencies : {millify(globalState?.total)}
          </Title>
        </Col>

        <Col span={12}>
          <Title level={2}>
          Total Exchanges : {millify(globalState?.totalExchanges)}
          </Title>
        </Col>
      </Row>

      <Row>
        <Col span={12}  >
          <Title level={2}>
          Total Market Cap: : {millify(globalState?.totalMarketCap)}
          </Title>
        </Col>

        <Col span={12}>
            <Title level={2}>
            Total 24h Volume : {millify(globalState?.total24hVolume)}
            </Title>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
            <Title level={2}>
            Total Cryptocurrencies : {millify(globalState?.totalCoins)}
            </Title>
        </Col>

        <Col span={12}>
            <Title level={2}>
            Total Markets : {millify(globalState?.totalMarkets)}
            </Title>
        </Col>
      </Row>

      <Row style={{marginTop : '70px'}}>
        <Col span={12}>
          <Title>Top 10 Cryptos In The World</Title>
        </Col>


        <Col span={12} style={{textAlign : 'right' }}>
          <Link to='/cryptocurrencies'>
            <Title style={{color : 'lightBlue'}}>
              Show more
              </Title>
          </Link>
        </Col>
      </Row>
      <Cryptocurrencies number/>
    </div>
  )
}

export default Homepage