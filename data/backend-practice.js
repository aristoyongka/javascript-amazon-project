const xhr = new XMLHttpRequest();

// // Waiting the request finish loading
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https:/supersimplebackend.dev");
xhr.send();
