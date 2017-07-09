var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
}
var InfoGen = {
  email: localStorage.getItem("case_email"),
  token: localStorage.getItem("case_token"),
  info: JSON.parse(localStorage.getItem("info")),
  isMobile:isMobile,
  listUserCanAddTask:JSON.parse(localStorage.getItem("listUserCanAddTask"))
}

export default InfoGen;
