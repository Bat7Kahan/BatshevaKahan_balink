import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrFormAdd } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { VscEdit } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import User from "../../Models/UserModel";
import "./home.css";



function Home(): JSX.Element {

    let navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [users, setUsers] = useState([new User()]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getListOfUsers();
    })

    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/deleteUser/${userId}`);
            getListOfUsers();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    const getListOfUsers = async () => {
        try {
            const usersFromServer = await axios.get<User[]>("http://localhost:4000/api/users");
                setUsers(usersFromServer.data);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }
    

    return (
        <div className="home">
			{users &&
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>{t('Id')}</th>
                                <th>{t('First Name')}</th>
                                <th>{t('Last Name')}</th>
                                <th>{t('Age')}</th>
                                <th>{t('Phone')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user  => <tr onClick={() => {navigate(`/editUserForm/${user.id}`)}}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                                <td>{user.phone}</td>
                                <td><button className="button" onClick={() => { deleteUser(user.id) }}><TiDelete /></button></td>
                                {/* <td><nav><Link to={`/editUserForm/${user.id}`} ><VscEdit /></Link></nav></td> */}
                            </tr>)}
                        </tbody>
                    </table>
                }
                {users.length == 0 && <div>{t('No users found')}</div>}
                <div>
                    <nav>
                        <Link to="/addUserForm"><GrFormAdd /></Link>
                    </nav>
                </div>
                {errorMessage && <div>errorMessage</div>}
        </div>
    );
}

export default Home;
