export function calulateAge(date) {
    let birtdate = new Date(date)
    let now = new Date()
    return now.getFullYear() - birtdate.getFullYear()
}

export function convertDateToString(date) {
    return date.year + "-" + date.month + "-" + date.day
}