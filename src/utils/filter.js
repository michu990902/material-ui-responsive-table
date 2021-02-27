export const createFilter = (type, condition, value) => {
    switch(type){
        case "bool":
            return item => item == value;
        case "number":
            return {
                equal: item => item == value,
                not_equal: item => item != value,
                bigger: item => item > value,
                lower: item => item < value,
            }[condition];
        case "string":
            return {
                equal: item => item.toLowerCase() != value.toLowerCase(),
                not_equal: item => item.toLowerCase() == value.toLowerCase(),
                includes: item => item.toLowerCase().includes(value.toLowerCase()),
                not_includes: item => !item.toLowerCase().includes(value.toLowerCase()),
            }[condition];
        case "date":
            return {
                equal: item => {
                    const date1 = new Date(item);
                    const date2 = new Date(value);
                    return date1 == date2;
                },
                not_equal: item => {
                    const date1 = new Date(item);
                    const date2 = new Date(value);
                    return date1 != date2;
                },
                bigger: item => {
                    const date1 = new Date(item);
                    const date2 = new Date(value);
                    return date1 > date2;
                },
                lower: item => {
                    const date1 = new Date(item);
                    const date2 = new Date(value);
                    return date1 < date2;
                },
            }[condition];
        default: return () => false;
    }
};

export const applyFilters = (data, filters) => filters.length > 0 ? data.filter(item => {
    let tmp = true;
    filters.forEach(filter => {
        if(!filter.validateFunction(item[filter.id])) tmp = false;
    });
    return tmp;
}) : data;