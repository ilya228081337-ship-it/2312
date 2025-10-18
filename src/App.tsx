import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, NavItem, NavLink as BSNavLink } from 'reactstrap';
import { SimpleFormPage } from './pages/SimpleFormPage';
import { TabbedFormPage } from './pages/TabbedFormPage';
import { WizardPage } from './pages/WizardPage';

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="mt-4">
        <Row>
          <Col md={3}>
            <Nav vertical pills>
              <NavItem>
                <BSNavLink tag={Link} to="/simple">
                  Простая форма
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink tag={Link} to="/tabbed">
                  Форма с вкладками
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink tag={Link} to="/wizard">
                  Многостраничная форма (мастер)
                </BSNavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md={9}>
            <Routes>
              <Route path="/simple" element={<SimpleFormPage />} />
              <Route path="/tabbed" element={<TabbedFormPage />} />
              <Route path="/wizard" element={<WizardPage />} />
              <Route path="/" element={<SimpleFormPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
