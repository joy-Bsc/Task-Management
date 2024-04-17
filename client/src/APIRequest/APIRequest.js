import axios from 'axios';
import { errorToast, successToast } from '../helper/FormHelper';
import Store from '../redux/store/Store';
import { HideLoader, ShowLoader } from '../redux/state/settings-slice';
import { getToken, setEmail, setOTP, setToken, setUserDetails } from '../helper/SessionHelper';
import { SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask } from '../redux/state/Task-Slice';
import { SetSummary } from '../redux/state/Summary-slice';
import { SetProfile } from '../redux/state/profile-slice';


const BaseURL = 'http://localhost:4000/api/v1';
const AxiosHeader = {headers:{"token":getToken()}}


export function RegistrationRequest(email, firstName, lastName, mobile, password,photo) {
    Store.dispatch(ShowLoader())
    const URL = BaseURL + "/registration";
    const PostBody = { email:email, firstName:firstName, lastName:lastName, mobile:mobile, password:password , photo:photo };
     
    return axios.post(URL, PostBody)
        .then((res) => {
            Store.dispatch(HideLoader())
            if (res.status === 200) {
                if (res.data.status === "fail") {
                    if (res.data.data.keyPattern.email === 1) {
                        errorToast("Email already exists");
                    } else {
                        errorToast('Something went wrong');
                    }
                    return false;
                } else {
                    successToast("Registration successful");
                    return true;
                }
            } else {
                errorToast("Something went wrong");
                return false;
            }
        })
        .catch((error) => {
            Store.dispatch(HideLoader())
            console.error("Registration error:", error);
            errorToast("Something went wrong");
            return false;
        });
}

export function LoginRequest(email,password){
    Store.dispatch(ShowLoader());
    let URL = BaseURL + "/login"
    let PostBody={"email":email,"password":password}
    return axios.post(URL,PostBody).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            successToast("login success")
            return true;
        }
        else{
            errorToast("invalid Email or password");
            return false;
        }
    }).catch((e)=>{
        errorToast("Something went Wrong")
        Store.dispatch(HideLoader());
        return false;
    })
}


export function NewTaskRequest(title, description) {
    Store.dispatch(ShowLoader());
    const URL = BaseURL + "/createTask";
    const PostBody = { "title": title, "description": description, "status": "New" };

    return axios.post(URL, PostBody, AxiosHeader)
        .then((res) => {
            Store.dispatch(HideLoader());
            if (res.status === 200) {
                successToast("New Task Created");
                return true;
            } else {
                errorToast("Something Went wrong");
                return false;
            }
        })
        .catch((error) => {
            console.error("API Error:", error);
            errorToast("Something went wrong");
            Store.dispatch(HideLoader());
            return false;
        });
}

export function TaskListByStatus(Status){
    Store.dispatch(ShowLoader())
    let URL = BaseURL + "/listTaskByStatus/" +Status;
    axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            if(Status==="New"){
                Store.dispatch(SetNewTask(res.data['data']))
            }
            else if(Status==="Completed"){
                Store.dispatch(SetCompletedTask(res.data['data']))
            }
            else if(Status ==="Canceled"){
                Store.dispatch(SetCanceledTask(res.data['data']))
            }
            else if(Status === "Progress"){
                Store.dispatch(SetProgressTask(res.data['data']))
            }

        }
        else{
            errorToast("Something Went Wrong")
        }
    }).catch((e)=>{
        errorToast("Something went wrong")
        Store.dispatch(HideLoader())
    });
}

export function SummaryRequest(){
    Store.dispatch(ShowLoader());
    let URL = BaseURL + "/taskStatusCount"
    axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            Store.dispatch(SetSummary(res.data['data']))
        }
        else{
            errorToast("Something Went Wrong")
        }
    }).catch((e)=>{
        errorToast("Something Went Wrong");
        Store.dispatch(HideLoader());
    })
}

export function DeleteRequest(id){
    Store.dispatch(ShowLoader());
    let URL = BaseURL + "/deleteTask/"+id;
    return axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader());
        if(res.status===200){
            successToast("Delete SuccessFul")
            return true;
        }
        else{
            errorToast("something went wrong")
            return false;
        }
    }).catch((e)=>{
        errorToast("something went wrong")
        console.log(e);
    })
}

export function UpdateStatusRequest(id,status){
    Store.dispatch(ShowLoader())
    let URL = BaseURL + "/updateTaskStatus/"+id+"/"+status;
    return axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            successToast("Status Updated")
            return true;
        }
        else{
            errorToast("Something Went Wrong");
            return false;
        }
    }).catch((e)=>{
        Store.dispatch(HideLoader)
        errorToast("something Went Wrong")
        console.log(e);
    })
}

export function GetProfileDetails(){
    Store.dispatch(ShowLoader());
    let URL= BaseURL+"/profileDetails";
    axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            Store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            errorToast("Something went wrong")
        }
    }).catch((e)=>{
        Store.dispatch(HideLoader());
        errorToast("something went wrong")
        console.log(e);
    })
}

export function ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo) {
    return new Promise((resolve, reject) => {
        Store.dispatch(ShowLoader());
        let URL = BaseURL + "/profileUpdate";
        let PostBody = { "email": email, "firstName": firstName, "lastName": lastName, mobile: mobile, password: password, photo: photo };

        axios.post(URL, PostBody, AxiosHeader)
            .then((res) => {
                Store.dispatch(HideLoader());
                if (res.status === 200) {
                    successToast("Profile update success");
                    setUserDetails({ "email": email, "firstName": firstName, "lastName": lastName, mobile: mobile, password: password, photo: photo });
                    resolve(true);
                } else {
                    errorToast("Something went wrong");
                    resolve(false);
                }
            })
            .catch((error) => {
                Store.dispatch(HideLoader());
                console.error("Profile update error:", error);
                errorToast("Something went wrong");
                reject(error);
            });
    });
}

export function RecoverVerifyEmailRequest(email){
    Store.dispatch(ShowLoader())
    let URL = BaseURL + "/RecoverVerifyEmail/"+email;
    return axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                errorToast("No User Found")
                return false;
            }
            else{
                setEmail(email)
                successToast("A six digit code sent to your email address")
                return true;
            }
            
        }
        else{
            errorToast("Something Went wrong")
            return false;
        }
    }).catch((e)=>{
        errorToast("Something went wrong")
        Store.dispatch(HideLoader())
        return false;
        
    })

}

export function RecoverVerifyOTPRequest(email,OTP){
    Store.dispatch(ShowLoader())
    let URL = BaseURL + "/RecoverVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL,AxiosHeader).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                errorToast("invalid otp");
                return false;
            }
            else{
                setOTP(OTP)
                successToast("Code verification success")
                return true;
            }
        }
        else{
            errorToast("Something Went wrong")
        }
    }).catch((e)=>{
        errorToast("Something went wrong")
        Store.dispatch(HideLoader())
    })

}

export function RecoverResetPassRequest(email,OTP,password){
    Store.dispatch(ShowLoader())
    let URL = BaseURL + "/RecoverResetPass";
    let PostBody = {email:email,OTP:OTP,password:password}
    return axios.post(URL,PostBody).then((res)=>{
        Store.dispatch(HideLoader())
        if(res.status===200){
            
            setOTP(OTP)
                successToast("New Password created")
                return true;
           
        }
        else{
            errorToast("Something Went wrong")
            return false;
        }
    }).catch((e)=>{
        errorToast(e.message)
        Store.dispatch(HideLoader())
        return false;
    })

}

