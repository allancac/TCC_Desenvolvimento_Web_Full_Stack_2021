import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Header } from './components/Header';
import { AsideMenu } from './components/Aside';
import { ApplicationRoutes } from './ApplicationRoutes';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <Container fluid className='my-1'>
        <Row>
          <Col md={3} sm={12}>
            <AsideMenu />
          </Col>
          <Col md={9} sm={12}>
            <ApplicationRoutes />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
