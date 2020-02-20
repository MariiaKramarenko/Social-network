import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Test-status Mariia K" />);//имитируем создание компоненты
        const instance = component.getInstance();//обращаемся к объекту нашей компоненты(читать про instance)
        expect(instance.state.status).toBe("Test-status Mariia K");//проверяем что в статусе сидит текст кот приходит ему из пропсов
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="Test-status Mariia K" />);//имитируем создание компоненты
        const root = component.root;
        let span = root.findByType("span");//находим спан на странице
        expect(span).not.toBeNull();//указываем что он не null-то есть существует
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="Test-status Mariia K" />);//имитируем создание компоненты
        const root = component.root;
        expect(() => {//жидаем что вернет неправду9падение) то есть инпута не должно быть
            let input = root.findByType("input");//находим инпут
        }).toThrow();//значит что инпут отсутствует
    });

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="Test-status Mariia K" />);//имитируем создание компоненты
        const root = component.root;
        let span = root.findByType("span");//находим спан
        expect(span.children[0]).toBe("Test-status Mariia K");//проверяем что он содержит правильный текст 
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="Test-status Mariia K" />);
        const root = component.root;
        let span = root.findByType("span");//мы нашли span
        span.props.onDoubleClick();//вызвали функцию клика-кликнули по нему программой
        let input = root.findByType("input");//нашли инпут
        expect(input.props.value).toBe("Test-status Mariia K");//проверили что после клика в инпуте сидит текст из статуса
    });

     //как проверить вызов callBack?
    test("callback should be called", () => {
        const mockCallback = jest.fn();//подсовываем спец функцию шпион (см.Jest spyon)
        const component = create(<ProfileStatus status="Test-status Mariia K" updateStatus={mockCallback} />);
        const instance = component.getInstance();//instance-объект вызова компоненты
        instance.deactivateEditMode();//если мы переходим в deactivateEditMode то коллбек (подставленная для проверки mockCallback) срабатывает и вызывается
        expect(mockCallback.mock.calls.length).toBe(1);//которая умеет считывать сколько раз ее вызывали
    });


});