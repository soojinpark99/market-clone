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

function renderData(data) {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
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

async function fetchlist() {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
}

fetchlist();
