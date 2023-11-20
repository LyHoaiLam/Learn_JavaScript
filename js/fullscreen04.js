document.getElementById("content").addEventListener("click", toggleSize);

function toggleSize() {
  var content = document.getElementById("content");
  var overlay = document.createElement("div");
  overlay.className = "overlay";

  if (content.classList.contains("large")) {
    content.classList.remove("large");
    document.body.removeChild(overlay); // Loại bỏ lớp nền nếu nội dung không còn được phóng to
  } else {
    content.classList.add("large");
    document.body.appendChild(overlay); // Thêm lớp nền khi phóng to nội dung
  }
}
