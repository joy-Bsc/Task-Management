import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../APIRequest/APIRequest";

export function UpdateToDo(id, status) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Change Status",
            input: 'select',
            inputOptions: { New: 'New', Completed: 'Completed', Progress: 'Progress', Canceled: 'Canceled' },
            inputValue: status,
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateStatusRequest(id, result.value)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } else {
                reject("Update status dialog dismissed");
            }
        });
    });
}
