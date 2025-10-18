export const Get = async (url, handlerCallback=()=>{}, errorCallback=()=>{}, finalCallback=()=>{}, json = false) => {
 
    const response = await fetch(url,{method:"GET"});
    let data;
 
    if (response.ok) {
      data = json ? await response.json() : await response.text();
     
      handlerCallback && handlerCallback(data);
    } else {
      data = { status: response.status, error: response.statusText };
      errorCallback && errorCallback(data);
    }
    finalCallback && finalCallback(data);
    return data;
  
};

export let Post=async(url,body,handlerCallback=()=>{},errorCallback=()=>{},finalCallback=()=>{},json=false,headers={ 'Content-Type': 'application/json' })=>{

    let response=await fetch(url,
        {method:"POST",
            headers:headers,
            body:body
        })

      if (response.ok) {
      data = json ? await response.json() : await response.text();
     
      handlerCallback && handlerCallback(data);
    } else {
      data = { status: response.status, error: response.statusText };
      errorCallback && errorCallback(data);
    }
    finalCallback && finalCallback(data);
    return data;
  
}
export let Put=async(url,body,handlerCallback=()=>{},errorCallback=()=>{},finalCallback=()=>{},json=false,headers={ 'Content-Type': 'application/json' })=>{
    let response =await fetch(url,
        {method:"PUT",
            headers:headers,
            body:body
        }
    )
      if (response.ok) {
      data = json ? await response.json() : await response.text();
     
      handlerCallback && handlerCallback(data);
    } else {
      data = { status: response.status, error: response.statusText };
      errorCallback && errorCallback(data);
    }
    finalCallback && finalCallback(data);
    return data;
  

}
export let Patch=async(url,body,handlerCallback=()=>{},errorCallback=()=>{},finalCallback=()=>{},json=false,headers={ 'Content-Type': 'application/json' })=>{
    let response =await fetch(url,
        {method:"PATCH",
            headers:headers,
            body:body
        }
    )
      if (response.ok) {
      data = json ? await response.json() : await response.text();
     
      handlerCallback && handlerCallback(data);
    } else {
      data = { status: response.status, error: response.statusText };
      errorCallback && errorCallback(data);
    }
    finalCallback && finalCallback(data);
    return data;
}
export let Delete=async(url,handlerCallback=()=>{},errorCallback=()=>{},finalCallback=()=>{})=>{
    let response =await fetch(url,
        {method:"DELETE"}
    )
      if (response.ok) {
      data =  await response.json() ;
     
      handlerCallback && handlerCallback(data);
    } else {
      data = { status: response.status, error: response.statusText };
      errorCallback && errorCallback(data);
    }
    finalCallback && finalCallback(data);
    return data;
}