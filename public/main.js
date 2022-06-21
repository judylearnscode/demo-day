// const rightClick = document.getElementsByClassName("rightButton")
// rightClick.addEventListener("click", ()=>{


// const bookImg = document.querySelector(".bookFront")
// bookImg.addEventListener("click", ()=>{
//   bookImg.src = "../img/Recipe-Open.png"
// })

// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-solid fa-trash-can");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
            console.log(this.parentNode.childNodes[5].childNodes)
        const title = this.parentNode.childNodes[3].innerText
        const author = this.parentNode.childNodes[5].childNodes[1].innerText
            console.log(title, author)
        fetch('deleteRecipe', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'author': author,
          })
      }).then(function (response) {
            window.location.reload()
          })
        })
      });

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp':thumbDown
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });
      // document.querySelector(".deleteAll").addEventListener('click', function(){
      //   fetch('/profile', {
      //     method: 'delete',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({})
      //   }).then(function (response) {
      //     window.location.reload(true)
      //   })
      // });

      // document.querySelector(".deleteAuthorLines").addEventListener('click', function(){

      //   fetch('/profile', {
      //     method: 'delete',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({})
      //   }).then(function (response) {
      //     window.location.reload(true)
      //   })
      // });
