import axios, { TOKEN_KEY } from '../../../../utils/axios';

export async function loginService() {
    // const res = await axios.get('/api/auth/google/');
    window.open('http://localhost:5000/api/auth/google', 'mywindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
    window.addEventListener('message', async (message) => {
        const { token }: { token: string } = await message.data;
        return localStorage.setItem(TOKEN_KEY, token);
    });

    // if(res.status === 200) {
    //     const { token }: { token: string } = await res.data;
    //     return localStorage.setItem(TOKEN_KEY, token);
    // }

    // const {
    //     errors: [{ msg }],
    // } = await res.data;

    // throw new Error(msg);
}

