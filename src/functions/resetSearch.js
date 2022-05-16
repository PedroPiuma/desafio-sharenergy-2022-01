
const resetSearch = async (setSearch) => {
    await setSearch('?_limit=10')
    document.getElementsByName('title-search')[0].value = ''
    document.getElementsByName('first-date')[0].value = ''
    document.getElementsByName('first-date')[0].disabled = false
    document.getElementsByName('second-date')[0].value = ''
    document.getElementsByName('second-date')[0].disabled = false
    document.getElementsByName('quantity')[0].value = '10'
}

export default resetSearch
