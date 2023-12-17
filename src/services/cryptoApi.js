import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const cryptoAPI = createApi({
    reducerPath : 'cryptoAPI' ,
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://coinranking1.p.rapidapi.com' ,
        prepareHeaders : (headers) => {
            headers.set('X-RapidAPI-Key' , 'bf0362a0famshd3f2fe88b9b7b04p1971fbjsn0187fafdeea1')
            headers.set('X-RapidAPI-Host' ,'coinranking1.p.rapidapi.com')
            return headers
        }  
    }),
    endpoints : (builder) => ({
        getCrypto : builder.query({
            query : () => '/coins'
        }) ,

        getCryptoCount : builder.query({
            query : (count) => `/coins?limit=${count}`
        }) ,
        getCryptoDetails : builder.query({
            query : (coinId) => `/coin/${coinId}`
        }) ,
        getCryptoHis : builder.query({
            query : (id , time) => `/coin/${id}/history?timePeriod=7d`
        })
    })
})

export const {useGetCryptoQuery , useGetCryptoCountQuery , useGetCryptoDetailsQuery , useGetCryptoHisQuery} = cryptoAPI
