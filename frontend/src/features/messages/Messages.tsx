import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectMessages, selectMessagesLoading } from "./messagesSlice.ts";
import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/Spinner.tsx";
import MessageItem from "./components/MessageItem.tsx";
import { useEffect } from "react";
import { fetchAllMessages } from "./messagesThunks.ts";

const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const messagesFetchLoading = useAppSelector(selectMessagesLoading);

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch])

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h4">
              Messages
            </Typography>
          </Grid>
          <Grid>
            <Button color="primary" component={Link} to='/products/new'>
              Add product
            </Button>
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