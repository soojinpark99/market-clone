const form = document.querySelector("#signup-form");

// 비밀번호 입력값과 비밀번호 확인 입력값이 같은지 확인하는 함수
function checkPassword() {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  if (password1 === password2) {
    return true;
  } else return false;
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  // sha256 함수로 패스워드 암호화
  formData.set("password", sha256Password);
  // password의 value값을 암호화한 값으로 대체

  const div = document.querySelector("#info");

  if (checkPassword()) {
    // checkPassword 결과가 true일 때
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data === "200") {
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
  }
}

form.addEventListener("submit", handleSubmit);
