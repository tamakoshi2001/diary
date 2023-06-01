import { DatePicker } from "./mui";
import CommonButton from "./CommonButton";

type Props = {
    date: Date | null,
    handleChange: (value: Date | null) => void,
    handleSubmit: () => void
}

export default function DateForm({ date, handleChange, handleSubmit }: Props) {
    return (
        <div className="grid gap-4 grid-flow-col auto-cols-max">
          <DatePicker label={"日にち"} format={"yyyy/MM/dd"} value={date} onChange={handleChange} />
          <CommonButton handleClick={handleSubmit}>送信</CommonButton>
        </div>
    )
}