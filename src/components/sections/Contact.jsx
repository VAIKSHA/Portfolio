import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme?.text_primary || "#000"};
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme?.text_secondary || "#555"};
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme?.text_secondary + "50" || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme?.primary || "#007bff"};
  }
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme?.text_secondary + "50" || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme?.primary || "#007bff"};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme?.text_primary || "#fff"};
  font-size: 18px;
  font-weight: 600;
  background-color: ${({ isPressed }) => (isPressed ? "hsla(271, 0%, 0%, 1)" : "hsla(271, 100%, 50%, 1)")};
  &:hover {
    background-color: ${({ isPressed }) => (isPressed ? "#45a049" : "rgb(108, 2, 207)")};
  }
`;

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isPressed, setIsPressed] = useState(false); // State for button press

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please fill in your name.");
      return;
    }

    if (!email.trim()) {
      alert("Please fill in your email.");
      return;
    }

    if (!subject.trim()) {
      alert("Please fill in the subject.");
      return;
    }

    if (!message.trim()) {
      alert("Please fill in your message.");
      return;
    }

    const serviceId = "service_d8o2689";
    const templateId = "template_5ic4rd7";
    const publicKey = "MtZcyc7iINRoM_yj7";

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      to_name: "Vishal",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert("Message Sent");
        console.log("Message Sent", response);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        alert("Error in Sending Email");
        console.log("Error in Sending Email", error);
      });
  };

  return (
    <Container id="Education">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Ask Your Query 🚀</ContactTitle>
          <Input
            type="text"
            placeholder="Your name"
            name="from_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Your email"
            name="from_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextArea
            rows="4"
            placeholder="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ContactButton
            type="submit"
            isPressed={isPressed}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Reset on leaving the button area
          >
            Send
          </ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
