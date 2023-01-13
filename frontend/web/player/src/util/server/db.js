
async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST', 
      cache: 'no-cache',
      credentials: 'omit',
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    //return response.json();
    return response;

  } catch (error) {
    console.log(error);
  }
}


async function getData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET', 
      cache: 'no-cache',
      credentials: 'omit',
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //return response.json();
    return response.json();

  } catch (error) {
    console.log(error);
  }
}

export {postData, getData};
