import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import Input from "../components/Input";
import { parseCookies } from "nookies";
import { LOGIN } from "./api/axios";

export default function SignIn() {
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
    LOGIN(loginValues);
    setTimeout(function () {
      const cookies = parseCookies();
      if (cookies.accessToken) {
        window.location.href = "/dashboard";
      } else {
        alert("Ocorreu um erro");
      }
    }, 1000);
  };

  return (
    <>
      <section className="w-2/3 flex flex-col mx-auto ">
        <h1 className="text-center text-3xl py-7 ">Login</h1>
        <div className="my-auto flex flex-col text-sm">
          <Input
            label="Nome do usuário"
            placeholder="seu nome de usuário"
            type="text"
            name="username"
            value={loginValues.username}
            onChange={handleChange}
          ></Input>
          <Input
            label="Senha"
            placeholder="aqui vai sua senha segura"
            type="password"
            name="password"
            value={loginValues.password}
            onChange={handleChange}
          ></Input>
          <button
            onClick={handleSubmit}
            className="color-black border border-black bg-black px-3 py-1 mt-7 w-2/5 ml-auto hover:border-zinc-500"
          >
            Entrar
          </button>
        </div>

        <div className="flex flex-col justify-center text-sm mt-7">
          <i className="border-t-[.2px] border-gray mb-1"></i>
          <p className="mx-auto text-base">ou</p>
          <button
            className="color-black border border-black bg-black px-3 py-1 mt-3 w-2/3 mx-auto hover:border-zinc-500"
            onClick={() => (window.location.href = "/signup")}
          >
            Cadastre-se
          </button>
        </div>
      </section>
    </>
  );
}
