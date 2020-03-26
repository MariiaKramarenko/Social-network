import React from 'react';
import styles from './FormControls.module.css'
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

export const FormControl = ({input, meta, child, ...props}) => {
      const hasError = meta.touched && meta.error; /*это приходит из пропсов валилатора,см документацию*/
    /*если есть ошибка в ответа пропсов,то покажем красный спан надпись Error*/
	return (
		<div className= {styles.formControl + " " + (hasError ? styles.error : " ")}>
			<div>
			{props.children}
			</div>
			{ hasError && <span>{meta.error}</span>}
		</div>
		)
}

/*убираем дублирующийся код, делаем главную компоненту FormControl и ей передаем чайлдов 
в Textarea засовываем главную FormControl и передаем ей как чайлда textarea
*/

export const Textarea = (props) => {/*Textarea является оберткой над FormControl*/
	const {input, meta, child, ...restProps} = props;
	return <FormControl {...props}><textarea {...input} {...restProps}/> </FormControl>
}

export const Input = (props)=> {
	const {input, meta, child, ...restProps} = props;
	return <FormControl {...props}><input {...input} {...restProps}/> </FormControl>
}

export  const createField = (placeholder, name, validators, component, props = {}, text = "") => {
   return (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)
}