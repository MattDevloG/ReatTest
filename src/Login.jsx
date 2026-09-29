import { useState,} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () =>
{
    // get error state
    const [error_email, setError_email] = useState(false)
    const [error_password, setError_password] = useState(false)

    // user information
    const [userLogin, setUserLogin] = useState({
        email : null,
        password : null
    })

    const navigation = useNavigate()

    const OnSubmitForm = async (event) =>
    {
        // disable refresh page
        event.preventDefault();
        // call server
        try
        {
            const response = await axios.post('http://localhost:5700/login', userLogin)
            // consult response
            if(response.data.Status === "Success")
            {
                // go home
                navigation('/')
            }
            else
            {
                alert(response.data.Info)
            }
        }
        catch(err)
        {
            console.log("Request ERROR", err)
            alert("Server Communication failed ❌")
        }
    }

    return(
        <section className='login_sec'>
            <form action="" onSubmit={OnSubmitForm} className='login_form'>
                <div className="form_header">
                    <h1 className="form_title">Connectez vous</h1>
                    <h3>Diallo Family</h3>
                </div>
                <div className="login_input_content">
                    <div className="login_input_box">
                        <label htmlFor="email">Email :</label>
                        <input type="text" placeholder="Email" name="email" onChange={e => setUserLogin({...userLogin, email : e.target.value})}/>
                        {error_email && <span style={{color:'red'}}>email invalide</span>}
                    </div>
                    <div className="login_input_box">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" placeholder="mot de passe" name="password" onChange={e => setUserLogin({...userLogin, password : e.target.value})}/>
                        {error_password && <span style={{color:'red'}}>mot de passe invalide</span>}
                    </div>
                    <div className="login_button_box">
                        <button type='submit' className='login_submit_button'>Se Connecter</button>
                        <label>Ou</label>
                        <Link type='button' to={'/register'} className='l_login_button'>Cree un compte</Link>
                    </div>
                </div>
            </form>
        </section>
    )
}