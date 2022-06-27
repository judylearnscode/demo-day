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
