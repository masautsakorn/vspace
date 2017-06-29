var InfoGen = {
  email: localStorage.getItem("case_email"),
  token: localStorage.getItem("case_token"),
  info: JSON.parse(localStorage.getItem("info")),
  listUserCanAddTask:JSON.parse(localStorage.getItem("listUserCanAddTask"))
}

export default InfoGen;
