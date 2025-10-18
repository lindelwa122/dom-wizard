// api.test.js
import { afterEach, test, expect, beforeEach ,jest} from "@jest/globals";
import { Get,Post,Put,Patch,Delete } from "../modules/apiGateway.js";



 uid_list={"1":{
    name:"john"
 },"2":{
    name:"mark"
 },"3":{
    name:"bob"
 },"4":{
    name:"alice"
 },"5":{
    name:"smith"
 },"6":{
    name:"jamie"
 }}
// Start MSW server
beforeEach(() =>{
    global.fetch=jest.fn(routeLogic);
});


afterEach(() => {
    jest.resetAllMocks();
});

let routeLogic =async(url,options)=>{
   
        let parsed = new URL(url)
      
        let id =parsed.searchParams.get("id")
        let js =parsed.searchParams.get("json")
        if(options.method ==="GET"){
        if (uid_list[id]!= undefined){
        return js?{
            ok:true,
           text: async()=>(JSON.stringify({id:id,
            message:`fetched user:${uid_list[id].name}`}))
        }:{
            ok:true,
           json: async()=>({id:id,
            message:`fetched user:${uid_list[id].name}`})
        }}
        else{
            return{
            ok:false,
            status:404,
            statusText:`user:${id} not found`,
           
        }
        }
    }
    if (options.method == "POST"){
        nid="7"
        if (options.body.name!=undefined){
        uid_list[nid]={name:options.body.name}}
        else{
            return{
                ok:false,
                status:400,
                statusText:"invalid post data",
                text:async=>("invalid post data")
            }
        }
        console.log(uid_list)
        return js?{
            ok:true,
           text: async()=>(`created_user:${uid_list[nid].name}`)
        }:{
            ok:true,
           json: async()=>({id:nid,
            message:`created_user:${uid_list[nid].name}`})
        }
    }
    if (options.method == "PUT"){
        
        if (options.body.name!=undefined && id!=undefined){
        uid_list[id]={name:options.body.name}}
        else{
            return{
                ok:false,
                status:400,
                statusText:"invalid put request",
                text:async=>("invalid put request")
            }
        }
        console.log(uid_list)
        return js?{
            ok:true,
           text: async()=>(`placed_user:${uid_list[id].name}`)
        }:{
            ok:true,
           json: async()=>({id:id,
            message:`placed_user:${uid_list[id].name}`})
        }
    }
    if (options.method == "PATCH"){
        
        if (options.body.name!=undefined && id!=undefined&&uid_list[id] !=undefined){
        uid_list[id]={name:options.body.name}}
        else{
            return{
                ok:false,
                status:404,
                statusText:"patch data not found",
                text:async=>("patch data not found")
            }
        }
        console.log(uid_list)
        return js?{
            ok:true,
           text: async()=>(`patched_user:${uid_list[id].name}`)
        }:{
            ok:true,
           json: async()=>({id:id,
            message:`patched_user:${uid_list[id].name}`})
        }
    }
     if (options.method == "DELETE"){
        let deleted
        if (id!=undefined&&uid_list[id] !=undefined){
         deleted=uid_list[id]
        delete uid_list[id]
        }
        else{
            return{
                ok:false,
                status:404,
                statusText:"user not found",
                text:async=>("user not found")
            }
        }
        console.log(uid_list)
        return {
            ok:true,
           json: async()=>({id:id,
            message:`deleted_user:${deleted.name}`})
        }
    }
}

let handler=(data)=>{
    console.log("Run Handler: "+JSON.stringify(data))
}
let errorhandler=(data)=>{
    console.log("Run Error: "+JSON.stringify(data))
}
let finalhandler=(data)=>{
    console.log("Run Finally: "+JSON.stringify(data))
}

  test("should handle a 200 GET request correctly", async () => {
    
  let uid="6"
  let res =await Get(`https://example.com/user?id=${uid}`,handler,errorhandler,finalhandler,true )

  expect(res).toEqual({id:uid,message:`fetched user:jamie`})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${uid}`,{"method": "GET"})

  
})
  test("should handle a 200 GET request with non json response", async () => {

  let uid="6"
  let res =await Get(`https://example.com/user?id=${uid}&json=1`,handler,errorhandler,finalhandler,false )

  expect(res).toEqual(JSON.stringify({id:uid,message:`fetched user:jamie`}))
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${uid}&json=1`,{"method": "GET"})

  
})
  test("should handle a bad GET request", async () => {
   
  let uid="7"
  let res =await Get(`https://example.com/user?id=${uid}`,handler,errorhandler,finalhandler,true )

  expect(res).toEqual({error:`user:${uid} not found`,status:404})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${uid}`,{"method": "GET"})

  
})

let jsHeader={ 'Content-Type': 'application/json' }

  test("should handle a 200 POST request correctly", async () => {
  
   let form={name:"jacob"}
  let res =await Post(`https://example.com/new-user`,form,handler,errorhandler,finalhandler,true )

  expect(res).toEqual({id:"7",message:`created_user:${form.name}`})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/new-user`,{"body":form,"method": "POST","headers":jsHeader})

  
})
  test("should handle a 200 POST request with non json response", async () => {
 
  
   let form={name:"jacob"}
  let res =await Post(`https://example.com/new-user?json=1`,form,handler,errorhandler,finalhandler,false )

   expect(res).toEqual(`created_user:${form.name}`)
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/new-user?json=1`,{"body":form,"method": "POST","headers":jsHeader})

  
})

  test("should handle a bad POST request", async () => {
    

  let form={data:"jacob"}
  let res =await Post(`https://example.com/new-user`,form,handler,errorhandler,finalhandler,true )

   expect(res).toEqual({error:`invalid post data`,status:400})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/new-user`,{"body":form,"method": "POST","headers":jsHeader})

  
})

  test("should handle a 200 Put request correctly", async () => {
   
  let form={id:"8",name:"jacob"}
  let res =await Put(`https://example.com/user?id=${form.id}`,form,handler,errorhandler,finalhandler,true )

  expect(res).toEqual({id:form.id,message:`placed_user:${form.name}`})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${form.id}`,{"body":form,"method": "PUT","headers":jsHeader})

  
})

  test("should handle a bad Put request", async () => {
   

  let form={id:"8",name:"jacob"}
  let res =await Put(`https://example.com/user`,form,handler,errorhandler,finalhandler,true )

   expect(res).toEqual({error:`invalid put request`,status:400})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user`,{"body":form,"method": "PUT","headers":jsHeader})

  
})

  test("should handle a 200 Patch request correctly", async () => {
   
  let form={id:"3",name:"madea"}
  let res =await Patch(`https://example.com/user?id=${form.id}`,form,handler,errorhandler,finalhandler,true )

  expect(res).toEqual({id:form.id,message:`patched_user:${form.name}`})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${form.id}`,{"body":form,"method": "PATCH","headers":jsHeader})

  
})

  test("should handle a bad Patch request", async () => {
   

  let form={id:"9",name:"aron"}
  let res =await Patch(`https://example.com/user?id=${form.id}`,form,handler,errorhandler,finalhandler,true )

   expect(res).toEqual({error:`patch data not found`,status:404})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${form.id}`,{"body":form,"method": "PATCH","headers":jsHeader})

  
})

  test("should handle a 200 Delete request correctly", async () => {
   
  let form={id:"3",name:"madea"}
  let res =await Delete(`https://example.com/user?id=${form.id}`,handler,errorhandler,finalhandler )

  expect(res).toEqual({id:form.id,message:`deleted_user:${form.name}`})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${form.id}`,{"method": "DELETE"})
  
})

  test("should handle a bad Delete request", async () => {
   

  let form={id:"9",name:"aron"}
  let res =await Delete(`https://example.com/user?id=${form.id}`,handler,errorhandler,finalhandler )

   expect(res).toEqual({error:`user not found`,status:404})
  expect(global.fetch).toHaveBeenCalledWith(`https://example.com/user?id=${form.id}`,{"method": "DELETE"})

  
})
