import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames";//npm install --save @types/classnames

//////TYPES////////////////////////////////
type PropsType={//типизация для пропсов
    totalItemsCount:number
    pageSize:number
    currentPage:number
    onPageChanged: (pageNumber:number)=> void
    portionSize?: number //? означает что этот тип необязателен, так как он у нас захаркоджен на значение 10
}




///END OF TYPES///////////////////////////


//типизируем компоненту,сначала пшем
// :React.FC сразу после названия компоненты,
// <Props> означает что она принимает пропсы типа Props кот мы описали выше как тип для пропсов
let Paginator: React.FC<PropsType>= ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);//переменная с количеством страниц пользователей

    let pages:Array<number> = [];//массив с пользователями
    for (let i = 1; i <= pagesCount; i++) {//вывод пользователей через цикл for (увеличиваем каждую последующую страницу и пушим ее)
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);//рассчет порции кот будет видна нам в виде пагинации
    let [portionNumber, setPortionNumber] = useState(1);//используем хук useState чтобы portionNumber - номер порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;//определяем значение левой кнопки порции страниц
    let rightPortionPageNumber = portionNumber * portionSize;//определяем значение правой кнопки порции страниц


return <nav aria-label="Page navigation example">
        <ul className={cn(styles.pagination)}>
        { portionNumber > 1 && //если номер порции больше 1 тогда показываем кнопку PREV -которая переключает на предыдущую порцию
        <button className="btn-sm btn-primary" onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

            {pages //выводим номера страничек с пользователями
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)//фильтруем левый и правы номера страниц
                .map((p) => {//если номер больше либо равен числу левого номера порции и меньше или равен правого числа номера порции
                return <li className={ cn({//тогда возвращаем span кот содержит стили и если фильтрация вернула true то 
                    [styles.selectedPage]: currentPage === p//текущая страница равна той что фильтруется
                }, styles.pageNumber) }
                             key={p}//применяем обязательно key
                             onClick={(e) => {//добавляем функцию кот по клику показывает пользователей текущей страницы
                                 onPageChanged(p);
                             }}>{p}</li>
            })}
                                { portionCount > portionNumber && //когда  тогда показываем кнопку NEXT-кот переключает на следующую порцию с пользователями
    <button className="btn-sm btn-primary" onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


   </ul>
    </nav>

}

export default Paginator; 