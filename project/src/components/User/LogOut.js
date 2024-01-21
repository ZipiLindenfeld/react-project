import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../services/userService";

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(LogOut(navigate));
}