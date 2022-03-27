import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  border-style: solid;
  border-color: #fffd3a;
  width: ${(props) => (props.width ? props.width : "7%")};
  border-radius: ${(props) => (props.border ? props.border : "15px")};
  height: ${(props) => (props.height ? props.height : "80px")};
  margin-top: ${(props) => (props.mt ? props.mt : "4%")};
  margin-left: ${(props) => (props.ml ? props.ml : "5%")};
  box-shadow: 0 3px 4px 0px #bbb7b7;
`;
export const Input = styled.input`
  background-color: white;
  border-style: solid;
  border-color: #fffd3a;
  outline: #fffd3a;
  border-width: 4px;
  width: ${(props) => (props.width ? props.width : "7%")};
  border-radius: 15px;
  height: ${(props) => (props.height ? props.height : "80px")};
  margin-top: ${(props) => (props.mt ? props.mt : "5%")};
  margin-left: ${(props) => (props.ml ? props.ml : "5%")};
  box-shadow: 0 3px 4px 0px #bbb7b7;
  font-size: 25px;
`;
export const Paragraph = styled.p`
  font-size: ${(props) => (props.fs ? props.fs : "35px")};
  margin-left: ${(props) => (props.ml ? props.ml + "%" : "0%")};
  margin-top: ${(props) => (props.mt ? props.mt + "%" : "10%")};
  text-align: -webkit-center;
  font-family: OCR A Std, monospace;
`;
export const MainParagraph = styled.p`
  font-size: 17px;
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 4%;
  font-family: OCR A Std, monospace;
  &:hover {
    color: black;
  }
`;
export const Button = styled.button`
  background-color: yellow;
  border-radius: 15px;
  width: ${(props) => (props.width ? props.width : "120px")};
  height: ${(props) => (props.height ? props.height : "40px")};
  border-width: 4px;
  border-style: solid;
  border-color: #fffd3a;
  &:hover {
    background-color: white;
  }
`;
