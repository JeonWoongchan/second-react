/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import data from './data.js';
import Detail from './pages/Detail.js'
import About from './pages/About.js'
import Event from './pages/Event.js'

import { useState } from 'react';
import {Button, Navbar, Container, Nav, NavDropdown, Form, Row, Col} from 'react-bootstrap/';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 navigate(1 또는 -1) 한페이지 앞으로, 뒤로

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
              <Nav.Link href="" onClick={()=>{navigate('/detail')}}>detail</Nav.Link>
              <Nav.Link href="" onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="" onClick={()=>{navigate('/event')}}>Event</NavDropdown.Item>
                <NavDropdown.Item href="">
                  Another action
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 링크 이동
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      {/* 페이지 이동 -> react-router-dom 설치  */}
      <Routes>
        <Route path="/" element={
          <>
            <div>메인페이지</div>
            <div className='main-bg'></div>
            <Container>
              <Row>
                <Products shoes={shoes}></Products>
              </Row>
            </Container>
          </>   
        }/>
        <Route path="/detail" element={
          <>
          <div>상세페이지</div>
          <Detail/>
          </>
        }/>
        {/* nested Route : 라우트 안에 라우트*/}
        <Route path="/about" element={<About/>}>
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
    </div>
  );
}

//상품목록 컨테이너 
function Products(props){
  return(
    <>
      {
      props.shoes.map((a,i)=>{
        return(
          <Col key={i}>
            {/* 이미지 링크에 변수넣기 */}
            <img src={'https://codingapple1.github.io/shop/shoes'+ (i+1) +'.jpg'} width={'80%'}/>
            <h4>{props.shoes[i].title}</h4>
            <p>{props.shoes[i].content}</p>
          </Col>
          )
        })
      }
    </>
  )
}

export default App;
