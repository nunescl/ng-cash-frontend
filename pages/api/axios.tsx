import axios, { AxiosResponse, AxiosInstance } from "axios";
import { NextPageContext } from "next";
import { parseCookies, setCookie } from "nookies";

const API_URL = "http://localhost:3333/";

export function getAPIClient(ctx?: NextPageContext) {
  const { accessToken: token } = parseCookies(ctx);

  const api: AxiosInstance = axios.create({
    baseURL: API_URL,
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export const api: AxiosInstance = getAPIClient();

export function LOGIN(data: { username: string; password: string }) {
  api
    .post(API_URL + "user/signin", data)
    .then((r: AxiosResponse) => {
      const { accessToken: token } = r.data;
      setCookie(undefined, "accessToken", token, { maxAge: 60 * 60 * 10 });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      return;
    })
    .catch((err: string) => alert("Por favor, cheque as suas credenciais"));
  return data;
}

export function SIGNUP(data: { username: string; password: string }) {
  api
    .post(API_URL + "user/signup", data)
    .catch((err: string) =>
      alert("Nome de usuário já existe ou a senha não é forte")
    );
  return;
}

export async function GET_BALANCE(set: any) {
  api
    .get(API_URL + "user")
    .then(async (r: AxiosResponse) => {
      await set(r.data);
    })
    .catch((err: string) => alert());
  return;
}

export async function TRANSF_FUNDS(data: {
  toUsername: string;
  amount: number;
}) {
  api
    .patch(API_URL + "user/transfer", data)
    .then(() => alert("Transferência efetuada com sucesso "))
    .catch(() => alert("Usuário Inválido"));
}

export async function GET_USER_TRANSF(set: any) {
  api
    .get(API_URL + "user/transactions")
    .then(async (r: AxiosResponse) => {
      await set(r.data);
    })
    .catch((err: string) => alert("error"));
  return;
}
