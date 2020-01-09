import React from 'react';
import styles from './FormControls.module.css'

export const Textarea = ({input, meta, ...props})=>{
	
    const hasError = meta.touched && meta.error; /*это приходит из пропсов валилатора,см документацию*/
    /*если есть ошибка в ответа пропсов,то покажем красный спан надпись Error*/
	return (
		<div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
			<div>
			<textarea {...input} {...props} />
			<div/>
			{ hasError && <span>{meta.error}</span>}
		</div>
		</div>
		)
}

export const Input = ({input, meta, ...props})=>{
	
    const hasError = meta.touched && meta.error; /*это приходит из пропсов валилатора,см документацию*/
    /*если есть ошибка в ответа пропсов,то покажем красный спан надпись Error*/
	return (
		<div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
			<div>
			<input {...input} {...props} />
			<div/>
			{ hasError && <span>{meta.error}</span>}
		</div>
		</div>
		)
}