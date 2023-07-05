import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './components/Header';
import { AsideMenu } from './components/Aside';
import { ApplicationRoutes } from './routes/ApplicationRoutes';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <Container fluid className='my-1'>
        <Row>
          <Col lg={2} md={3} sm={12}>
            <AsideMenu />
          </Col>
          <Col lg={10} md={9} sm={12}>
            <ApplicationRoutes />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
