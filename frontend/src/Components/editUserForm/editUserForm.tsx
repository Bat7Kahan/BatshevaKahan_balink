import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import User from "../../Models/UserModel";
import "./editUserForm.css";

function EditUserForm(): JSX.Element {

    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const userId = useParams().userId;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(-1);
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ firstName: '', lastName: '', age: '', phone: '' });
    // const [error, setError] = useState('');


    useEffect(() => {
        async function getUser() {
            try {
                const user = await axios.get<User>(`http://localhost:4000/api/users/${userId}`);
                setFirstName(user.data.firstName);
                setLastName(user.data.lastName);
                setAge(user.data.age);
                setPhone(user.data.phone);
            } catch (error:any) {
                console.log(error.message);            
            }
        }
        getUser()
    },[]);


    const handleFirstNameChange = (e: SyntheticEvent) => {
        const firstName = (e.target as HTMLInputElement).value;
        setFirstName(firstName);
    }

    const handleLastNameChange = (e: SyntheticEvent) => {
        const lastName = (e.target as HTMLInputElement).value;
        setLastName(lastName);
    }

    const handleAgeChange = (e: SyntheticEvent) => {
        const age = +(e.target as HTMLInputElement).value;
        setAge(age);
    }

    const handlePhoneChange = (e: SyntheticEvent) => {
        const phone = (e.target as HTMLInputElement).value;
        setPhone(phone);
    }

    const editUser = async () => {
        setErrors({ firstName: '', lastName: '', age: '', phone: '' });
        if (validateForm()) {
            const user = new User();
            try {
                user.id = Number(userId);
                user.firstName = firstName;
                user.lastName = lastName;
                user.age = age;
                user.phone = phone;
                await axios.put("http://localhost:4000/api/editUser", user);
                navigate("/");
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }


    const validateForm = () => {
        let formErrors = {
            firstName: "",
            lastName: "",
            age: "",
            phone: ""
        };

        let formIsValid = true;

        if (!firstName) {
            formIsValid = false;
            formErrors["firstName"] = t('First Name is required');
        }

        if (!lastName) {
            formIsValid = false;
            formErrors["lastName"] = t('Last Name is required');
        }

        if (age == -1) {
            formIsValid = false;
            formErrors["age"] = t('Age is required');
        }
        else {
            if (age > 120 || age < 0) {
                formIsValid = false;
                formErrors["age"] = t('Invalid age');
            }
        }

        if (!phone) {
            formIsValid = false;
            formErrors["phone"] = t('Phone is required');
        }
        else {
            if (phone.length > 10) {
                formIsValid = false;
                formErrors["phone"] = t('Invalid phone');
                setPhone(phone);
            }
        }

        setErrors(formErrors);
        return formIsValid;
    }


    return (
        <div className="editUserForm">
            <div className="form__title">{t('Edit User')}</div>
            <div className="form">
                <div>{t('Id')} : {userId}</div>
                <div className="form__item">
                    <label>{t('First Name')}</label>
                    <input type="text" required id="f_name" value={firstName} onChange={handleFirstNameChange} className="form__input" />
                    <div>{errors.firstName}</div>
                </div>
                <div className="form__item">
                <label>{t('Last Name')}</label>
                    <input type="text" required id="l_name" value={lastName} onChange={handleLastNameChange} className="form__input" />
                    <div className="">{errors.lastName}</div>
                </div>
                <div className="form__item">
                <label>{t('Age')}</label>
                    <input type="number" required id="age" value={age} onChange={handleAgeChange} className="form__input" />
                    <div className="">{errors.age}</div>
                </div>
                <div className="form__item">
                <label>{t('Phone')}</label>
                    <input type="text" required id="phone" value={phone} onChange={handlePhoneChange} className="form__input" />
                    <div className="form__error">{errors.phone}</div>
                </div>
                <div className="form__item">
                    <button onClick={editUser} className="form__btn">{t('Edit')}</button>
                </div>
            </div>
            {/* {error && <div>{error}</div>} */}
        </div>
    );
}

export default EditUserForm;
