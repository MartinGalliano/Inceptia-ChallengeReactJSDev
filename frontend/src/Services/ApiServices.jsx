import React, { createContext, useState, useEffect } from "react";

import axios from 'axios'



export const Context = createContext();

const Apiservices = ({ children }) => {
    
    
    const [Token, setToken] = useState();
    const [clients, setClients] = useState();
    const [clientSelec, setClientSelec] = useState();
    const [DataCases, setDataCases] = useState();
    
        useEffect(() => {
            getClients()
        }, [])
        
        useEffect(() => {
            if (clientSelec) {
                fetchDataClient(clientSelec)
            }}, [clientSelec])

    const fetchDataClient = async (clientId, startDate, endDate, page = 1) => {
        const  ClientDat  = await getClientDate(clientId, startDate, endDate, page)
        setDataCases(ClientDat)
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post(`https://admindev.inceptia.ai/api/v1/login/`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                email,
                password,

            })
            return response.data
        } catch (error) {
            console.log('login', error)
        }
    }

    const getClients = async () => {
        try {
            const user = await login("reactdev@iniceptia.ai", "4eSBbHqiCTPdBCTj")
            setToken(user.token)
            const response = await axios.get(`https://admindev.inceptia.ai/api/v1/clients/`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "JWT " + user.token
                },
            })
            setClients(response.data)

        } catch (error) {
            console.log('getClients', error)
        }
    }

    const getClientDate = async (clientId, startDate, endDate, page = 1) => {


        try {
            const local_updated__date__gte = startDate ?
                new Date(startDate).toISOString().split('T')[0] : '2000-01-01'
            const local_updated__date__lte = endDate ?
                new Date(endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

            const url = `https://admindev.inceptia.ai/api/v1/inbound-case/?client=${clientId}
            &local_updated__date__gte=${local_updated__date__gte}
            &local_updated__date__lte=${local_updated__date__lte}&page=${page}`;


            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "JWT " + Token,
                },
            })

            return response.data
        } catch (error) {
            console.log('getClientCases', error)
        }
    }
    return (
        <Context.Provider 
        value={{
            clients, clientSelec, DataCases, 
            setClientSelec, fetchDataClient}}
        >
            {children}
        </Context.Provider>
    )
}
export default Apiservices;
