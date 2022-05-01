import './App.css';
import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Home from './Components/home/home';
import AddUserForm from './Components/addUserForm/addUserForm';
import EditUserForm from './Components/editUserForm/editUserForm';
import { useTranslation } from "react-i18next";
import { SyntheticEvent } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e:any) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  }
    return (
    <div className="App">
      <select className="custom-select" style={{width: 200}} onChange={changeLanguageHandler}>
        <option value="en" >English</option>
        <option value="he" >Hebrew</option>
      </select>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="editUserForm/:userId" element={<EditUserForm />} ></Route>
          <Route path="addUserForm" element={<AddUserForm />}></Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    </div>
  );
}

export default App;
