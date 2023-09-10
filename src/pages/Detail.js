import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

//상품상세 페이지
function Detail(props){
    // url 파라미터 가져옴
    let {id} = useParams();
    let proId = props.data.find(e => e.id == id);
    
    let [count, setCount] = useState(2);
    let [알림, set알림] = useState(true);
    let [orderCnt, setOrderCnt] = useState('');

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
            console.log(1)
        }
    }, []) // useEffect 실행조건 []안에 넣을 수 있음 -> 마운트시 실행 후에 [] 안에꺼 변할 때만 위에 코드 실행
            // []안이 빈칸이면 마운트 시에만 실행
    //정리
    // useEffect(()=>{}) : 재랜더링시 마다 코드 실행
    // useEffect(()=>{}, []) : 마운트시 1회 코드 실행
    // useEffect(()=>{} return()=>{}, []) : 언마운트시 1회 코드 실행

    useEffect(()=>{
        if(isNaN(orderCnt) == true){ // 문자 있는지 확인 isNaN()
            alert('숫자만 입력 가능');
            setOrderCnt('');
        }
        return(()=>{
        })
    }, [orderCnt])

    return(
        <div className="container">
            {
                알림 == true 
                ?   <div id='saleCount' className="alert alert-warning">
                        {count}초 이내 구매시 할인
                    </div>
                : null
            }
            <div className="row">
            <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+ (proId.id + 1) +".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
                {/* 자주 바뀌는 state에 있는 정보로 가져오면 다른 상품 정보 가져오는 문제 생김
                props.shoes[id] 대신 상품 데이터 고유 id 이용 */}
                <h4 className="pt-5">{proId.title}</h4>
                <p>{proId.content}</p>
                <p>{proId.price}</p>
                <input id="orderInput" onChange={(e)=>{setOrderCnt(e.target.value);}} value={orderCnt}/>
                <button className="btn btn-danger" >주문하기</button> 
            </div>
            </div>
        </div> 
    )
}

export default Detail;