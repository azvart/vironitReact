import  {BehaviorSubject} from 'rxjs';


const storage:any = localStorage;
const parse = JSON.parse(storage.getItem('currentUser'));
export const CurrentUserSubject:any = new BehaviorSubject(parse);

export const authService = {
    logout,
    currentUser:CurrentUserSubject.asObservable(),
    get currentUserValue(){
        return CurrentUserSubject.value;
    }
}






function logout(){
    localStorage.removeItem('currentUser');
    CurrentUserSubject.next(null);
}