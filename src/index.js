module.exports = (job, settings, args, type) => {
    console.log(job, settings, args, type)
    if (type !== 'prerender') {
        throw new Error(`Action ${name} can be only run in prerender mode, you provided: ${type}.`)
    }

    return Promise.reject("ERROR!!!");
};