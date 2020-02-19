//вспомогательна функция кот помогает иммутабельно изменить объект
export const updateObjectArray = (items, itemId, objPropName, newObjProps) =>{

return items.map(u => {
		if (u["objPropName"] === itemId){//если найдется совпадение по objPropName из объекта u 
		   	 	return {...u, ...newObjProps}//тогда создастся копия объекта измененного и заменятся старые свойства прокидованием(деструктуризацией)
		}
		return u;
	})
}