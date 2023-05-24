type Props = {
    children: React.ReactNode,
    handleClick: () => void
}

export default function DateForm({ children, handleClick }: Props) {
    return <button className="h-10 text-white bg-sky-600 hover:bg-sky-700 px-6 mt-2 rounded shadow-md hover:shadow-xl" onClick={handleClick}>
        {children}
    </button>
}