import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () =>
{
    const [familyMember, setFamilyMember] = useState(0)
    const [member, setMember] = useState({})

    const navigation = useNavigate()

    useEffect(() =>{
        
        // check login
        async function CheckConnexion() {
            // call server
            try
            {
                const response = await axios.get('http://localhost:5700/')
                // consult response
                if(response.data.Status != "Success")
                {
                    alert("Vous n'etes pas connecter")
                    // connection unfound
                    navigation('/login')
                    return;
                }
                alert("Autentification Reussi ✅")
                return;
            }
            catch(err)
            {
                console.log("Request ERROR", err)
                alert("Server Communication failed ❌")
            }
        }
        async function CheckMemberList()
        {
            // call server
            try
            {
                const response = await axios.get('http://localhost:5700/profil')
                // consult response
                if(response.data.Status === "Success")
                {
                    const users = response.data.Users;
                    const member_length = response.data.UserLength;
                    setMember(users)
                    // get user length
                    setFamilyMember(member_length);
                }
            }
            catch(err)
            {
                console.log("Request ERROR", err)
                alert("Server Communication failed ❌")
            }
        }
        // call function
        CheckConnexion();
        // get profil list
        CheckMemberList()
    }, [])

    async function HandleLogout() {
        // consult server
        try
        {
            const response = await axios.get('http://localhost:5700/logout')
            if(response.data.Status === "Success")
            {
                alert("Vous etes deconnecter !")
                navigation('/login')
                location.reload(true)
            }
            return;
        }
        catch(err)
        {
            console.log("Request ERROR", err)
            alert("Server Communication failed ❌")
        }
    }

    return(
        <section>
            <header>
                <h1 className="header_title">Welcome to Diallo Family</h1>
                <p>Manager</p>
                <button className="logout_button" onClick={HandleLogout}>Log Out 🚫</button>
            </header>

            <main className="family_member_box">
                <h2>Familly Members</h2>
                <div>
                    { familyMember === 0 ? (
                        <h3 className="family_info_text"> There are no member yet </h3> ) : (
                            <div className="family_member_content">
                                {Array.from({ length : familyMember }, (_, index) => (
                                    <div key={index} className="user_box">
                                        <p>Prenom : {member[index].first_name}</p>
                                        <p>Nom : {member[index].last_name}</p>
                                        <p>Age : {member[index].age} ans</p>
                                        <p>Genre : {member[index].gender}</p>
                                        <p>Profession : {member[index].profession}</p>
                                        <p>Email : {member[index].email}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </main>
        </section>
    )
}