import { connect } from "react-redux";
import { login } from "../redux/auth";
import { Login } from "../components/Login";

const mapActionsToProps = { login };
export default connect(null, mapActionsToProps)(Login);
