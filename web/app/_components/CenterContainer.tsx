type Props = {
    children: React.ReactNode,
    topMarginClass?: string
}

// 幅100%で中身を左右中央揃えにするコンテナ
export default function CenterContainer({ children, topMarginClass = "mt-8" }: Props) {
    return <div className={`flex justify-center ${topMarginClass}`}>
        {children}
    </div>
}