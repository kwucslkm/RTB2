import {useEffect, useState} from "react";
import axios from "axios";
import UserList from './page/UserList.tsx';

function App() {
    /*const [hello, setHello] = useState('');*/

    /*useEffect(() => {
        axios.get('/api/users')
            .then((res) => {
                setHello(res.data);
            })
    }, []);*/
    return (
        <div className="App">
            # 메인 페이지 (App.tsx)
			<UserList></UserList>
        </div>
    );
}

export default App;
