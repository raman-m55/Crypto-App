import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Card, Space  ,Input} from 'antd';
import {useGetCryptoCountQuery} from '../services/cryptoApi';
import { Link } from 'react-router-dom';

const Cryptocurrencies = ({number}) => {
  const [crypto , setCrypto] = useState();
  const [searchTerm , setSearchTerm] = useState('')
  const count = number ? 10 : 100 ;
  const {data : cryptoList, isLoding , error} = useGetCryptoCountQuery(count)

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins?.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
    setCrypto(filteredData)
  } ,[cryptoList , searchTerm])


  if(isLoding) return 'Loading'

  console.log(error)


  return (
    
    <div style={{display: 'flex' , flexWrap : 'wrap' , gap : '16px'}} >
            {!number && (
            <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}
            style={{display : 'block'}}/>
      )
      }
      {crypto && crypto?.map((item , index) => (
        <Link to={`/crypto/${item?.uuid}`} key={index} >
          <Card title={`${item?.rank}.${item?.name}`}
            extra={<img style={{width : '32px'}} src={item?.iconUrl} />}
            style={{ width: 300   , textAlign : 'left' , fontSize:'1.2rem'}} hoverable>
                  <p>Price: {millify(item.price)}</p>
                  <p>Market Cap: {millify(item.marketCap)}</p>
                  <p>Daily Change: {millify(item.change)}</p>
          </Card> 
        </Link>
      ))}
    </div>
    
  )
}

export default Cryptocurrencies