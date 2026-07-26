
function checkForm() {
  const isChecked = document.getElementById("agreeChk").checked;
  if (!isChecked) {
    alert("약관에 동의해야 합니다.");
    return false;
  }
  alert("동의되었습니다.");
}