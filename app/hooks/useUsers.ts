import axios, { AxiosResponse }  from 'axios';
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    const fetchUsers = async (): Promise<AxiosResponse>  => {
        return await axios.get("api/users");
    };
    
   
    return { 
        fetchUsers,
    }
    };



