import React from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css" ;

import {AiOutlineCalendar} from 'react-icons/ai'
import s from './datesearch.module.css'


const DateFilter = (props) => {
  return (
    <div className={s.container}>
      <div>
      <AiOutlineCalendar className={s.icon} />
      </div>
        <DatePicker
            className={s.DatePicker}
            dateFormat="dd/mm/yyyy"
            showYearDropdown
            scrollableYearDropdown
            onChange={(date) => props.setStartDate(date)}
            selected={props.startDate === " " ? null : props.startDate}
            placeholderText=   "From dd/mm/yyyy" 
/>
        <DatePicker
            className={s.DatePicker}
            dateFormat="dd/mm/yyyy"
            showYearDropdown
            scrollableYearDropdown
            onChange={(date) => props.setEndDate(date)}
            selected={props.endDate===" " ? null : props.endDate}
            placeholderText="until dd/mm/yyyy"

        />
    </div>
  )
}

export default DateFilter