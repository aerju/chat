import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { Fragment, useState } from "react";
import ChatMessageDto from "../model/ChatMessageDto";
import "./Chat.css";
const ChatPage = () => {
  const [chatMessages, setChatMessages] = useState([
    new ChatMessageDto("arjun", "Good morning"),
  ]);

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user}:${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  const [message, setMessage] = useState("");
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log('Message sended',message);
  };
  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Happy chating
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages">
                  {listChatMessages}
                  {/* <ListItem></ListItem> */}
                </List>
              </Grid>
              <Grid xs={10} item>
                <FormControl fullWidth>
                  <TextField
                    value={message}
                    placeholder="Type your message..."
                    variant="outlined"
                    onChange={handleMessage}
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton
                  aria-label="send"
                  color="primary"
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default ChatPage;


