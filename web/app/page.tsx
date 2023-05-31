"use client"

import { useState } from 'react';
import { format } from 'date-fns';

import CenterContainer from './components/CenterContainer';
import DateForm from './components/DateForm';
import DiaryForm, { DiaryObjType } from './components/DiaryForm';
import SuccessMessageToast from './components/SuccessMessageToast';

export default function Home() {
  const [date, setDate] = useState<Date | null>(null) // 日付フィールドの値
  const [diaryObj, setDiaryObj] = useState<DiaryObjType>({ // 表示する日記のデータ
    text: "", date: null, isPresent: false
  })

  const [messageOnUpdated, setMessageOnUpdated] = useState("") // 更新完了メッセージ
  const [isToastOpened, setIsToastOpened] = useState(false) // メッセージトーストが表示中か

  function handleDateChange(newValue: Date | null) {
    setDate(newValue)
  }

  async function handleDateSubmit() {
    if (!date) return
  
    const diary = await getDiaryByDate(date)
    setDiaryObj({
      text: diary.is_text ? diary.text : "",
      date: date,
      isPresent: diary.is_text
    })
  }

  function handleDiaryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDiaryObj({...diaryObj, text: event.target.value})
  }

  async function handleDiaryUpdate() {
    if (!diaryObj.date) return

    const message = await updateDiary(diaryObj.text, diaryObj.date)

    setMessageOnUpdated(message)
    setIsToastOpened(true)
  }

  return (
    <>
      <CenterContainer>
        <DateForm
          date={date}
          handleChange={handleDateChange}
          handleSubmit={handleDateSubmit}
        />
      </CenterContainer>
      <CenterContainer>
        <DiaryForm
          diary={diaryObj}
          handleChange={handleDiaryChange}
          handleSubmit={handleDiaryUpdate}
        />
      </CenterContainer>
      <SuccessMessageToast message={messageOnUpdated} isOpened={isToastOpened} setIsOpened={setIsToastOpened} />
    </>
  )
}

async function getDiaryByDate(date: Date): Promise<{ text: string, is_text: boolean }> {
  const formatedDateStr = format(date, "yyyyMMdd")

  const res = await fetch('https://fetch-diary-uezai2z2jq-uc.a.run.app', {
    method: "POST",
    headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ "date": formatedDateStr })
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch diary data')
  }

  const diaryData = await res.json()
  return diaryData
}

async function updateDiary(diary: string, date: Date) {
  const formatedDateStr = format(date, "yyyyMMdd")

  const res = await fetch('https://update-diary-uezai2z2jq-uc.a.run.app', {
    method: "POST",
    headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ "date": formatedDateStr, "text": diary })
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to update diary data')
  }

  const message = await res.text()
  return message
}
