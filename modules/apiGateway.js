export let Get=async(url,body,json=false,handlerCallback,errorCallback,finalCallback)=>{
    fetch(url,
        {method:"GET",
            body:body
        }
    ).then((response)=>handlerCallback(response))
    .catch(err=>errorCallback(err))
    .finally(res=>finalCallback(res))
}

export let Post=async(url,body,headers={ 'Content-Type': 'application/json' },json=false,handlerCallback,errorCallback,finalCallback)=>{

    fetch(url,
        {method:"POST",
            headers:headers,
            body:body
        }
    ).then((response)=>handlerCallback(json?response.json():response))
    .catch(err=>errorCallback(err))
    .finally(res=>finalCallback(res))
}

export let Put=async(url,body,headers={ 'Content-Type': 'application/json' },json=false,handlerCallback,errorCallback,finalCallback)=>{
    fetch(url,
        {method:"PUT",
            headers:headers,
            body:body
        }
    ).then((response)=>handlerCallback(json?response.json():response))
    .catch(err=>errorCallback(err))
    .finally(res=>finalCallback(res))

}

export let Patch=async(url,body,headers={ 'Content-Type': 'application/json' },json=false,handlerCallback,errorCallback,finalCallback)=>{
    fetch(url,
        {method:"PATCH",
            headers:headers,
            body:body
        }
    ).then((response)=>handlerCallback(response))
    .catch(err=>errorCallback(err))
    .finally(res=>finalCallback(res))

}

export let Delete=async(url,body,json=false,handlerCallback,errorCallback,finalCallback)=>{
    fetch(url,
        {method:"DELETE",
            body:body
        }
    ).then((response)=>handlerCallback(response))
    .catch(err=>errorCallback(err))
    .finally(res=>finalCallback(res))

}