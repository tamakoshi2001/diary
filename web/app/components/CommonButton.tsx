type Props = {
    children: React.ReactNode,
    disabled?: boolean,
    handleClick: () => void
}

export default function DateForm({ children, disabled = false, handleClick }: Props) {
    const disabledClassName = disabled ? "bg-sky-700 shadow-xl" : ""
    return <button className={`h-10 text-white bg-sky-600 hover:bg-sky-700 px-6 mt-2 rounded shadow-md hover:shadow-xl ${disabledClassName}`} disabled={disabled} onClick={handleClick}>
        {children}
    </button>
}