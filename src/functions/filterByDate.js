import { add, compareAsc, format } from "date-fns"

const filterByDate = (element, setData, data) => {
    document.getElementsByName(element.name)[0].disabled = true
    if (element.name === 'first-date') {
        setData(data.filter(elem => {
            const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
            const dateFromInput = format(new Date(element.value), 'yyyy-MM-dd')
            return compareAsc(new Date(dateFromInput), new Date(dateFromData)) < 0
        }))

    }
    else {
        setData(data.filter(elem => {
            const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
            const dateFromInput = format(add(new Date(element.value), { days: 1 }), 'yyyy-MM-dd')
            return compareAsc(new Date(dateFromInput), new Date(dateFromData)) >= 0
        }))
    }

}

export default filterByDate
