import { compareAsc, format, setDay } from "date-fns"

const filterByDate = async (element, setData, data) => {
    if (element.name === 'first-date') {
        setData(data.filter(elem => {
            const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
            const dateFromInput = format(new Date(element.value), 'yyyy-MM-dd')
            return compareAsc(new Date(dateFromInput), new Date(dateFromData)) < 0
        }))
    }
    else {
        console.log(element.value)
        setData(data.filter(elem => {
            const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
            const dateFromInput = format(setDay(new Date(element.value), 3), 'yyyy-MM-dd')
            console.log('dateFromInput: ' + dateFromInput)
            return compareAsc(new Date(dateFromData), new Date(dateFromInput)) < 0
        }))
    }
}

export default filterByDate
