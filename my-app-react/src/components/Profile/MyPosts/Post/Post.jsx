import React from 'react';
import s from './Post.module.css';

const Post =(props) =>{
	return (            
              <div className={s.item}>
              <img src="https://image.flaticon.com/icons/svg/2602/2602014.svg"/>
              {props.message}
              <div>
              <span>Likes  {props.likesCount}</span> 
              </div>             
              </div>        
    
		)
}
 export default Post;