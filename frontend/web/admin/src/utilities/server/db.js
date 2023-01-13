import { auth } from "../../firebase";

async function postData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });
    //return response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function patchData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });
    //return response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });
    //return response.json();

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function putData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "PUT",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });
    //return response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
    });
    //return response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function headData(url = "", data = {}, idToken = "") {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-cache",
      credentials: "omit",
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
    });
    //return response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function waitForUser() {
  var wait = (ms) => new Promise((r, j) => setTimeout(r, ms));
  while (!auth().currentUser) {
    await wait(50);
  }
  return;
}

export {
  postData,
  deleteData,
  getData,
  putData,
  patchData,
  headData,
  waitForUser,
};
