let email=document.getElementById('email')

let password=document.getElementById('password')
let msg=document.getElementById('msg')
console.log('hi');
console.log(login);
let a=document.getElementById('login')


        a.onclick=(e)=>{
            e.preventDefault()
            if(email.value.trim()==='' || password.value.trim()===''){
    
                alert('please fill all fields')
                return
    
            }
            let data=JSON.parse(localStorage.getItem('usersdata'))
            function getusersdata(){
                if(data==null){
                    return []
                }
                else{
                    return data
                }
            }

            let usersdata=getusersdata()

            let isalreadyExist=false

            for(let singleuser of usersdata){
                if(email.value==singleuser.email){
                    isalreadyExist=true
                    if(password.value==singleuser.password){
                        localStorage.setItem('login_user',email.value)
                        location.replace('index.html')

                    }
                    else{
                        msg.textContent='Invalid Credentials'
                        msg.style.color='red'
                        return
                    }
                                               
                }
            }
            if(isalreadyExist==false){
                msg.textContent="User doesn't exist"
                msg.style.color='red'

            }

                

        
    }

// localStorage.removeItem('usersdata')
