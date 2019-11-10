import React from 'react';
import s from './Post.module.css';

const Post =() =>{
	return (            
              <div className={s.item}>
              <img src="https://klike.net/uploads/posts/2019-03/1551511862_28.jpg" />
                Hello its my first post!
                <div>
                <span>Likes</span>
                </div>
              </div>        
    
		)
}
 export default Post;