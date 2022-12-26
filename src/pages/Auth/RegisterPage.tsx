import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import AuthFormContainer from "../../components/Container/AuthFormContainer";
import InputField from "../../components/Pure/InputField";
import { RegisterValues } from "../../Interfaces/Auth.interface";
import { registerUser } from "../../services/Auth.services";

const RegisterPage = () => {
  const initialValues = {
    name: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Este campo es requerido"),
    username: yup.string().required(),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  });

  const onSubmit = (): void => {
    registerUser(values);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
  }: FormikProps<RegisterValues> = useFormik<RegisterValues>({
    onSubmit,
    initialValues,
    validationSchema,
  });
  return (
    <div>
      <h3>Login</h3>
      <AuthFormContainer>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nombre"
            inputName="name"
            value={values.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={touched.name && errors.name ? errors.name : null}
          />

          <InputField
            label="Nombre de usuario"
            inputName="username"
            value={values.username}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              touched.username && errors.username ? errors.username : null
            }
          />

          {/* PASS */}

          <InputField
            label="Ingresá tu contraseña"
            inputName="password"
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              touched.password && errors.password ? errors.password : null
            }
          />
          <InputField
            label="Ingresá nuevamente tu contraseña"
            inputName="passwordConfirmation"
            value={values.passwordConfirmation}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              touched.passwordConfirmation && errors.passwordConfirmation
                ? errors.passwordConfirmation
                : null
            }
          />

          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </AuthFormContainer>
    </div>
  );
};

export default RegisterPage;
