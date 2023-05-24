"use client"

import { useState } from 'react';
import { format } from 'date-fns';

import DateForm from './components/DateForm';

export default function Home() {
  const [date, setDate] = useState<Date | null>(null)
  const [diaryText, setDiaryText] = useState<string>("")

  function handleDateChange(newValue: Date | null) {
    setDate(newValue)
  }

  async function handleDateSubmit() {
    if (!date) return
  
    const diary = await getDiaryByDate(date)
    setDiaryText(diary)
  }

  return (
    <div>
      <div className='flex justify-center mt-8'>
        <DateForm date={date} handleChange={handleDateChange} handleSubmit={handleDateSubmit} />
      </div>
    </div>
  )
}

async function getDiaryByDate(date: Date) {
  const formatedDateStr = format(date, "yyyyMMdd")

  const res = await fetch('https://fetch-diary-uezai2z2jq-uc.a.run.app', {
    method: "POST",
    headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({"date": formatedDateStr})
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch diary data')
  }

  const data = await res.text()
  return data
}
