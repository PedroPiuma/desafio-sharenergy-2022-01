const saveArticle = (publishedAt, title, id) => {
    let values = JSON.parse(localStorage.values)
    if (!values[0]) {
        localStorage.setItem(`View-1`, JSON.stringify({ publishedAt, title, id }))
        localStorage.setItem('values', JSON.stringify([2, 3]))
        return
    }
    localStorage.setItem(`View-${values[0]}`, JSON.stringify({ publishedAt, title, id }))
    values.shift()
    localStorage.setItem('values', JSON.stringify(values))
    return
}

export default saveArticle