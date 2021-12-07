import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Input({
    half,
    name,
    handleChange,
    label,
    autoFocus,
    type,
    handleShowPassword,
    error,
    helperText,
}) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                vairant="outlined"
                required
                error={error}
                helperText={helperText}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                    name === "password"
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {type === "password" ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : null
                }
            />
        </Grid>
    );
}

export default Input;
