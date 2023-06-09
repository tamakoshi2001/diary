"use client"

import { useState } from 'react';

import CenterContainer from './_components/CenterContainer';
import DateForm from './_components/DateForm';
import DiaryForm from './_components/DiaryForm';
import SuccessMessageToast from './_components/SuccessMessageToast';

import { DiaryObjType, useDiary } from './useDiary';

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
  
    const { getDiaryByDate } = useDiary()
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

    const { updateDiary } = useDiary()
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

