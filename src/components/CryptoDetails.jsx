import React, { useState  , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row , Typography } from 'antd';
import {useGetCryptoDetailsQuery , useGetCryptoHisQuery} from '../services/cryptoApi';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { LineChart, Line , XAxis , YAxis , CartesianGrid , Tooltip} from 'recharts';
import './CryptoDetails.css';

import Chart from './Chart';
import millify from 'millify';

const {Title} = Typography





const CryptoDetails = () => {
  const {coinId} = useParams();
  const {data , isLoading , error} = useGetCryptoDetailsQuery(coinId);
  const {data : datas , isLoading : laoding , error : errors} = useGetCryptoHisQuery(coinId);
  const history = datas?.data?.history ; 
  const [historys , setHistorys] = useState([])


  useEffect(() => {
    setHistorys(history?.map((item) => ({
      time: new Date(item?.timestamp * 1000).toLocaleDateString(),
      price: item?.price 
    })).reverse()); // convert history to data
  }, [datas]);
  

  if(isLoading) return 'Laoding...'
const crypto = data?.data?.coin;

  if(laoding) return 'Loading...';




  const genericStats = [
    { title: 'Number Of Markets', value: crypto?.numberOfMarkets, icon: <FundOutlined /> } ,
    { title: 'Number Of Exchanges', value: crypto?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${crypto?.supply?.total && millify(crypto?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${crypto?.supply?.circulating && millify(crypto?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];



  console.log()
  const stats = [
    { title: 'Price to USD', value: `$ ${crypto?.price && millify(crypto?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: crypto?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${crypto['24hVolume'] && crypto['24hVolume'] ? millify(crypto['24hVolume']) : 'N/A'}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${crypto?.marketCap && millify(crypto?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${crypto?.allTimeHigh?.price && millify(crypto?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];


  return (
    <>
    <Col span={24} className='row1'>
      <div className='title'>
          <h1 >{crypto?.name} ({crypto?.symbol}) Price {millify(crypto?.price) }
          </h1> 
          <img src={crypto?.iconUrl} 
          alt="ctypto" className='img-title' />
      </div>

        <p>{crypto?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
    </Col>
    <Row className='row-chart'>
          <LineChart width={1500} height={500} data={historys}  dot={false}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey='time' />
          <YAxis domain={['auto' , 'auto']} />
          <Tooltip />
        </LineChart>
    </Row>
    <Row>
      <Col span={12} className='col-ch'>
            <Title level={3} >{crypto.name} Value Statistics</Title>
              <p className='p'>
              An overview showing the statistics of {crypto?.name}  , such as the base and quote currency, the rank, and trading volume.
              </p>
            
            {
              genericStats && genericStats?.map(({icon , title , value}) => (
                <Row className='row-ch'>
                  <div className='div-row'><Title level={5}>{icon}</Title> <Title level={3}>{title}</Title></div>
                  <Title level={5}>{value}</Title>
                </Row>
              ))
            }
      </Col>
      <Col span={12} className='col-ch'>
            <Title level={3} >Other Stats Info</Title>
              <p className='p'>
                An overview showing the statistics of {crypto.name}, such as the base and quote currency, the rank, and trading volume.
              </p>
          {stats && stats?.map(({icon , title , value}) => (
                          <Row className='row-ch'>
                          <div className='div-row'><Title level={5}>{icon}</Title> <Title level={3}>{title}</Title></div>
                          <Title level={5}>{value}</Title>
                        </Row>
          ))}
      </Col>
    </Row>
    </>
  )
}

export default CryptoDetails