import http from "../http-common";
const sign_in = (user) => {
    return http.post(`/user/signIn`, user);
};
const SignUp_verification = ({id, token}) =>{
    return http.get('/user/signUp_verification');
}
const sign_up = (user) => {
    return http.post("/user/signUp", user);
};

const logout = () => {
    localStorage.removeItem("user_info");
};

const get_users = () =>{
    return http.get('/user');
}

const findById = (id) =>{
    return http.get(`/user/userDetails/${id}`);
}

const userProfile = (id) =>{
    return http.post('/user/userProfile', id);
}

const getUpdateUser = (user) =>{
    http.post(`/user/updateUser`, user)
}


const update_user = (data) =>{
    http.post('/user/updateUser', data)
}

const UserService = {
    sign_in,
    sign_up,
    SignUp_verification,
    logout,
    get_users,
    findById,
    update_user,
    userProfile,
    getUpdateUser
};
export default UserService;