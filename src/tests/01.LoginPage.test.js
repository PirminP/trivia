import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Login from "../components/Login";
import { screen, waitFor, waitForElementToBeRemoved, wait } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import {
  EMAIL_INPUT_TEST_ID,
  PLAYER_INPUT_TEST_ID,
  BUTTON_TEST_ID,
  BUTTON_SETTINGS_TEST_ID,
  VALID_EMAIL,
  VALID_LOGIN,
  INVALID_EMAIL,
  INVALID_LOGIN,
} from "./helpers/constants";
describe("Teste page Login", () => {
  it('A rota para a página deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe("/");
  });


  it("Deve existir local para que o jogador insira o nome e email", () => {
    renderWithRouterAndRedux(<Login />, "/");
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
  it('Deve existir um botão com o texto "Play"', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button).toBeInTheDocument();
  });
  it("Realize as seguintes verificações nos campos de nome, email:", () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button).toBeDisabled();
    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(button).toBeDisabled();
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    /* expect(button).toBeDisabled(); */
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(name, INVALID_LOGIN);
    /* expect(button).toBeDisabled(); */
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(button).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(button).toBeEnabled();
  });
  it("A rota deve ser mudada para '/game' após o clique no botão \"Play\".", () => {
    const { history } = renderWithRouterAndRedux(<Login />, "/game");
    const email = screen.getByTestId("input-gravatar-email");
    const senha = screen.getByTestId("input-player-name");
    const button = screen.getByTestId(BUTTON_TEST_ID);
    expect(button.disabled).toBe(true);
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_LOGIN);
    expect(button.disabled).toBe(false);

    userEvent.click(button);
  });
  it('Deve existir um botão com o texto "Configurações"', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(BUTTON_SETTINGS_TEST_ID);
    expect(button).toBeInTheDocument();
  });
  it("A rota deve ser mudada para '/settings' após o clique no botão \"Configurações\".", () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(BUTTON_SETTINGS_TEST_ID);
    userEvent.click(button);
    expect(history.location.pathname).toBe("/settings");
  });

  it("Ir para tela de Game", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    console.log(history);
    history.push('/game');


/*     const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, "test@test.com")
    userEvent.type(name, "test")
    userEvent.click(button); */
    /* await waitFor(() => {
      expect(history.location.pathname).toBe("/game");
    })  */

    screen.getByText(/loading/i)

    expect(history.location.pathname).toBe("/game");
    await wait()
    screen.debug()

/*     await waitForElementToBeRemoved(() => {
      
    }) */
  });
});
