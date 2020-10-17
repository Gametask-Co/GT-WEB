import styled from "styled-components";

export const ContainerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* -webkit-filter: blur(8px);
  filter: blur(8px); */
`;

export const ModalMain = styled.section`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;

  background: #282a31;

  box-shadow: 0px 16px 48px rgba(63, 66, 77, 0.25);
  border-radius: 16px;

  width: 30%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #a2a2a2;

  h2 {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    > span {
      color: #b9bbbe;
      font-size: 14px;
      line-height: 16px;
      font-weight: 600;
      margin-top: 15px;
    }

    > input {
      height: 40px;
      padding: 10px;

      border-radius: 3px;
      border: 2px solid #3f424d;
      box-sizing: border-box;

      background-color: transparent;
      color: #f6f6f6;

      margin-top: 1rem;
      margin-bottom: 1rem;

      transition: border 0.15s ease;
      font-size: 16px;

      &:focus {
        border-color: #7289da;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    > textarea {
      border-radius: 3px;
      border: 2px solid #3f424d;
      box-sizing: border-box;

      background-color: transparent;
      color: #f6f6f6;

      margin-top: 1rem;
      margin-bottom: 1rem;

      transition: border 0.15s ease;
      font-size: 16px;

      &:focus {
        border-color: #7289da;
      }
    }

    > button {
      margin: 20px 0 0;

      border-radius: 3px;
      transition: background-color 0.15s ease;
      background: #7289da;
      border: 0;
      color: #fff;
      font-size: 12px;
      padding: 0 10px;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
`;
