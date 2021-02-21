import * as React from "react";
import {
  LayoutOne,
  Card,
  FormControl,
  InputText,
  InputPassword,
  Button,
} from "upkit";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
//import { rule } from "postcss";
import { registerUser } from "../../api/auth";
import { useHistory, Link } from "react-router-dom";
import StoreLogo from '../../components/StoreLogo/index'

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const Register = () => {
  let { register, handleSubmit, errors, setError } = useForm();
  let [status, setStatus] = React.useState(statuslist.idle);
  let history = useHistory();
  const onSubmit = async (formData) => {
    let { password, password_confirmation } = formData;

    //cek password vs password_confirmation
    if (password !== password_confirmation) {
      return setError("password_confirmation", {
        type: "equality",
        message: "Konfirmasi Password harus sama dengan Password",
      });
    }

    setStatus(statuslist.process);

    //alert(JSON.stringify(formData));
    let { data } = await registerUser(formData);

    //Cek apakah ada error dari respon server
    if (data.error) {
      //Dapatkan yang error di field yang mana
      let fields = Object.keys(data.fields);

      //Untuk masing-masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statuslist.error);
      return;
    }

    //Kondisi register sukses
    setStatus(statuslist.success);
    history.push("/register/berhasil");
  };
  return (
    <LayoutOne size="small">
      {/* bungkus form register di dalam card terlebih dahulu supaya lebih rapih*/}
      <Card color="white">
        <div className="text-center mb-5">
          <StoreLogo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.full_name?.message}>
            <InputText
              name="full_name"
              placeholder="Nama Lengkap"
              fitContainer
              ref={register(rules.full_name)}
            />
          </FormControl>

          <FormControl errorMessage={errors.email?.message}>
            <InputText
              name="email"
              placeholder="Email"
              fitContainer
              ref={register(rules.email)}
            />
          </FormControl>

          <FormControl errorMessage={errors.password?.message}>
            <InputPassword
              name="password"
              placeholder="Password"
              fitContainer
              ref={register(rules.password)}
            />
          </FormControl>

          <FormControl errorMessage={errors.password_confirmation?.message}>
            <InputPassword
              name="password_confirmation"
              placeholder="Konfirmasi Password"
              fitContainer
              ref={register(rules.password_confirmation)}
            />
          </FormControl>

          <Button
            size="large"
            fitContainer
            disabled={status === statuslist.process}
          >
            {status === statuslist.process ? "Sedang Memproses" : "Mendaftar"}
          </Button>
        </form>
        <div className="text-center mt-2">
          Sudah punya akun?{" "}
          <Link to="/login">
            {" "}
            <b> Masuk Sekarang. </b>{" "}
          </Link>
        </div>
      </Card>
    </LayoutOne>
  );
};

export default Register;
