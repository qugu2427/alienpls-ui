const apiUrl = "http://localhost:3000";

let fetchAsJSON = async function(url, options) {
  let err = "";
  let data = null;
  try {
    let response = await fetch(url, options);
    if (response.status == 429) {
      err = "sending too many requests";
    } else {
      if (response.status < 200 || response.status > 299) {
        err = await response.text();
      } else {
        data = await response.text();
        data = JSON.parse(data);
      }
    }
  } catch (e) {
    console.log(e);
    err = "backend did not respond";
  }
  return { err, data };
};

let fetchSignInUrl = async function() {
  let res = await fetchAsJSON(`${apiUrl}/signInUrl`, { method: "GET" });
  return res;
};

let fetchSignIn = async function(code) {
  let res = await fetchAsJSON(`${apiUrl}/signIn?code=${code}`, {
    method: "GET",
  });
  return res;
};

let fetchUserInfo = async function(token, clientID) {
  let res = await fetchAsJSON(`https://api.twitch.tv/helix/users`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token, "Client-ID": clientID },
  });
  return res;
};

let sendCreate = async function(token, name, description, imageLink) {
  let res = await fetchAsJSON(`${apiUrl}/create`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      image: imageLink,
    }),
  });
  return res;
};

let fetchRoom = async function(room) {
  let res = await fetchAsJSON(`${apiUrl}/rooms/${room}`, {
    method: "GET",
  });
  return res;
};

let fetchRooms = async function() {
  let res = await fetchAsJSON(`${apiUrl}/rooms`, {
    method: "GET",
  });
  return res;
};

let sendEnqueue = async function(token, room, host, id) {
  let res = await fetchAsJSON(`${apiUrl}/enqueue`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room,
      host,
      id,
    }),
  });
  return res;
};

let sendVote = async function(token, room, vote) {
  let res = await fetchAsJSON(`${apiUrl}/vote`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room,
      vote,
    }),
  });
  return res;
};

export {
  fetchSignInUrl,
  fetchSignIn,
  fetchUserInfo,
  sendCreate,
  fetchRoom,
  fetchRooms,
  sendEnqueue,
  sendVote,
};
