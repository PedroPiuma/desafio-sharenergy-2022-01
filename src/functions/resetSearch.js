
const resetSearch = (setSearch) => {
    document.getElementsByName('title-search')[0].value = ''
    document.getElementsByName('first-date')[0].value = ''
    document.getElementsByName('second-date')[0].value = ''
    document.getElementsByName('quantity')[0].value = '10'
    setSearch('?_limit=10')
}

export default resetSearch
