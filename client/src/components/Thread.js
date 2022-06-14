import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { ContextSearch } from '../StoreForSearch';
import Card from './Post/Card';
import CreatePostForm from './Post/CreatePostForm';
import { isEmpty } from './Utils';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const [postsByQuery, setPostsByQuery] = useState([]);
    const [queryState, setQueryState] = useContext(ContextSearch);


    useEffect(() => {
		if(queryState){
            if (!isEmpty(posts[0])) {
                const result = posts.filter(e=>e.description.includes(queryState));
			    setPostsByQuery(result)
			    setQueryState(null)
            }
		}
	}, [queryState, setQueryState, posts]);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);


    return (
        <div className="col-lg-6">
            <CreatePostForm />
            {isEmpty(postsByQuery[0]) && !postsByQuery[0] && !isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Card post={post} key={post._id}/>;
                }) 
            }
            {!isEmpty(postsByQuery[0]) && postsByQuery[0] &&
                postsByQuery.map((post) => {
                    return <Card post={post} key={post._id}/>;
                }) 
            }
            
        </div>
    );
};

export default Thread;