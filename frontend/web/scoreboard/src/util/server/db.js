
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
    return response;

  } catch (error) {
  }
}

export {getData};
