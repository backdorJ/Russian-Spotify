export const formatDate = (date: Date) => {
    let newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const day = ('0' + newDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};