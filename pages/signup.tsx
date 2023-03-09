import { useState } from "react";
import Input from "../components/Input";
import { SIGNUP } from "./api/axios";
import { parseCookies } from "nookies";

export default function SignUp() {
  const [loginValues, setLoginValues] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = target;

    setLoginValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    SIGNUP(loginValues);
    setTimeout(function () {
      const cookies = parseCookies();
      if (cookies.accessToken) {
        window.location.href = "/dashboard";
      }
    }, 1000);
  };
  return (
    <>
      <section className="w-2/3 flex-col mx-auto my-6">
        <h1 className="text-center text-3xl py-7 ">Crie sua conta</h1>
        <div className="my-auto flex flex-col text-sm">
          <Input
            label="Nome do usuário"
            placeholder="escolha um nome de usuário :)"
            type="text"
            name="username"
            value={loginValues.username}
            onChange={handleChange}
          ></Input>
          <Input
            label="Senha"
            placeholder="aqui vai uma senha segura"
            type="password"
            name="password"
            value={loginValues.password}
            onChange={handleChange}
          ></Input>
          <button
            onClick={handleSubmit}
            className="color-black text-white border border-black bg-black px-3 py-1 mt-7 w-2/5 ml-auto"
          >
            Cadastrar
          </button>
        </div>
        <div className="flex flex-col justify-center text-sm mt-7">
          <i className="border-t-[.2px] border-gray mb-1"></i>
          <p className="mx-auto text-base">ou</p>
          <button
            className="color-black border border-black bg-black px-3 py-1 mt-3 w-2/3 mx-auto"
            onClick={() => (window.location.href = "/signin")}
          >
            Entre com sua conta
          </button>
        </div>
      </section>
    </>
  );
}
