import React, { useEffect, useRef, useState } from "react";

import "./TypingTest.css";

import { Navbaar } from "../../Containers";
import {
  Button,
  Container,
  // Input,
  MainParagraph,
  Paragraph,
} from "../../Components";
import { Paragraphs } from "../../Utils/Paragraph";
import { Input } from "../../Components/StyleComponent";

export const TypingTest = () => {
  const InputValues = useRef();

  const [seconds, setSeconds] = useState(60);
  const [start, setStart] = useState(false);
  const [inputdata, setInputData] = useState();
  const [Accuracy, setAccuracy] = useState(0);
  const [ShowResult, setShowResult] = useState(false);
  const [DisableInput, setDisableInput] = useState(false);

  const data = React.useMemo(() => {
    return Paragraphs[Math.floor(Math.random() * 10)];
  }, []);

  useEffect(() => {
    if (start) {
      InputValues.current.focus();
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          setStart(false);
          setInputData(InputValues?.current?.value.split(" "));
          setSeconds(10);
          let a = [];
          InputValues?.current?.value
            .split(" ")
            ?.map((item) =>
              data.split(" ").map((x) => (x == item ? a.push(item) : null))
            );
          setAccuracy(
            (data.split(" ").length / 100) *
              a.filter((item) => item != " ").length
          );
          // a.filter(function (item, i, ar) {
          //   return ar.indexOf(item) === i;
          // }).length
          // Math.round((a.length /data.length ) * 100);
          // console.log(
          //   ((100 * a.length) / data.split(" ").length).toFixed(0),
          //   // Math.round((a.length / data.split(" ").length) * 100),
          //   "percentage"
          // );
          setShowResult(true);
          setDisableInput(true);
          InputValues.current.value = "";
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const RestartTyping = () => {
    setShowResult(false);
    setDisableInput(false);
    setInputData(null);
    setAccuracy(null);
  };

  return (
    <>
      <Navbaar />
      <div className="typing-main-div">
        <div className="sec-tw">
          <Container>
            <Paragraph>
              <center> {seconds}</center>
            </Paragraph>
            <Paragraph fs="22px">
              <center> Second</center>
            </Paragraph>
          </Container>
          <Container>
            <Paragraph>
              <center>
                {" "}
                {InputValues?.current?.value == "" ? 0 : inputdata?.length || 0}
              </center>
            </Paragraph>
            <Paragraph fs="22px">
              <center> WPM</center>
            </Paragraph>
          </Container>
          <Container>
            <Paragraph>
              <center>{inputdata?.join().length || 0}</center>
            </Paragraph>
            <Paragraph fs="22px">
              <center> CPM</center>
            </Paragraph>
          </Container>
          <Container>
            <Paragraph>
              <center> {Accuracy?.toFixed(0) || 0}%</center>
            </Paragraph>
            <Paragraph fs="22px">
              <center> Accuracy</center>
            </Paragraph>
          </Container>
        </div>
        <Container height="300px" width="60%" ml="20%" mt="3%">
          <MainParagraph>
            {ShowResult ? (
              <>
                {inputdata?.length > 25 ? (
                  <Paragraph fs="22px">
                    You're a T-REX.Nice! You type with the speed of{" "}
                    {InputValues?.current?.value == ""
                      ? 0
                      : inputdata?.length || 0}{" "}
                    WPM ({inputdata?.join().length} CPM). Your accuracy was{" "}
                    {Accuracy?.toFixed(0)}%. Keep practicing!
                  </Paragraph>
                ) : (
                  <Paragraph fs="22px">
                    You're a Turtle. Well... You type with the speed of{" "}
                    {InputValues?.current?.value == ""
                      ? 0
                      : inputdata?.length || 0}{" "}
                    WPM ({inputdata?.join().length} CPM). Your accuracy was{" "}
                    {Accuracy?.toFixed(0)}%. It could be better!
                  </Paragraph>
                )}
                <center>
                  <Button width="150px" onClick={RestartTyping}>
                    Restart Test
                  </Button>
                </center>
              </>
            ) : (
              data
            )}
          </MainParagraph>
        </Container>
        <Input
          ref={InputValues}
          type="text"
          height="60px"
          width="80%"
          ml="10%"
          mt="2%"
          placeholder=" Start Typing..."
          onClick={() => setStart(true)}
          disabled={DisableInput}
        />
      </div>
    </>
  );
};
