import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPost, createPostNoFile, getPosts } from '../../actions/post.actions';



const CreatePostForm = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const handlePicture = (e) => {
        setFile(e.target.files[0]);

    }

    const handlePost = async (e) => {
        e.preventDefault()
        if(file){
            const data = new FormData();
            data.append("idOfPoster", userData._id);
            data.append("description", message)
            data.append("file", file);
            await dispatch(createPost(data));
            dispatch(getPosts());
        }else{
            const data = {
                "idOfPoster": userData._id,
                "description": message
            }
            await dispatch(createPostNoFile(data));
            dispatch(getPosts());
        }
        
    }

    const cancelPost = () => {
        setMessage('');
        setFile('');
    }

    return (
		<div className="central-meta">
		    <div className="new-postbox">
			    <figure>
                    <NavLink exact to='/profil'>
                        <img src={userData.picture} alt=""/>
                    </NavLink>
				</figure>
			    <div className="newpst-input">
				    <form method="">
					    <textarea 
                            rows="2"
                            placeholder="Veux tu dire quelque chose?"
                            name="message"
                            id="message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message} 
                        />
					    <div className="attachments">
							<ul>
                                {message || file ? (
                                    <button className='cancel' onClick={cancelPost}>annuler</button>
                                ) : null}
														
							    <li>
								    <i className="fa fa-image"></i>
								    <label className="fileContainer">
									    <input 
                                            type="file" 
                                            id='file-upload' 
                                            name='file' 
                                            accept='.jpg, jpeg, .png'
                                            onChange={(e) => handlePicture(e)}
                                        />
								    </label>
							    </li>

							    <li>
									<button onClick={handlePost}>Publier</button>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</div>
        </div>
    );
};

export default CreatePostForm;