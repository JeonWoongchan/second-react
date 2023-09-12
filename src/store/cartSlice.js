import { createSlice } from "@reduxjs/toolkit"

let cart = createSlice({ // useState 역할
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action){
            let found = state.find(e => e.id == action.payload.id); //상품의 id에 맞는 count 수정하도록 코드 작성
            found.count += 1;
        },
        addCart(state, action){
            let index = state.findIndex(e => e.id == action.payload.product.id); //findIndex : 객체배열에서 찾아서 index 리턴
            console.log('index'+index)
            if(index == -1){ // 장바구니에 없으면 추가
                let arr = {id : action.payload.product.id, name : action.payload.product.title, count : Number(action.payload.orderCnt)}
                state.push(arr);
                state.sort((a, b) => a.id - b.id);
            }else{// 장바구니에 이미 있으면 개수 +1
                let found = state.find(e => e.id == action.payload.product.id);
                found.count += Number(action.payload.orderCnt);
            }
        },
        // state 변경함수 매개변수 여러개 쓰는법
        // 함수 사용하는 곳에 매개변수를 ()=>{함수명({매개변수1, 매개변수2})} 처럼 객체로 받음
        // 함수 실행될 때 매개변수 action에 한번에 객체로 받음
        // 매개변수 사용시 action.payload.매개변수1 이런식으로 사용
        deleteItem(state, action){
            let index = state.findIndex(e => e.id == action.payload.id);
            state.splice(index, 1);
        }
    }
})

export let {changeCount, addCart, deleteItem} = cart.actions

export default cart;