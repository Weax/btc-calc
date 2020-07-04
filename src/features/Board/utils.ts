const roundToCents = (num: number):string => {
    return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

export {
    roundToCents
};