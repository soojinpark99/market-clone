const form = document.getElementById("write-form");

async function handleSubmitForm(event) {
  event.preventDefault();

  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());

  try {
    // '/items' 서버에 폼 데이터를 업로드
    const res = await fetch("/items", {
      method: "POST",
      body: body,
    });
    // 응답을 json 형태로 변환
    const data = await res.json();
    // 성공 시 root 페이지로 이동
    if (data === "200") window.location.pathname = "/";
    // root 페이지로 이동
  } catch (e) {
    console.error(e);
  }
  // try 안의 로직을 실행하고 에러가 발생하면 catch 안의 로직이 실행됨
}

form.addEventListener("submit", handleSubmitForm);
