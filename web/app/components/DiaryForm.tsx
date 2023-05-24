import { format } from 'date-fns';

import { TextField } from "./mui";
import CommonButton from "./CommonButton";

type Props = {
    diary: string,
    dateOfDiary: Date,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: () => void
}

export default function DiaryForm({ diary, dateOfDiary, handleChange, handleSubmit }: Props) {
    return (
        <div className='w-96 text-right'>
          <TextField
            fullWidth
            multiline
            rows={18}
            label={format(dateOfDiary, "yyyy/MM/dd")}
            placeholder="ここに日記を入力"
            value={diary}
            onChange={handleChange}
          />
          <CommonButton handleClick={handleSubmit}>更新</CommonButton>
        </div>
    )
}