export const HashForKey = (id?: string) => {
    const hash = (Math.random() + 1).toString(36).substring(5)
    if (id){
        return (id + '_' + hash).toUpperCase()
    }
    return hash
}
