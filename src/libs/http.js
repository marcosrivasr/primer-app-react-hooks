

export async function post(url, data){
    const response = await fetch(url, {
                        method: 'post', 
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      });
    const json = await response.json();
    return json;
}

export async function put(url, data){
    const response = await fetch(url, {
                        method: 'put', 
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      });
    const json = await response.json();
    return json;
}

export async function get(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}