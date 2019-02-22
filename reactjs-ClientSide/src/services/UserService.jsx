class UserService{

    getUsers(token){
        let promise = fetch("http://localhost:4040/api/users",{
                                method:"GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                },
                            });
        return promise;
    }

    postUsers(userinfo,token){
        let promise = fetch("http://localhost:4040/api/users",{
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization":"bearer "+token
            },
            body: JSON.stringify(userinfo)
        })
        return promise;
    }
}

export default UserService;