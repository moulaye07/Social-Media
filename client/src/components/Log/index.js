import React, {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {

    const [signUpModal, setSignUpModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id==="register") {
            setSignUpModal(true);
        }else if(e.target.id==="login"){
            setSignUpModal(false);

        }
    }
    
    return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<div className="log-reg-area">
                {signUpModal ? (
                    <>
                    <SignUpForm />
                    <span id="login" onClick={handleModals} className="span-hover">j'ai déjà un compte</span>
                    </>

                ) : (
                    <>
                    <SignInForm />
                    <span id="register" onClick={handleModals} className="span-hover">Je n'ai pas de compte, m'inscrire</span>
                    </>
                )
                }
            </div> 
		</div>
    );
};

export default Log;