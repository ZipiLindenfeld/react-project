import { useDispatch } from "react-redux";
import * as actionType from "../store/actions"
import { useNavigate } from "react-router-dom";


export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch({ type: actionType.LOG_OUT });
    navigate("/HomePage")
}