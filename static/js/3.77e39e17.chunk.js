(this["webpackJsonpmy-app-react"]=this["webpackJsonpmy-app-react"]||[]).push([[3],{295:function(t,e,s){t.exports={profileimg:"Profile_profileimg__1DP71",descriptionBlock:"Profile_descriptionBlock__TBKSn",postsBlock:"Profile_postsBlock__XYymL"}},296:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__2di3J",item:"MyPosts_item__3Bzdm",myposts:"MyPosts_myposts__2NO3M",addpost:"MyPosts_addpost__2E61B",mypost:"MyPosts_mypost__MsxjG"}},297:function(t,e,s){t.exports={item:"Post_item__2P32R"}},298:function(t,e,s){t.exports={profileimg:"ProfileInfo_profileimg__7SOky",descriptionBlock:"ProfileInfo_descriptionBlock__3fFzv",postsBlock:"ProfileInfo_postsBlock__3Z_gu"}},299:function(t,e,s){"use strict";s.r(e);var a=s(28),o=s(29),n=s(31),r=s(30),i=s(32),u=s(0),l=s.n(u),c=(s(295),s(95)),p=s(296),m=s.n(p),f=s(297),d=s.n(f),_=function(t){return l.a.createElement("div",{className:d.a.item},l.a.createElement("img",{src:"https://klike.net/uploads/posts/2019-03/1551511862_28.jpg"}),t.message,l.a.createElement("div",null,l.a.createElement("span",null,"Likes  ",t.likesCount)))},E=s(128),h=s(129),b=s(73),P=s(63),g=Object(b.a)(10),k=Object(h.a)({form:"ProfileAddNewPostForm"})((function(t){return l.a.createElement("form",{onSubmit:t.handleSubmit},l.a.createElement("div",null,l.a.createElement(E.a,{validate:[b.b,g],placeholder:"Send your post",name:"newPostText",component:P.b})),l.a.createElement("div",null,l.a.createElement("button",{className:m.a.addpost},"Add post")))})),v=l.a.memo((function(t){console.log("RENDER YO");var e=t.posts.map((function(t){return l.a.createElement(_,{message:t.message,likesCount:t.likesCount})}));return l.a.createElement("div",{className:m.a.postsBlock},l.a.createElement("div",{className:m.a.myposts},"My posts"),l.a.createElement(k,{onSubmit:function(e){t.addPost(e.newPostText)}}),e)})),y=s(12),O=Object(y.b)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(e){t(Object(c.a)(e))}}}))(v),j=s(298),S=s.n(j),B=s(39),x=s(130),M=function(t){var e=Object(u.useState)(!1),s=Object(x.a)(e,2),a=s[0],o=s[1],n=Object(u.useState)(t.status),r=Object(x.a)(n,2),i=r[0],c=r[1];Object(u.useEffect)((function(){c(t.status)}),[t.status]);return l.a.createElement("div",null,!a&&l.a.createElement("div",null,l.a.createElement("span",{onDoubleClick:function(){o(!0)}}," ",t.status||"no status")),a&&l.a.createElement("div",null,l.a.createElement("input",{onChange:function(t){c(t.currentTarget.value)},onBlur:function(){o(!1),t.updateStatus(i)},autoFocus:!0,value:i})))},N=function(t){return t.profile?l.a.createElement("div",{className:S.a.postsBlock},l.a.createElement("div",{className:S.a.descriptionBlock},l.a.createElement("img",{src:t.profile.photos.large}),l.a.createElement(M,{status:t.status,updateStatus:t.updateStatus}))):l.a.createElement(B.a,null)},w=function(t){return l.a.createElement("div",null,l.a.createElement(N,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),l.a.createElement(O,null))},I=(s(72),s(25)),C=(s(94),s(7)),T=function(t){function e(){return Object(a.a)(this,e),Object(n.a)(this,Object(r.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userID;t||(t=this.props.autorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"render",value:function(){return 0==this.props.isAuth?l.a.createElement(I.a,{to:"/login"}):l.a.createElement(w,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),e}(l.a.Component);e.default=Object(C.d)(Object(y.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,autorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:c.d,getStatus:c.c,updateStatus:c.e}),I.f)(T)}}]);
//# sourceMappingURL=3.77e39e17.chunk.js.map