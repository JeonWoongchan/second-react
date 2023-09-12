import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge} from './../store/userSlice.js';
import { changeCount, addCart, deleteItem} from './../store/cartSlice.js';


//여기에 장바구니 state 하면 상위 컴포넌트에서 못씀 그런데 이렇게 다 하면 props 전송 귀찮음 -> redux 사용 
function Cart(){

    //Redux store 가져옴
    let stateUser = useSelector((state)=>{ return state.user}); 
    let stateCart = useSelector((state)=>{ return state.cart}); 
    //(state)=>{ return state.user } 처럼 원하는 것만 가져올 수 있음
    // let state = useSelector((state)=>{ return state}); => 원하는 것만 지정하지 않고 다 가져오면 재랜더링 많이해서 성능 안좋음

    let dispatch = useDispatch() //store.js 로 요청 보내주는 함수

    return(
        <div>
            <h6>{stateUser.name}({stateUser.age})의 장바구니</h6>
            <button onClick={()=>{dispatch(changeName())}}>이름변경</button>
            <button onClick={()=>{dispatch(changeAge(10))}}>나이변경</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {stateCart.map((a,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td>
                                    <button onClick={()=>{dispatch(changeCount(a))}}>+</button>
                                    <button onClick={()=>{dispatch(deleteItem(a))}}>삭제</button>   
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;