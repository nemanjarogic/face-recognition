import { createBrowserHistory } from "history";

//Enable redirecting users outside from React components
//For example from redux actions after successful login or sign up
export const history = createBrowserHistory();
