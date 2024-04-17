import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state/settings-slice";
import taskReducer from "../state/Task-Slice";
import summaryReducer from "../state/Summary-slice";
import profileReducer from "../state/profile-slice";
export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summary:summaryReducer,
        profile:profileReducer
    }
})