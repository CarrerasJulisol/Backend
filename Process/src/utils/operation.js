function calculateNumbers(cant) {
    const between = () => Math.floor(Math.random() * 1000);
    let result;
    for (let i = 0; i < cant; i++) {
        const value = between();
        if(result[value])
            result[value] = result[value]+1;
        else
            result[value] = 1;
    }
    return result
}

process.on('message',(cant)=> {
    let data = calculateNumbers(cant)
    process.send(data);
});