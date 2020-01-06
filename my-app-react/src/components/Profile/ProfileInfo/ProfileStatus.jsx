import React from 'react';


class ProfileStatus extends React.Component {/*создаем класс*/
   
   state={/*локальный стейт для данной компоненты*/
   	 editMode:false
     }

   activateEditMode(){/*метод который вызывается по клику*//*метод setState-изменяет локальный стейт*/
     this.setState({/*передаем объект только с тем значением ,которые мы хотим изменить в state*/
     editMode:true /*меняем значение на ture*/
     });
     }
   deactivateEditMode(){/*обратный метод который вызывается по фокусу на инпут*/
     this.setState({/*меняем локальный стейт*//*помни,что передаем объект с только измененным параметром*/
     editMode:false
     });
     }
/*помним,что в классе теряется контекст вызова поэтому мы в обращении к методу класса должны ставить bind  и баиндить его к данному классу this*/
   render(){
         return(
   	       <div>
   	       {!this.state.editMode && /*если значение false &&-тогда выполняет логику с пом. аттрибута onDoubleClick вызываем метод класса*/
             <div>
     	        <span onDoubleClick={this.activateEditMode.bind(this)}> {this.props.status}</span>
     	     </div>
     	    }
     	    {this.state.editMode && /*если значение ture &&-тогда выполняем логику посредством аттрибута onBlur- при фокусе срабатывает метод класса*/
     	      <div>
     	        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} />
             </div>
            }
          </div>
   	)
}
}
export default ProfileStatus;