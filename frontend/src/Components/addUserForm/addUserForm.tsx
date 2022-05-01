import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import User from "../../Models/UserModel";
import "./addUserForm.css";

function AddUserForm(): JSX.Element {

    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(-1);
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({firstName :'',lastName : '',age : '',phone : ''});

    const handleFirstNameChange = (e: SyntheticEvent) => {
        const firstName = (e.target as HTMLInputElement).value;
        setFirstName(firstName );
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

    const addUser = async () => {
        if (validateForm()) {
            const newUser = new User();
            try {
                newUser.id = 0;
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.age = age;
                newUser.phone = phone;
                console.log(newUser);
                await axios.post("http://localhost:4000/api/newUser", newUser);
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
            age:"",
            phone : ""
        };

        let formIsValid = true;

        if(!firstName){
            formIsValid = false;
            formErrors["firstName"] = t('First Name is required');
        }

        if(!lastName){
            formIsValid = false;
            formErrors["lastName"] = t('Last Name is required');
        }

        if(age == -1){
            formIsValid = false;
            formErrors["age"] = t('Age is required');
        }
        else{
            if(age > 120 || age < 0){
                formIsValid = false;
               formErrors["age"] = t('Invalid age');
            }
        }

        if(!phone){
            formIsValid = false;
            formErrors["phone"] = t('Phone is required');
        }
        else{
            if(phone.length > 10 ){
                formIsValid = false;
                formErrors["phone"] = t('Invalid phone');
            }
        }

         setErrors(formErrors);
        return formIsValid;
    }


    return (
        <div className="addUserForm">
			<div className="form__title" >{t('Add User')}</div>
                <div className="form">
                    <div className="form__item">
                        <input type="text" required id="f_name" placeholder={t('First Name')} onChange={handleFirstNameChange} className="form__input" />
                        <div>{errors.firstName}</div>
                    </div>
                    <div className="form__item">
                        <input type="text" required id="l_name" placeholder={t('Last Name')} onChange={handleLastNameChange} className="form__input" />
                        <div className="">{errors.lastName}</div>
                    </div>
                    <div className="form__item">
                        <input type="number" required id="age" placeholder={t('Age')} onChange={handleAgeChange} className="form__input" />
                        <div className="">{errors.age}</div>
                    </div>
                    <div className="form__item">
                        <input type="text" required id="phone" placeholder={t('Phone')} onChange={handlePhoneChange} className="form__input" />
                        <div className="">{errors.phone}</div>
                    </div>
                    <div className="form__item">
                        <button onClick={addUser} className="form__btn">{t('Add')}</button>
                    </div>
                </div>
        </div>
    );
}

export default AddUserForm;
