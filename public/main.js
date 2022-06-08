const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Aang',
            quote: 'Fire Lord Ozai, you and your forefathers have devastated the balance of this world, and now you shall pay the ultimate price!',
            // name: 'Toph',
            // quote: 'Phoenix King of getting his butt whooped!',
            // name: 'Katara',
            // quote: 'I\'ll make sure your destiny ends, right then and there, Permanently!',
            // name: 'Sokka',
            // quote: 'Now that his Firebending\'s gone I guess we should call him the loser lord!',
            // name: 'Zuko',
            // quote: "Hey, Zuko here!",
        })
    })
    .then(res =>{
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Ozai'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Ozai quote to delete'
          } else {
            window.location.reload(true)
          }
    })
})