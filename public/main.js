// const rightClick = document.getElementsByClassName("rightButton")
// rightClick.addEventListener("click", ()=>{

// const bookImg = document.querySelector(".bookFront")
// bookImg.addEventListener("click", ()=>{
//   bookImg.src = "../img/Recipe-Open.png"
// })

// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-solid fa-trash-can");

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const recipeId = this.parentNode.childNodes[3].innerText;
    console.log(this.parentNode.childNodes[3].innerText);
    fetch("deleteRecipe", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: recipeId,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

document?.querySelector(".randomButton")?.addEventListener("click", function () {
  window.location.reload();
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
