export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <header className='bg-sky-500 py-2.5 text-center'>
            <h1 className='text-5xl font-bold text-sky-50'>
                {children}
            </h1>
        </header>
    );
}