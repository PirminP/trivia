import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Login from "../components/Login";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux"
import {
  EMAIL_INPUT_TEST_ID,
  PLAYER_INPUT_TEST_ID,
  BUTTON_TEST_ID,
  BUTTON_SETTINGS_TEST_ID,
  VALID_EMAIL,
  VALID_LOGIN,
  INVALID_EMAIL,
  INVALID_LOGIN,
} from "./helpers/constants"

describe("1 - Crie uma página inicial de login com os seguintes campos e caracteristicas:", () => {
  test("A rota para esta página deve ser /", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe("/");
  });

  test("Crie um local para que o usuário insira seu email e user", () => {
    renderWithRouterAndRedux(<App />, "/");
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const player = screen.getByTestId(PLAYER_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(player).toBeInTheDocument();
  });

  test("Crie um botão com o texto Play", () => {
    renderWithRouterAndRedux(<App />, "/");
    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(button).toBeInTheDocument();
  });

  test("Crie um botão com o texto Settings", () => {
    renderWithRouterAndRedux(<App />, "/");
    const button = screen.getByTestId(BUTTON_SETTINGS_TEST_ID);

    expect(button).toBeInTheDocument();
  });

  test("Salve o email no estado da aplicação, com a chave email", () => {
    renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const login = screen.getByTestId(PLAYER_INPUT_TEST_ID)
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, INVALID_EMAIL);
    expect(button).toBeDisabled()

    userEvent.type(login, INVALID_LOGIN);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(login, INVALID_LOGIN);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(login, VALID_LOGIN);
    expect(button).toBeDisabled();
  });

  test('A rota deve ser mudada para /settings ao clicar no botão "Configurações"', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(BUTTON_SETTINGS_TEST_ID);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/settings');
  });
})
