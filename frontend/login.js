const form = document.querySelector("#login-form");

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  // sha256 함수로 패스워드 암호화
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  const accessToken = data.access_token;
  // 엑세스 토큰을 윈도우 로컬스토리지에 저장 - 브라우저를 닫았다 열어도 로그인 유지
  window.localStorage.setItem("token", accessToken);
  alert("로그인되었습니다!");

  window.location.pathname = "/";
}

form.addEventListener("submit", handleSubmit);
