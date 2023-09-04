import axios from 'axios';

export class HttpService {

    static get(url: string, params: any): Promise<any> {
        return axios.get(url, { params });
    }

    static post(url: string, data: any): Promise<any> {
        return axios.post(url, data);
    }

}
