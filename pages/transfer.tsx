import { useState } from "react";
import Input from "../components/Input";
import { TRANSF_FUNDS } from "./api/axios";

export async function getStaticProps(ctx: any) {
  return {
    props: {
      protected: true,
    },
  };
}

export default function TransferFunds() {
  const [transferValues, setTransferValues] = useState<{
    toUsername: string;
    amount: number;
  }>({
    toUsername: "",
    amount: 0,
  });

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = target;

    setTransferValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    TRANSF_FUNDS(transferValues);
    setTimeout(function () {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <>
      <header className="flex justify-end px-2 py-3 bg-zinc-900">
        <button
          className="border-b-[1px] text-xs"
          onClick={() => (window.location.href = "dashboard")}
        >
          Voltar
        </button>

        <div className="flex justify-start pl-2 bg-zinc-900"></div>
      </header>
      <section className="w-2/3 h-2/3 flex flex-col mx-auto my-20">
        <h1 className="text-center text-3xl py-7 ">Transferir dinheiro</h1>
        <div className="my-auto flex flex-col text-xs">
          <Input
            label="Qual o valor da transferência?"
            placeholder="R$0,00"
            type="number"
            name="amount"
            value={transferValues.amount}
            onChange={handleChange}
          />
          <Input
            label="Pra quem você quer transferir?"
            placeholder="nome do usuário"
            type="text"
            name="toUsername"
            value={transferValues.toUsername}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="color-black border border-black bg-black px-3 py-1 mt-7 w-1/2 ml-auto text-sm"
          >
            Transferir
          </button>
        </div>
      </section>
    </>
  );
}
