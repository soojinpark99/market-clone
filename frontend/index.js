// 업로드 경과 시간 확인하는 함수
function clacTime(timestamp) {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
}

// 불러온 데이터를 html 형식에 맞게 렌더링하는 함수
function renderData(data) {
  const main = document.querySelector("main");
  // 각각의 게시물에 함수 적용
  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");

    // 이미지를 불러옴
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const Info = document.createElement("div");
    Info.className = "item-list__info";

    const Title = document.createElement("div");
    Title.className = "item-list__title";
    Title.innerText = obj.title;

    const Meta = document.createElement("div");
    Meta.className = "item-list__meta";
    Meta.innerText = obj.place + " " + clacTime(obj.insertAt);

    const Price = document.createElement("div");
    Price.className = "item-list__price";
    Price.innerText = obj.price;

    imgDiv.appendChild(img);

    Info.appendChild(Title);
    Info.appendChild(Meta);
    Info.appendChild(Price);

    div.appendChild(imgDiv);
    div.appendChild(Info);
    main.appendChild(div);
  });
}

// 게시물 데이터를 불러오는 함수
async function fetchlist() {
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 유저 인증이 안 된 사용자면 로그인 페이지로 이동
  if (res.status === 401) {
    alert("로그인이 필요합니다.");
    window.location.pathname = "/login.html";
    return;
  }
  const data = await res.json();
  renderData(data);
}

fetchlist();
