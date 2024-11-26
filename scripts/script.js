function createParagraph() {
  const para = document.createElement("p");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}



document.addEventListener('mousemove', function(e) {
  const container = document.querySelector('.container');
// && !container.classList.contains('sidebar-active')
  // 마우스가 화면 왼쪽 20px 이내로 들어오면 사이드바 활성화
  if (e.clientX < 20  && !container.classList.contains('sidebar-active')) {
    container.classList.add('sidebar-active');
    console.log(container.classList)
  }
});


document.addEventListener('mousemove', function(e) {
  const container = document.querySelector('.container');
  const sidebarContainer = document.querySelector('.sidebar-container');

  if (container.classList.contains('sidebar-active') &&
          e.clientX > 400 ) {
    container.classList.remove('sidebar-active');
  }
});

