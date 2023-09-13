import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {Button, Navbar, Container, Nav, NavDropdown, Form, Row, Col} from 'react-bootstrap/';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge} from './../store/userSlice.js';
import { changeCount, addCart} from './../store/cartSlice.js';

//상품상세 페이지
function Detail(props){
    // url 파라미터 가져옴
    let {id} = useParams();
    let product = props.data.find(e => e.id == id);
    let [count, setCount] = useState(2); //알림창 카운트
    let [알림, set알림] = useState(true); //상단 알림창
    let [orderCnt, setOrderCnt] = useState(1); //주문수량
    let [탭, 탭변경] = useState(0); //탭
    let [pageFade, setPageFade] = useState('');// fade 애니메이션 관리

    let dispatch = useDispatch();

    //lifecycle 이용
    useEffect(()=>{ // -> 마운트, 업데이트 시 실행, 시간이 걸리는 어려운 작업 코드를 useEffect() 안에 작성 
        let a = setTimeout(()=>{
            // document.getElementById('saleCount').className = 'none'; 생JS방식
            set알림(false);
        }, 2000)

        setInterval(()=>{
            // document.getElementById('saleCount').innerHTML = count + '초 이내 구매시 할인';
            setCount(count-1);
        },1000)
        console.log(2)

        //return 사용 시 이 부분은 useEffect 실행 전 실행됨 -> clean up function, 마운트 시에는 실행되지 않음
        //리액트 특성상 재랜더링 많음 -> 아래 실행조건 지정안하면 의도치않게 위에꺼 계속 생성될수도 있음 -> 그거 방지
        return()=> {
            //기존 타이머는 제거해주세요~ 같은 주로 기존 코드 치우는 코드 작성
            clearTimeout(a); // 타이머 제거
            
        }
    }, []) // useEffect 실행조건 []안에 넣을 수 있음 -> 마운트시 실행 후에 [] 안에꺼 변할 때만 위에 코드 실행
            // []안이 빈칸이면 마운트 시에만 실행
    //정리
    // useEffect(()=>{}) : 재랜더링시 마다 코드 실행 -> async 문제 대처가능
    // useEffect(()=>{}, []) : 마운트시 1회 코드 실행
    // useEffect(()=>{} return()=>{}, []) : 언마운트시 1회 코드 실행

    useEffect(()=>{
        if(isNaN(orderCnt) == true){ // 문자 있는지 확인 isNaN()
            alert('숫자만 입력 가능');
            setOrderCnt(1);
        }
        if(orderCnt < 1){
            setOrderCnt(1);
        }
        return(()=>{
        })
    }, [orderCnt])


    useEffect(()=>{ 
        setTimeout(()=>{setPageFade('end');}, 10)
        return(()=>{
            setPageFade('');
        })
    }, [])

    useEffect(()=>{// 최근본상품 localStorage에 등록
        let obj = {id : product.id, name : product.title};
        let watchList = JSON.parse(localStorage.getItem('watched'));
        if(watchList.findIndex(e=>e.id == product.id) == -1){ // localStorage에 상품 id가 없으면
            watchList.push(obj);
            localStorage.setItem('watched', JSON.stringify(watchList));
        }
        //if문 대신 Set 자료형 사용가능하긴 한데 객체배열에서는 안되는듯?
        // watchList.push(obj);
        // watchList = new Set(watchList); // 객체임
        // watchList = [...watchList];// 다시 배열로 바꿈
        // localStorage.setItem('watched', JSON.stringify(watchList));
    },[])  

    return(
        <div className='container'>
            {
                알림 == true 
                ?   <div id='saleCount' className="alert alert-warning">
                        {count}초 이내 구매시 할인
                    </div>
                : null
            }
            <div className={"row start " + pageFade}>
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (product.id + 1) +".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    {/* 자주 바뀌는 state에 있는 정보로 가져오면 다른 상품 정보 가져오는 문제 생김
                    props.shoes[id] 대신 상품 데이터 고유 id 이용 */}
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}</p>
                    <input id="orderInput" onChange={(e)=>{setOrderCnt(e.target.value);}} value={orderCnt}/>
                    <button onClick={()=>setOrderCnt(orderCnt+1)}>+</button>
                    <button onClick={()=>setOrderCnt(orderCnt-1)}>-</button>
                    <button className="btn btn-danger" onClick={()=>{dispatch(addCart({product, orderCnt}))}}>주문하기</button> 
                </div>
            </div>

            {/* defaultActiveKey: 기본으로 눌려있을 버튼 */}
            <Nav variant="tabs"  defaultActiveKey="link0"> 
                {[0, 1, 2].map((a, i)=>{
                    return(
                        <Nav.Item key={i}>
                            <Nav.Link eventKey={'link'+i} onClick={()=>{탭변경(i)}}>{`버튼${i}`}</Nav.Link>
                        </Nav.Item>
                        )
                    })
                }
            </Nav>
            <TabContent 탭={탭} shoes={props.shoes}/>
        </div> 
    )
}

function TabContent({탭, shoes}){ // 탭 컴포넌트
    //탭에서 App.js의 shoes 쓰려면 props로 두번 넘겨받아야됨 한번에 손자 컴포넌트로 전송불가
    // 대안: Context API, Redux등 외부 라이브러리
    let [fade, setFade] = useState('');
    useEffect(()=>{ 
        // end 떼었다가 붙여야지 애니메이션 작동
        // setFade(''); //근데 이렇게 쓰면 안됨 -> 근처에있는 state는 모아서 한번에 실행됨 그래서 setTimeout 으로 시간차 두고 실행하게함
        setTimeout(()=>{setFade('end');}, 10)
        return(()=>{
            setFade('');
        })
    }, [탭])

    // if (탭 == 0){
    //     return <div>내용1</div>
    // }else if (탭 == 1){
    //     return <div>내용2</div>
    // }
    // else if (탭 == 2){
    //     return <div>내용3</div>
    // }
    return (
        <div className={'start ' + fade}>
        {
            [<div>내용1</div>, <div>내용2</div>, <div>내용3</div>][탭]
        }
        </div>
    );
}


export default Detail;