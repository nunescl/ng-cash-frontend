import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { GET_BALANCE, GET_USER_TRANSF } from "./api/axios";

export async function getStaticProps(ctx: any) {
  return {
    props: {
      protected: true,
    },
  };
}

export default function UserDashboard() {
  const [balance, setBalance] = useState<number>();
  const [userTransactions, setUserTransactions] = useState<any>();
  const [userTransactionsEntry, setUserTransactionsEntry] =
    useState<Array<ITransactions>>();
  const [userTransactionsOut, setUserTransactionsOut] =
    useState<Array<ITransactions>>();

  const fetchBalance = async () => {
    await GET_BALANCE(setBalance);
  };
  const fetchUserTransf = async () => {
    await GET_USER_TRANSF(setUserTransactions);
  };

  interface ITransactions {
    TransactionEntity_id: string;
    TransactionEntity_value: number;
    TransactionEntity_createdAt: string;
    TransactionEntity_fromUserIdId: string;
    TransactionEntity_toUserIdId: string;
  }

  function handleLogout() {
    destroyCookie(undefined, "accessToken");
    setTimeout(() => (window.location.href = "/signin"), 1000);
  }

  useEffect(() => {
    fetchBalance();
    fetchUserTransf();
  }, []);

  setTimeout(() => {
    if (userTransactions) {
      setUserTransactionsOut(userTransactions.out);
      setUserTransactionsEntry(userTransactions.entrys);
    }
  }, 100);

  return (
    <>
      <header className="flex justify-between px-2 py-3 bg-zinc-900">
        <button
          className="border-b-[1px] text-xs"
          onClick={() => (window.location.href = "transfer")}
        >
          Transferir dinheiro
        </button>
        <button className="border-b-[1px]  text-xs" onClick={handleLogout}>
          Sair
        </button>
        <div className="flex justify-start pl-2 bg-zinc-900">
          <p className="text-green-600 text-xs bg-zinc-900 border px-2 py-1">
            Saldo atual: R${balance}
          </p>
        </div>
      </header>

      <section className="w-2/3 h-2/3 flex flex-col mx-auto my-2">
        <h1 className="text-center text-xl py-7 ">Histórico</h1>
        <div className="my-auto flex flex-col text-xs">
          {userTransactionsEntry &&
            userTransactionsEntry.map((e: any) => (
              <div
                className="flex justify-between p-2 border-b-2"
                key={e.TransactionEntity_id}
              >
                <p>Data: {e.TransactionEntity_createdAt.slice(0, 10)} </p>
                <p>Hora: {e.TransactionEntity_createdAt.slice(11, 19)} </p>
                <p className="text-green-500">
                  R$ +{e.TransactionEntity_value},00
                </p>
              </div>
            ))}
          {userTransactionsOut &&
            userTransactionsOut.map((e: any) => (
              <div
                className="flex p-2 justify-between border-b-2"
                key={e.TransactionEntity_id}
              >
                <p>Data: {e.TransactionEntity_createdAt.slice(0, 10)} </p>
                <p>Hora: {e.TransactionEntity_createdAt.slice(11, 19)} </p>
                <p className="text-red-500">
                  R$ -{e.TransactionEntity_value},00
                </p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
