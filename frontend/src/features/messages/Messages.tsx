import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectMessages, selectMessagesLoading } from "./messagesSlice.ts";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import Spinner from "../../components/UI/Spinner.tsx";
import MessageItem from "./components/MessageItem.tsx";
import { useEffect } from "react";
import { createMessage, fetchAllMessages } from "./messagesThunks.ts";
import { IMessageMutation } from "../../types";
import MessageForm from "./components/MessageForm.tsx";

const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const messagesFetchLoading = useAppSelector(selectMessagesLoading);

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  const onCreateNewMessage = async (message: IMessageMutation) => {
    try {
      await dispatch(createMessage(message)).unwrap();
      await dispatch(fetchAllMessages());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>

        <Grid>
          <Typography variant="h5" gutterBottom>
            Добавить новое сообщение
          </Typography>
          <MessageForm onSubmitMessageToAdd={onCreateNewMessage} />
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: 5}}>
          <Grid>
            <Typography variant="h4">
              Messages
            </Typography>
          </Grid>
        </Grid>
        {messagesFetchLoading ? <Spinner /> :
          <>
            {messages.length === 0 ? <Typography variant='h4'>No messages yet</Typography> :
              <Grid container direction="row" spacing={1}>
                {messages.map(message => (
                  <MessageItem
                    key={message.id}
                    author={message.author}
                    description={message.description}
                    image={message.image || undefined}
                  />
                ))}
              </Grid>
            }
          </>
        }

      </Grid>
    </>
  );
};

export default Messages;