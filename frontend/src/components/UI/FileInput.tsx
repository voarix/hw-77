import {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import React from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files &&  e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid>
          <TextField
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;