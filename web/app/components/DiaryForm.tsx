"use client"

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { TextField } from "./mui";
import CommonButton from "./CommonButton";

type Props = {
    diary: DiaryObjType,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: () => void
}

export type DiaryObjType = {
  text: string, // 日記の内容
  date: Date | null, // 日記の日付
  isPresent: boolean // 日記データの存在有無
}

export default function DiaryForm({ diary, handleChange, handleSubmit }: Props) {
  const [isFormShowed, setIsFormShowed] = useState<boolean>(false) // 日記フォームが表示中か

  const selectedDateStr = diary.date ? format(diary.date, "yyyy/MM/dd") : "日付未選択"
  const isFormDisabled = !(diary.date && isFormShowed)

  useEffect(() => {
    setIsFormShowed(diary.isPresent)
  }, [diary.isPresent, diary.date])

  function handleOpenForm() {
    setIsFormShowed(true)
  }

  return (
    <div className='w-96 text-right'>
      <div className='relative'>
        <TextField
          fullWidth
          multiline
          rows={18}
          label={selectedDateStr}
          placeholder="ここに日記を入力"
          disabled={isFormDisabled}
          value={diary.text}
          onChange={handleChange}
        />
        {!isFormShowed
          && <div className='w-full h-full absolute inset-0 bg-black/10 flex justify-center items-center text-center whitespace-pre-wrap cursor' onClick={handleOpenForm}>
            {`まだ日記がありません\nクリックしてフォームを開く`}
          </div>
        }
      </div>
      <CommonButton disabled={isFormDisabled} handleClick={handleSubmit}>更新</CommonButton>
    </div>
  )
}