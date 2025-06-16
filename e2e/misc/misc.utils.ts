export function getCurrentDateTime(offsetDays: number = 0): string {
    const now = new Date();
    now.setDate(now.getDate() + offsetDays);

    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
}

export function getCurrentDate(offsetDays: number = 0): string {
    const now = new Date();
    now.setDate(now.getDate() + offsetDays);
    
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
    return formattedDate;
}
