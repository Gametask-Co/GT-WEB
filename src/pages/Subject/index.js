import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { Header, Body } from "../../components/Modais/styled";

import Form from "../../components/Form/Index";
import { Text, Email, Textarea, Image } from "../../components/Inputs/Index";
import { ButtomBar, ButtomCTA } from "../../components/Buttons/Index";

import * as Styled from "./styled";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import CardSubjectList from "../../components/CardSubjectList";
import { InternModal } from "../../components/Modais";

import { useAuth } from "../../contents/auth";

import api from "../../services/api";

import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Award } from "../../assets/icons/award.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash-2.svg";

function Subject() {
  const { signed, user, loading } = useAuth();

  const [show, setShow] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showEditSubject, setShowEditSubject] = useState(false);

  // subject
  const [subjects, setSubjects] = useState([]);
  const [idSubject, setIdSubject] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  //student
  const [link, setLink] = useState("");
  const [students, setStudents] = useState(""); // []

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFlag, setUserFlag] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (loading === false) {
      if (signed === false) {
        // history.push('/signin');
      } else {
        setUserName(user.name);
        setUserEmail(user.email);

        // VERIFY user is teacher or students
        // // user.teacher
        // api.get("/teacher/subjects").then(function (res) {
        api
          .get("subjects")
          .then(function (res) {
            console.log("res ------", res);
            console.log("res ------", res.status);

            if (user.student_id !== null) {
              setSubjects(res.data.student_user);
              setUserFlag(false);
            } else {
              setSubjects(res.data.teacher_user);
              setUserFlag(true);
            }

            // if (res.status != "error") {
            //   setSubjects(res.data);
            // }

            // if (res.data.student_user.length) {
            //   // setSubjects[res.data.student_user];
            //   console.log(
            //     "res.data.student_user.length",
            //     res.data.student_user.length
            //   );
            // } else {
            //   // setSubjects[res.data.teacher_user];
            //   console.log(
            //     "res.data.teacher_user.length",
            //     res.data.teacher_user.length
            //   );
            // }
          })
          .catch((error) => {
            // user student
            console.log("error ------", error);
            setSubjects([]);
          });
      }
    }
    // }, [signed, subjects, history, loading]);
  }, [signed, history, loading, user]);

  function handleSubjectModal(e) {
    setShow(!show);
  }
  function handleStudentModal(e) {
    setShowStudent(!showStudent);
  }

  function handleEditSubjectModal(e) {
    setShowEditSubject(!showEditSubject);
  }

  async function handleCreateSubject(e) {
    e.preventDefault();

    await api
      .post("/subjects", {
        name,
        description,
        image,
      })
      .then(function (res) {
        console.log(res.data, "Create Subject ok!");

        setShow(!show);
        setName("");
        setDescription("");

        setIdSubject(res.data.id);
        setLink("https://gametask.com.br/subject/" + res.data.id);
        setShowStudent(!showStudent);
      })
      .catch(function (error) {
        console.log(error, "Error Subject error!");
      });
  }

  async function handleEditSubject(e, pk) {
    e.preventDefault();

    await api
      .put(`/subjects/${pk}`, {
        name,
        description,
        image,
      })
      .then(function (res) {
        console.log(res.data, "Edit Subject ok!");

        setShowEditSubject(!showEditSubject);
        setName("");
        setDescription("");
      })
      .catch(function (error) {
        console.log(error, "Error Edit Subject error!");
      });
  }

  async function handleStudentSubject(e) {
    e.preventDefault();

    await api
      .post("/subjects/student/email", {
        subject_id: idSubject,
        student_email: students,
      })
      .then(function (res) {
        console.log(res, "add Student on Subject ok!");
        setLink("");
        setStudents("");

        setShowStudent(!showStudent);
      })
      .catch(function (error) {
        console.log(error, "Error Student on Subject error!");
      });
  }

  return (
    <Layout>
      <Container>
        <Styled.MenuWrapper>
          <Styled.CircleProfile />
          <h3>{userFlag ? "Professor" : "Estudante"}</h3>
          <h1>{userName}</h1>
          <h3>{userEmail}</h3>
          <div>
            <h4>Medalhas</h4>
            <div>
              <Styled.Insignia color="#CCAF4E">
                <Award />
                999 <span> - Ouro</span>
              </Styled.Insignia>
              <Styled.Insignia color="#F0F0F0">
                <Award />
                888 <span> - Prata</span>
              </Styled.Insignia>
              <Styled.Insignia color="#E2673E">
                <Award />
                777 <span> - Bronze</span>
              </Styled.Insignia>
            </div>
          </div>
          <div>
            <h4>Troféus</h4>
            <div>
              <Styled.Insignia color="#CCAF4E">
                <Star />
                999 <span> - Ouro</span>
              </Styled.Insignia>
              <Styled.Insignia color="#F0F0F0">
                <Star />
                888 <span> - Prata</span>
              </Styled.Insignia>
              <Styled.Insignia color="#E2673E">
                <Star />
                777 <span> - Bronze</span>
              </Styled.Insignia>
            </div>
          </div>
        </Styled.MenuWrapper>
        <Styled.SubjectWrapper>
          <div>
            <h1>Disciplinas</h1>
            <div>
              <button onClick={handleSubjectModal}>
                <Plus />
              </button>
              <button onClick={handleEditSubjectModal}>
                <Edit />
              </button>
            </div>
          </div>

          {subjects.map((item) => (
            <Link key={item.id} to={`/subject/${item.id}`}>
              <CardSubjectList
                key={item.id}
                name={item.name}
                teacher="Fulano de Tal"
                percentage="55"
                tab={true}
              />
            </Link>
          ))}
        </Styled.SubjectWrapper>

        <InternModal onClose={handleSubjectModal} show={show}>
          <Header>
            <h1>Criar Disciplina</h1>
          </Header>

          <Body>
            <Form onSubmit={handleCreateSubject}>
              <Text
                name="name"
                value={name}
                placeholder="Nome da Disciplina"
                onChange={(e) => setName(e.target.value)}
                required
              >
                Nome
              </Text>

              <Textarea
                name="description"
                value={description}
                placeholder="Escreva aqui..."
                rows="5"
                cols="33"
                onChange={(e) => setDescription(e.target.value)}
                required
              >
                Descrição
              </Textarea>

              <Image
                name="image"
                value={image}
                accept="image/*"
                onChange={(e) => setImage("null")}
                // onChange={(e) => setImage(e.target.value)}
                // required
              >
                Imagem
              </Image>

              <ButtomBar>
                <ButtomCTA secondary onClick={handleSubjectModal}>
                  Cancelar
                </ButtomCTA>
                <ButtomCTA type="submit">Concluir</ButtomCTA>
              </ButtomBar>
            </Form>
          </Body>
        </InternModal>

        <InternModal onClose={handleStudentModal} show={showStudent}>
          <Header>
            <h1>Adicionar Alunos</h1>
          </Header>

          <Body>
            <Form onSubmit={handleStudentSubject}>
              <Text
                name="link"
                value={link}
                placeholder="Nome da Disciplina"
                disabled
              >
                Compartilhar link
              </Text>

              <Email
                name="students"
                value={students}
                placeholder="Inserir alunos por email"
                onChange={(e) => setStudents(e.target.value)}
                required
              >
                Inserir alunos por email
              </Email>
              {/* <span>{students}</span> */}

              <ButtomBar>
                <ButtomCTA secondary onClick={handleStudentModal}>
                  Pular
                </ButtomCTA>
                <ButtomCTA type="submit">Concluir</ButtomCTA>
              </ButtomBar>
            </Form>
          </Body>
        </InternModal>

        {/* when click on image, call function subjectSelected() to change [name, description and image] and show modal */}
        <InternModal onClose={handleEditSubjectModal} show={showEditSubject}>
          <Header>
            <h1>Editar Disciplina</h1>
            <Trash
              style={{
                position: "absolute",
                right: "2rem",
                color: "red",
                top: "2.5rem",
                border: "2px red solid",
                borderRadius: "4px",
                fontSize: "2rem",
              }}
            />
          </Header>

          <Body>
            {/* handleEditSubject(pk) */}
            <Form onSubmit={handleEditSubject}>
              <Text
                name="name"
                value={name}
                placeholder="Nome da Disciplina"
                onChange={(e) => setName(e.target.value)}
                required
              >
                Nome
              </Text>

              <Textarea
                name="description"
                value={description}
                placeholder="Escreva aqui..."
                rows="5"
                cols="33"
                onChange={(e) => setDescription(e.target.value)}
                required
              >
                Descrição
              </Textarea>

              <Image
                name="image"
                value={image}
                accept="image/*"
                onChange={(e) => setImage("null")}
                // onChange={(e) => setImage(e.target.value)}
                // required
              >
                Imagem
              </Image>

              <ButtomBar>
                <ButtomCTA secondary onClick={handleEditSubjectModal}>
                  Cancelar
                </ButtomCTA>
                <ButtomCTA type="submit">Concluir</ButtomCTA>
              </ButtomBar>
            </Form>
          </Body>
        </InternModal>

        <InternModal show={false}>
          <Header>
            <h1>Excluir Disciplina</h1>
          </Header>

          <Body>
            <Form onSubmit={handleEditSubject}>
              <span>
                Cuidado! Essa é uma ação permanente, para confirmar a exclusão
                da disciplina Sistemas Operacionais digite abaixo o nome da
                disciplina:
              </span>

              <Text
                name="name"
                value={name}
                placeholder="Digite o nome da disciplina"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <ButtomBar>
                <ButtomCTA secondary>
                  Cancelar
                </ButtomCTA>
                <ButtomCTA danger type="submit">Excluir</ButtomCTA>
              </ButtomBar>
            </Form>
          </Body>
        </InternModal>
      </Container>
    </Layout>
  );
}

export default Subject;
