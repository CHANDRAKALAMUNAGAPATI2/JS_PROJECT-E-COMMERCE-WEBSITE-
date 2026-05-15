let currentuser=localStorage.getItem('login_user')

//navigate to login page if there is no user logged in
if(currentuser==null){
            location.replace('login.html')
}
