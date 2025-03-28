import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { IMessageMutation } from "../../../types";
import FileInput from "../../../components/UI/FileInput.tsx";

interface Props {
  onSubmitMessageToAdd: (message: IMessageMutation) => void;
}

const initialState : IMessageMutation= {
  author: '',
  description: '',
  image: null,
};

const MessageForm: React.FC<Props> = ({onSubmitMessageToAdd}) => {
  const [form, setForm] = useState<IMessageMutation>(initialState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.description.trim()) {
      alert("Заполните описание");
      return;
    }

    onSubmitMessageToAdd(form);
    setForm(initialState);
  };

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (eFile: React.ChangeEvent<HTMLInputElement>) => {
    if (eFile.target.files) {
      setForm(prev => ({ ...prev, image: eFile.target.files![0] }));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid size={{sm: 12, md: 6, lg: 6}}>
          <TextField
            fullWidth
            variant="outlined"
            label="Author"
            name="author"
            value={form.author}
            onChange={inputTextChange}
          />
        </Grid>


        <Grid size={{sm: 12, md: 6, lg: 6}}>
          <TextField
            fullWidth
            variant="outlined"
            label="Message"
            name="description"
            value={form.description}
            onChange={inputTextChange}
            required
            multiline
            rows={3}
          />
        </Grid>

        <Grid size={{sm: 12, md: 6, lg: 6}}>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid size={{sm: 12, md: 6, lg: 6}}>
          <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;