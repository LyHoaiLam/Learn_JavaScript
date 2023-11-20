document.getElementById("content").addEventListener("click", toggleSize);

function toggleSize() {
  var content = document.getElementById("content");

  if (content.classList.contains("large")) {
    content.classList.remove("large");
  } else {
    content.classList.add("large");
  }
}
