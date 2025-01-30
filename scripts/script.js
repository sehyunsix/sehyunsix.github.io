function createParagraph() {
  const para = document.createElement("p");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}

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

  // 게시물 데이터 (실제로는 서버에서 가져올 데이터)
  const posts = {
    'quicksort': {
      title: '퀵소트 구현하기',
      date: '2024년 3월 20일',
      content: '퀵소트 알고리즘의 구현 방법과 시간복잡도 분석...',
      category: 'algorithm'
    },
    'linear-algebra': {
      title: '선형대수학 기초',
      date: '2024년 3월 19일',
      content: `
        <p>벡터 공간과 행렬의 기본 개념을 알아봅시다.</p>
        <p>벡터의 내적은 다음과 같이 정의됩니다:</p>
        <p>$$\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^n a_i b_i$$</p>
        <p>행렬식은 다음과 같이 계산됩니다:</p>
        <p>$$\\det(A) = \\begin{vmatrix}
          a_{11} & a_{12} \\\\
          a_{21} & a_{22}
        \\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$</p>
      `,
      category: 'mathematics'
    },
    'number-theory': {
      title: '정수론의 기초와 응용',
      date: '2024년 3월 19일',
      content: `
        <p>정수론의 기본 개념들을 살펴봅시다.</p>
        <p>페르마의 소정리:</p>
        <p>$$a^{p-1} \\equiv 1 \\pmod{p}$$</p>
        <p>여기서 $$p$$는 소수이고 $$a$$는 $$p$$와 서로소인 정수입니다.</p>
        <p>디오판토스 방정식의 예:</p>
        <p>$$ax + by = c$$</p>
        <p>여기서 $$a$$, $$b$$, $$c$$는 정수이고, 정수해 $$x$$, $$y$$를 찾는 것이 목표입니다.</p>
      `,
      category: 'mathematics'
    },
    'cache-memory': {
      title: '캐시 메모리의 작동원리',
      date: '2024년 3월 18일',
      content: 'CPU 캐시 메모리의 구조와 작동방식...',
      category: 'computer-architecture'
    },
    'quantum-entanglement': {
      title: '양자 얽힘 현상 이해하기',
      date: '2024년 3월 17일',
      content: '양자 컴퓨팅의 핵심 개념인 양자 얽힘 현상...',
      category: 'quantum-computing'
    },
    'dev-productivity': {
      title: '개발자의 생산성 향상을 위한 팁',
      date: '2024년 3월 16일',
      content: '효율적인 코딩을 위한 개발 환경 설정과 도구들...',
      category: 'etc'
    },
    'guitar-cover': {
      title: 'Entertainer - Scott Joplin (Guitar Cover)',
      date: '2024년 3월 21일',
      content: `
        <div>
          <p>Entertainer의 Entertainer를 기타로 커버한 영상입니다.</p>
          <p>영상 링크: <a href="https://www.youtube.com/watch?v=j3JfDVKhqSA" target="_blank">
            https://www.youtube.com/watch?v=j3JfDVKhqSA
          </a></p>
        </div>
      `,
      category: 'etc'
    }
  };

  // 게시물 표시 함수
  function displayPost(postData) {
    const currentPost = document.getElementById('current-post');
    currentPost.innerHTML = `
      <h2>${postData.title}</h2>
      <h5>${postData.date}</h5>
      <div class="content">
        ${postData.content}
      </div>
      <div class="post-actions">
        <button class="edit-btn">수정하기</button>
        <button class="delete-btn">삭제하기</button>
      </div>
    `;

    // MathJax 재렌더링
    if (window.MathJax) {
      MathJax.typesetPromise();
    }

    setupPostActions();
  }

  // 수정/삭제 버튼 이벤트 설정 함수
  function setupPostActions() {
    const editBtn = document.querySelector('.edit-btn');
    const deleteBtn = document.querySelector('.delete-btn');

    editBtn.addEventListener('click', function() {
      const modal = document.getElementById('postModal');
      const postTitle = document.querySelector('#current-post h2').textContent;
      const postContent = document.querySelector('#current-post .content').innerHTML;

      document.getElementById('postTitle').value = postTitle;
      document.getElementById('postContent').value = postContent;

      modal.style.display = "block";
    });

    deleteBtn.addEventListener('click', function() {
      if(confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
        document.getElementById('current-post').remove();
      }
    });
  }

  // 사이드바 메뉴 클릭 이벤트 설정
  const menuLinks = document.querySelectorAll('.sub-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const postTitle = this.textContent;
      // 게시물 데이터에서 해당 제목의 게시물 찾기
      const postData = Object.values(posts).find(post => post.title === postTitle);
      if (postData) {
        displayPost(postData);
      }
    });
  });

  // 초기 게시물 표시 (예: 첫 번째 게시물)
  displayPost(posts['number-theory']);
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

