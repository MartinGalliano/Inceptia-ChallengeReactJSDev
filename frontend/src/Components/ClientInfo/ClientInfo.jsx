import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../../Services/ApiServices'

import DateFilter from "../DateSearch/DateSearch";

import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

import s from './clientInfo.module.css'
//s is short for styles

const ClientTable = () => {

    const { clientSelec, DataCases, fetchDataClient } = useContext(Context)

    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        if (startDate && endDate) {
            fetchDataClient(clientSelec, startDate, endDate, 1)
            setCurrentPage(1)
        }
    }, [startDate, endDate])



    if (clientSelec === undefined) { return <div className={s.reports} >Selecting a client from the list</div> }

    return (
        <>
            <div>
                <h4 className={s.reports}>REPORTS</h4>
                <DateFilter startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
            <table className={s.table}>
                <thead>
                    <tr className={s.tables}>
                        <th className={s.item}>Managed</th>
                        <th className={s.item}>ID </th>
                        <th className={s.item}>Phone</th>
                        <th className={s.item}>Dni</th>
                        <th className={s.item}>Group</th>
                        <th className={s.item}>Order</th>
                        <th className={s.item}>Call</th>
                        <th className={s.item}>status</th>
                        <th className={s.item}>N° Msjs</th>
                        <th className={s.item}>Conversations</th>
                    </tr>
                </thead>
                <tbody>
                    {DataCases?.results?.map((event) => {

                        return (
                            <tr key={Math.random()}>
                                <td className={s.info}>{event.last_updated}</td>
                                <td className={s.info}>{event.id}</td>
                                <td className={s.info}>{event.phone}</td>
                                {event.extra_metadata.dni ?
                                    <td className={s.info}> {event.extra_metadata.dni}</td> :
                                    <td className={s.info}>-</td>
                                }
                                {event.extra_metadata.grupo ?
                                    <td className={s.info}>{event.extra_metadata.grupo}</td> :
                                    <td className={s.info}>-</td>
                                }
                                {event.extra_metadata.orden ?
                                    <td className={s.info}>{event.extra_metadata.orden}</td> :
                                    <td className={s.info}>-</td>
                                }
                                <td className={s.info}>{event.case_duration}</td>
                                <td className={s.info}>{event.case_result.name}</td>
                                {event.case_log.responses ?
                                    <td className={s.msj}>{event.case_log.responses.length}</td> :
                                    <td className={s.msj}>0</td>
                                }
                                {event.case_log.responses ?
                                    <td className={s.conversations} >
                                        {event.case_log.responses.map(response => {
                                            return (
                                                <div key={Math.random()}>
                                                    <p className={s.infoconver}>{response.text}</p>
                                                </div>
                                            )
                                        })}</td> :
                                    <td>-</td>
                                }
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            {DataCases?.results.length > 0 && (
                <nav className={s.containerPage} >
                    <ul>
                        {DataCases.previous && (
                                <a className={s.icon} href="/"
                                    onClick={(e) => { e.preventDefault(); 
                                fetchDataClient(clientSelec, startDate, endDate, Number(currentPage) - 1); 
                                setCurrentPage(currentPage - 1) 
                            }}>
                                    <AiOutlineLeft />
                                </a>
                            )
                        }
                        <a className={s.npage} href="/" onClick={(e) => { e.preventDefault(); }}
                        >
                            {currentPage}
                        </a>
                        {DataCases.next && (
                                <a className={s.icon} href="/"
                                    onClick={(e) => { e.preventDefault(); 
                                fetchDataClient(clientSelec, startDate, endDate, currentPage + 1); 
                                setCurrentPage(currentPage + 1); 
                            }}>
                                    <AiOutlineRight />
                                </a>
                            )}
                    </ul>
                </nav>
            )}
        </>
    )}
export default ClientTable

