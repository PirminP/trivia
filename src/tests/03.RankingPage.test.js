import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";

describe("Realizando testes na tela de Ranking", () => {
  test("Teste se na pagina de login existe um Texto Ranking", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const player = [{ name: "teste", picture: "teste" }];
    localStorage.setItem("ranking", JSON.stringify(player));
    history.push("/ranking");

    expect(history.location.pathname).toBe("/ranking");
  });

  test("Teste se existe um player chamado test", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const players = [
      { name: "teste1", picture: "teste2" },
      { name: "teste2", picture: "teste2" },
    ];
    localStorage.setItem("ranking", JSON.stringify(players));
    history.push("/ranking");

    const player1 = screen.getByText(/teste1/i);
    expect(player1).toBeInTheDocument();
    const player2 = screen.getByText(/teste1/i);
    expect(player2).toBeInTheDocument();
  });
  test("Teste se pode voltar para página inical", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const player = [{ name: "teste", picture: "teste" }];
    localStorage.setItem("ranking", JSON.stringify(player));

    history.push("/ranking");
    const start = screen.getByRole("button", { name: /inicio/i });
    userEvent.click(start);
    expect(history.location.pathname).toBe("/");
  });

  test("Testando se o ranking não existe", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.clear();

    history.push("/ranking");
  });
});
