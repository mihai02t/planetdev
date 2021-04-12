import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR, { SWRResponse, cache } from 'swr';
import { toast } from 'react-toastify';

import User from '../types/User';
import axios, { TOKEN_KEY } from '../axios';
import { LOGIN_PATH } from '../../routes/Auth';

export async function getLoggedInUser(): Promise<User | null> {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return null;

    try {
        const res = await axios.get('/api/auth');

        if (res.status !== 200) {
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }

        return res.data.user as User;
    } catch {
        return null;
    }
}

export type UseUser = {
    user?: User | null;
    loggedIn: boolean;
    loading: boolean;
    mutate: SWRResponse<User | null, Error>['mutate'];
};
  
export function useUser(): UseUser {
    const { data: user, mutate } = useSWR(
        `user-${localStorage.getItem(TOKEN_KEY)}`,
        getLoggedInUser
    );

    return {
        user,
        loggedIn: !!user,
        loading: user === undefined,
        mutate,
    };
}

export function useRequiresAuthentication(): UseUser {
    const history = useHistory();
  
    const status = useUser();
  
    const { loading, user } = status;
  
    useEffect(() => {
      if (loading) return;

      if (!user) {
        toast('You need to be logged in to see this page.');
        return history.replace(LOGIN_PATH);
      }
    }, [user]);
  
    return status;
  }
  
  export function useLogOut() {
    const { mutate } = useRequiresAuthentication();
    const history = useHistory();
  
    return () => {
      localStorage.removeItem(TOKEN_KEY);
      mutate(null);
      cache.clear();
      history.push(LOGIN_PATH);
    };
  }