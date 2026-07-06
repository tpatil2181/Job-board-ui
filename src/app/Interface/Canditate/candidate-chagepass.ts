export interface CandidateChangePassword{

    // Id:number;  no need to send id because we are sending token in header and we can get id from token in backend
    currentPass:string;
    newPass:string;
}