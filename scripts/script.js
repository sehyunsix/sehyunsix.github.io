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

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('postModal');
  const btn = document.getElementById('newPostBtn');
  const span = document.getElementsByClassName('close')[0];
  const form = document.getElementById('newPostForm');

  // 모달 열기
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // 모달 닫기
  span.onclick = function() {
    modal.style.display = "none";
  }

  // 모달 외부 클릭시 닫기
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // 폼 제출 처리
  form.onsubmit = function(e) {
    e.preventDefault();

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const tag = document.getElementById('postTag').value;

    // 새 게시물 HTML 생성
    const newPost = createPostElement(title, content);

    // 선택된 카테고리에 게시물 추가
    const category = document.getElementById(tag);
    category.insertAdjacentElement('afterend', newPost);

    // 폼 초기화 및 모달 닫기
    form.reset();
    modal.style.display = "none";
  }
});

function createPostElement(title, content) {
  const date = new Date().toLocaleDateString('ko-KR');

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <h2>${title}</h2>
    <h5>${date}</h5>
    <p>${content}</p>
  `;

  return card;
}

