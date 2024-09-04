import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

export abstract class AbstractCommonService {

    public static baseUrl = environment.baseUrl;

    private authtoken = localStorage.getItem('token');
    // Dynamically get token for each request
    protected getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    }

    protected fullUrl:string;
    constructor(protected http: HttpClient){
        this.fullUrl = AbstractCommonService.baseUrl ;
    }
}