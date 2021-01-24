import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import * as Styled from '../SignIn/styled';
import { Col, Container, Row } from '../../components/Grid/Index';

export class Success extends Component {
  render() {
    return (
      <Styled.Background>
        <Layout header={false}>
          <Container>
            <Styled.RowStyled>
              <Col lg="4" md="6" sm="8" xs="12">
                <Styled.LoginWrapper>
                  <Styled.Header>
                    <Styled.Gametask />
                    <h1>Confirme seu email</h1>
                    <p>
                      Para concluir o seu cadastro clique no link que enviamos
                      para seu email.
                    </p>
                    <p>
                      Não recebeu nenhum email?{' '}
                      <Link to="/signin">Reenviar</Link>
                    </p>
                    <span>Redirecionando para página de login em 5...</span>
                  </Styled.Header>
                </Styled.LoginWrapper>
              </Col>
            </Styled.RowStyled>
          </Container>
        </Layout>
      </Styled.Background>
    );
  }
}

export default Success;
