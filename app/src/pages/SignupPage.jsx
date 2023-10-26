import React, { useEffect } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup } from "../redux/userReducer";
import { Link, useNavigate } from "react-router-dom";
const SignupPage = () => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const basicSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup
      .string()
      .matches(passwordRegex, { message: "Enter Strong Password" })
      .required("Required"),
  });
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, errorMsg } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }

    console.log("working");
    dispatch( reset());
  }, [user]);

  const onSubmit = (values, actions) => {
    dispatch(signup(values));
    actions.resetForm();
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Typography variant="h4">Signup Page</Typography>
        {isError && <Alert severity="error">{errorMsg}</Alert>}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={basicSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form>
              <div style={{ marginTop: "10px" }}>
                <Field
                  as={TextField}
                  label="Name"
                  error={errors.name && touched.name}
                  helperText={<ErrorMessage name="name" />}
                  name="name"
                  fullWidth
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Field
                  as={TextField}
                  label="Email"
                  error={errors.email && touched.email}
                  helperText={<ErrorMessage name="email" />}
                  name="email"
                  fullWidth
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  error={errors.password && touched.password}
                  helperText={<ErrorMessage name="password" />}
                  placeholder="password"
                  fullWidth
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span>
          Already have an account <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </Container>
  );
};

export default SignupPage;
