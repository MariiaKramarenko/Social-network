export const required = value =>{ /*валидация на пустое поле*/
	if(value) return undefined;

	return "Field is required";
}
/*maxLengthCreator - криетор валидатора,поэтому вызывая в компоненте в () передадим значение максимальной длины строк*/
export const maxLengthCreator = (maxLength) => (value) =>{/*валидатор на максимальное количество введенных знаков*/
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;

}