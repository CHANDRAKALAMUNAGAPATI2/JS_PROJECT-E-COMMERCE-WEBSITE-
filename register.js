let username=document.getElementById('username')
let password=document.getElementById('password')
let email=document.getElementById('email')
let btn=document.getElementById('btn')
let msg=document.getElementById('msg')

let user=localStorage.getItem('login_user')
    if(user!=null){
      location.replace('index.html')

    }



async function register(){

    let data=await fetch('http://localhost:4000/users?email='+email.value)
    let jsonData=await data.json()
    if(jsonData.length>0){
        msg.textContent='User already Exist'
        msg.style.color='red'
        return


    }
    

   let res= await fetch('http://localhost:4000/users',{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        username:username.value,
        email:email.value,
        password:password.value
    })
   })
   location.replace('login.html')

     
}


btn.onclick=function(event){
    event.preventDefault()
    if(username.value=='' || password.value=='' || email.value==''){
        alert("Please fill all fields")
        return
    }

    register()
}