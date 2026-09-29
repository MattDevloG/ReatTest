import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Form.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Register = () =>
{
    // get error state
    const [error_email, setError_email] = useState(false)
    const [error_age, setError_age] = useState(false)
    const [error_firstname, setError_firstname] = useState(false)
    const [error_lastname, setError_lastname] = useState(false)
    const [error_password, setError_password] = useState(false)
    const [error_conf_password, setError_conf_password] = useState(false)
    // get inputs refs
    const firstname_ref = useRef()
    const last_name_ref = useRef()
    const email_ref = useRef()
    const age_ref = useRef()
    const password_ref = useRef()
    const conf_password_ref = useRef()

    // user information
    const [userRegister, setUserRegister] = useState({
        first_name : null,
        last_name : null,
        email : null,
        age : null,
        gender : 'H',
        profession : 'Chômeur',
        password : null,
    })

    const navigation = useNavigate()

    function CheckInputs()
    {
        // names
        if(firstname_ref.current.value.trim().length === 0)
        {
            // active error
            setError_firstname(true)
            return false;
        }
        else if (last_name_ref.current.value.trim().length === 0)
        {
            // active error
            setError_lastname(true)
            return false;
        }
        // email
        const email_input = email_ref.current.value.trim();
        const is_email_pass = email_input.includes('@');
        if(!is_email_pass || email_input.length === 0){setError_email(true); return false;}
        // age
        const age_input = age_ref.current.value;
        if(age_input.toString().length === 0 || Number(age_input) > 120 || Number(age_input) < 0){setError_age(true); return false;}
        // password
        if(password_ref.current.value.trim().length === 0)
        {
            // active error
            setError_password(true)
            return false;
        }
        else if (conf_password_ref.current.value.trim().length === 0 || conf_password_ref.current.value != password_ref.current.value)
        {
            // active error
            setError_conf_password(true)
            return false;
        }
        // otherwise everthing's good
        return true;
    }

    const OnSubmitForm = async (event) =>
    {
        // disable refresh page
        event.preventDefault();
        // check inputs
        if(!CheckInputs()) return;
        console.log(userRegister)
        // open connection
        try{
            // send request
            const response = await axios.post('http://localhost:5700/register', userRegister)
            if(response.data.Status === "Success")
            {
                alert("Register success ✅");
                 // redirection
                navigation('/login')
            }
            else{alert(`Register failed ❌ / issue : ${response.data.Status}`);}
        }
        catch(err){
            console.log("Request ERROR", err)
            alert("Server Communication failed ❌")
        }
    }

    return(
        <section className='login_sec'>
            <form action="" onSubmit={OnSubmitForm}>
                <div className="form_header">
                    <h1 className="form_title">Nouvelle Inscription</h1>
                    <h3>Diallo Family</h3>
                </div>
                <div className="input_content">
                    <div className="input_box">
                        <label htmlFor="first_name">Prenom :</label>
                        <input ref={firstname_ref} type="text" placeholder="first name" name="first_name"  onChange={e => setUserRegister({...userRegister, first_name : e.target.value})}/>
                        {error_firstname && <span style={{color:'red'}}>prenom invalide</span>}
                    </div>
                    <div className="input_box">
                        <label htmlFor="last_name">Nom :</label>
                        <input type="text" ref={last_name_ref} placeholder="last name" name="last_name" onChange={e => setUserRegister({...userRegister, last_name : e.target.value})}/>
                        {error_lastname && <span style={{color:'red'}}>nom invalide</span>}
                    </div>
                    <div className="input_box">
                        <label htmlFor="email">Email :</label>
                        <input type="text" ref={email_ref} placeholder="Email" name="email" onChange={e => setUserRegister({...userRegister, email : e.target.value})}/>
                        {error_email && <span style={{color:'red'}}>email invalide</span>}
                    </div>
                    <div className="input_box">
                        <label htmlFor="age">Age :</label>
                        <input type="number" ref={age_ref} step={1} placeholder="Age" name="age" onChange={e => setUserRegister({...userRegister, age : e.target.value})}/>
                        {error_age && <span style={{color:'red'}}>age invalide</span>}
                    </div>
                    <div className="input_box">
                        <label htmlFor="genre">Genre : </label>
                        <select id="genre" name="genre" defaultValue="Homme" onChange={e => setUserRegister({...userRegister, gender : e.target.value})}>
                        <option value="H">Homme</option>
                        <option value="F">Femme</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <label htmlFor="profession">Profession : </label>
                        <select id="profession" name="profession" defaultValue='Chômeur' onChange={e => setUserRegister({...userRegister, profession : e.target.value})}>
                        <option value="Elève">Elève</option>
                        <option value="Etudiant">Etudiant</option>
                        <option value="Salarié">Salarié</option>
                        <option value="Chômeur">Chômeur</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" ref={password_ref} placeholder="mot de passe" name="password" onChange={e => setUserRegister({...userRegister, password : e.target.value})}/>
                        {error_password && <span style={{color:'red'}}>mot de passe invalide</span>}
                    </div>
                    <div className="input_box">
                        <label htmlFor="c_password">Confirm password :</label>
                        <input type="password" ref={conf_password_ref} placeholder="valider votre mot de passe"/>
                        {error_conf_password && <span style={{color:'red'}}> verifier le mot de passe </span>}
                    </div>
                    <div className="button_box">
                        <button type='submit' className='submit_button'>Rejoindre</button>
                        <label>Ou</label>
                        <Link type='button' to={'/login'} className='l_login_button'>Se connecter</Link>
                    </div>
                </div>
            </form>
        </section>
    )
}