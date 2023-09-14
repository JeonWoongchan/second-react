/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import data from './data.js';
// import Detail from './pages/Detail.js';
// import Cart from './pages/Cart.js';
const Detail = lazy(()=>(import('./pages/Detail.js')))
const Cart = lazy(()=>(import('./pages/Cart.js')))
//lazy
//당장 로드할 필요없는 페이지 나중에 필요할때 로딩하게해줌
//사이트 발행할 때 별도의 js파일로 분리됨
//단점은 저 페이지들 로딩할때 지연시간 생김(하얀화면 나옴) -> 그 시간동안 안내문이나 로딩바 보여주기 -> Suspense
//lazy 로딩할 페이지 라우트 를 Suspense로 감싸면 됨
//대부분은 라우트 안에 있는 모든 컴포넌트를 lazy 로드하게 설정함 -> Routes 를 Suspense로 감싸도 됨
import About from './pages/About.js';
import Event from './pages/Event.js';
import axios from 'axios'; // axios : ajax 요청 쉽게 해주는 라이브러리

import {lazy, useEffect, useState, Suspense} from 'react';
import {Button, Navbar, Container, Nav, NavDropdown, Form, Row, Col} from 'react-bootstrap/';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function App() {
  //localStorage : obj자료 넣기
  //Redux state를 locolStorage에 자동으로 저장해주는 라이브러리도 있음
  let obj = {name: 'kim'};
  localStorage.setItem('data', JSON.stringify(obj)); //이름 data인 로컬스토리지 저장
  let 꺼낸거 = localStorage.getItem('data');
  // console.log(JSON.parse(꺼낸거).name) // obj 출력

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 navigate(1 또는 -1) 한페이지 앞으로, 뒤로
  let [버튼글, 버튼글변경] = useState('더보기'); // 더보기 버튼텍스트
  let [클릭횟수, 클릭횟수변경] = useState(0); // 더보기 버튼 누른 횟수

  let result = useQuery({queryKey:['작명'], queryFn:()=> //react-query 제공함수
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      return a.data 
    })
  })
  // react-query : 실시간으로 데이터를 보여줘야되는 사이트에서 유용
  // 장점1. ajax 성공, 실패, 로딩중 정보 확인가능(result.data result.isLoading, result.error 등으로)
  // 장점2. 틈만나면 자동으로 refetch 해줌(refetch 간격 조절가능)
  // 장점3. 실패시 retry 알아서해줌
  // 장점4. state 공유 안해도됨
  // 장점5. ajax 결과 캐싱 가능

  useEffect(()=>{
    if(localStorage.getItem('watched') === null){ // 로컬스토리지 없으면
      localStorage.setItem('watched', JSON.stringify( [] )); // 최근 본 상품 localStorage 생성
    }
  },[])

  return (
    <div className="App">

      {/* Navbar */}  
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="" onClick={()=>{navigate('/')}}>Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="" onClick={()=>{navigate('/detail/0')}}>detail</Nav.Link>
              <Nav.Link href="" onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="" onClick={()=>{navigate('/event')}}>Event</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={()=>{navigate('/about')}}>
                  About
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {/* react-query 사용 */}
            <Nav className='ms-auto'>
              { result.isLoading && '로딩중' }
              { result.error && '에러남' }
              { result.data && result.data.name } 
            </Nav> 
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 링크 이동
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      {/* 페이지 이동 -> react-router-dom 설치  */}
      <Suspense fallback={<div>로딩중임</div>}>
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                <Products shoes={shoes} ></Products>
              </div>
            </div>
            <button onClick={()=>{ 
              버튼글변경('🔄');
              if(클릭횟수<2){
                axios.get('https://codingapple1.github.io/shop/data' + (클릭횟수+2) + '.json')
                .then((e)=>{
                  let copy = [...shoes, ...e.data];
                  setShoes(copy);
                  클릭횟수변경(클릭횟수+1);
                  버튼글변경('더보기');
                }) // 요청 결과
                .catch(()=>{
                  console.log('실패');
                  버튼글변경('더보기');
                })// get 실패했딘을때
              }else{
                alert('더보기 상품 없음');
              }

              // axios.post('/경로', {naem: 'kim'})//ajax전송

              // Promise.all([axios.get('adasd'), axios.get('adasdas')]) // ajax요청 여러개 처리
              // .then(()=>{})
              // //원래 json형식 변환해야되는데 axios가 해줌

              // fetch('~~~.json')//기본JS문법으로 가져오기 -> json 가져오면 문자로 변환하는 코드 써야됨
            }}>{버튼글}</button>
          </>   
        }/>

        {/* /detail/:id -> url 파라미터 */}
        <Route path="/detail/:id" element={
          <Detail shoes={shoes} data={data}/>     
        }/>

        <Route path="/cart" element={<Cart/>}/>

        {/* nested Route : 라우트 안에 라우트*/}
        <Route path="/cart" element={<About/>}>
          {/* 경로 : /about/member 
          nested 된 라우트 들은 어디에 보여줄지 작성해야됨 -> 컨테이너에 <Outlet> 작성
          위에 꺼랑 같이 보여줌, 페이지에서 어느 부분만 바꿔야될때 사용하면 편리
          */}    
          <Route path="member" element={<div>맴버</div>}/>
          <Route path="location" element={<div>위치</div>}/>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

        <Route path="*" element={<div>404</div>}/>
        {/* path="*": 이외의 모든 경로 */}
      </Routes>
      </Suspense>
    </div>
  );
}

//상품목록 
function Products(props){
  return(
    <>
      {
      props.shoes.map((a,i)=>{
        let A = props.shoes.find(e => e.id == i);
        return(
          <div className='col-md-4' key={i}>
            {/* 이미지 링크에 변수넣기 
            똑같은 상품 정보 불러와서 정보 겹치면 오류뜸*/}
            <Link to={"/detail/"+A.id}>
              <img src={'https://codingapple1.github.io/shop/shoes'+ (A.id+1) +'.jpg'} width={'80%'}/>
            </Link>
            <h4>{A.title}</h4>
            <p>{A.content}</p>
          </div>
          )
        })
      }
    </>
  )
}

export default App;
