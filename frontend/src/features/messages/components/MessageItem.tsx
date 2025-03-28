import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

interface Props {
  author: string;
  description: string;
  image: string | undefined;
}

const MessageItem : React.FC<Props>= ({author, description, image}) => {
  return (
    <>
      <Card
        sx={{
          mt: 4,
          boxShadow: 3,
          borderRadius: 2,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" fontWeight="bolder" color="primary">
                {author}
              </Typography>
            </Box>
          }
        />
        {image}
        <CardContent
          sx={{
            p: 1.5,
            wordBreak: "break-word",
          }}
        >
          <Typography variant="h5">{description}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default MessageItem;