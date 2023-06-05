import { format } from 'date-fns';

export type DiaryObjType = {
    text: string, // 日記の内容
    date: Date | null, // 日記の日付
    isPresent: boolean // 日記データの存在有無
}

export function useDiary() {
    function formatDateToQueryStr(date: Date): string {
        return format(date, "yyyyMMdd")
    }

    async function getDiaryByDate(date: Date): Promise<{ text: string, is_text: boolean }> {
        const formatedDateStr = formatDateToQueryStr(date)
    
        const fetchApiUrl = process.env.NEXT_PUBLIC_FETCH_DIARY_API_URL
        if (!fetchApiUrl) {
            throw new Error('Failed to read api url')
        }
        const res = await fetch(fetchApiUrl, {
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
        const formatedDateStr = formatDateToQueryStr(date)
    
        const updateApiUrl = process.env.NEXT_PUBLIC_UPDATE_DIARY_API_URL
        if (!updateApiUrl) {
            throw new Error('Failed to read api url')
        }
        const res = await fetch(updateApiUrl, {
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

    return {
        getDiaryByDate,
        updateDiary
    }
}
