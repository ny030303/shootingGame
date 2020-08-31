import axios from "axios";
// jquery $.get $.getJSON, $.post $.ajax
// fetch(url).then((res) => res.json()).then(jsdata => )
const config = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};


export const getLoginInfo = () => {
  let data = localStorage.getItem('loginUser');
  return (data) ? JSON.parse(data) : null;
};

export const deleteUser = (uid, callback) => {
  axios.get(`/php/deleteUser.php?id=${uid}`, config).then(res => {
    console.log('deleteUser:', res.data.result);
  });
};

export const updateUserScore = (score, uid, callback) => {
  // console.log(score, uid);
  axios.get(`/php/updateUserScore.php?id=${uid}&score=${score}`, config).then(res => {
    console.log('updateUserScore:', res);
    if (callback) callback(res.data.result);
  });
};

export const logout = (callback) => {
  localStorage.removeItem('loginUser');
  axios.get(`/php/logout.php`, config).then(res => {
    console.log('logout:', res.data.result);
    if (callback) callback(res.data.result);
  });
};

export const getUser = (uid, pwd, callback) => {
  axios.get(`/php/login.php?id=${uid}&pwd=${pwd}`, config).then(res => {
    console.log('getUser:', res.data);
    if( res.data.result ) {
      localStorage.setItem('loginUser', JSON.stringify(res.data.users));
    }
    if (callback) callback(res.data);
  });
};

//   <form href="/php/signup.php">
//     <input name="id" value='aaa'>
//     <input name="pwd" value='1234'>
//   </form>
// data = {
//   id: "aaa",
//   pwd: 1234
// }
export const putUsers = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/signup.php`, formData).then(res => {
    console.log('putUsers:', res.data);
    if (callback) callback(res.data);
  });
};


export const getUsers = (callback) => {
  axios.get("/php/getUsers.php", config).then(res => {
    console.log('getUsers:', res.data);
    if (callback) callback(res.data);
  });
};
