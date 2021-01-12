const getIDs = new Promise(() => {
    settimeout(() => {
        resolve([1, 2, 3])
    }, 1400)
})

getIDs.then(IDs => {
    console.log(IDs)
})
.catch(err => {
    console.log(err)
})

// Learnt about promises
// Learnt about AJAX and APIs
// Learnt about Async/await