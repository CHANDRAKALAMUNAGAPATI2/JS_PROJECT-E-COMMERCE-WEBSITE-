let username=document.getElementById('username') 
let email=document.getElementById('email')
let password=document.getElementById('password')
let signup=document.getElementById('signup')
let msg=document.getElementById('msg')

        signup.onclick=(e)=>{
            e.preventDefault()
            if(username.value.trim()==='' || password.value.trim()==='' || email.value.trim()===''){
                console.log('hii');
    
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
            let isalreadyExist=true

            if(usersdata.length!=0){
                console.log(usersdata);
                for(let singleuser of usersdata){
                    if(email.value==singleuser.email){
                        isalreadyExist=false
                        msg.textContent='User already Exist'
                        msg.style.color='red'                        
                    }
                }

                if(isalreadyExist){
                    let singleuserinfo={email:email.value,password:password.value}
                    usersdata.push(singleuserinfo)
                    localStorage.setItem('usersdata',JSON.stringify(usersdata))   

                }
                           
            }
            else{
                let singleuserinfo={email:email.value,password:password.value}
                usersdata.push(singleuserinfo)
                localStorage.setItem('usersdata',JSON.stringify(usersdata))                
            }

        }

// localStorage.removeItem('usersdata')
