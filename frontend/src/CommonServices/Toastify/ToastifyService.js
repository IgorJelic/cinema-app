import { toast } from "react-toastify";

const ToastifyService = {
    notifySucc,
    notifyInfo,
    notifyErr
}

export function notifySucc(message){
    toast.success(message);
}

export function notifyInfo(message){
    toast.info(message);
}

export function notifyErr(message){
    toast.error(message);
}



export default ToastifyService;