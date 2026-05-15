let email=document.getElementById('email')
let password=document.getElementById('password')
let msg=document.getElementById('msg')
let btn=document.getElementById('btn')

let user=localStorage.getItem('login_user')
    if(user!=null){
      location.replace('index.html')

    }

async function login(){

  let res=await fetch('http://localhost:4000/users?email='+email.value)
  let jsonRes=await res.json()
  if(jsonRes.length==0){
    msg.textContent='User not Exist'
    msg.style.color='red'
    return
  }
  else{
    if(jsonRes[0].password==password.value){
        localStorage.setItem('login_user',email.value)
        location.replace('home.html')


    }
    else{
        msg.textContent='Invalid Credentials'
        msg.style.color='red'
        return
    }    

  }
  
}

btn.onclick=function(event){
    event.preventDefault()
    if(password.value=='' || email.value==''){
        alert("Please fill all fields")
        return
    }
    
    login()

}