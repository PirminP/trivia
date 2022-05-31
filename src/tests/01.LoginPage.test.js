import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Login from "../components/Login";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import {
  BUTTON_TEST_ID,
  BUTTON_SETTINGS_TEST_ID,
  VALID_EMAIL,
  VALID_LOGIN,
  INVALID_EMAIL,
  INVALID_LOGIN,
} from "./helpers/constants";

const INITIAL_STATE = {
    login: {
      isFetching: false,
      data: '',
      error: '',
      inputLogin: {
        email: '',
        login: ''
      }
    },
    questions: {
      isFetching: false,
      data: '',
      error: ''
    },
    player: {
      name: 'test_test',
      assertions: 0,
      score: 0,
      gravatarEmail: 'test@test.com.br',
    }
};
describe("Teste page Login", () => {
  it('A rota para a página deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe("/");
  });


  it("Deve existir local para que o jogador insira o nome e email", () => {
    renderWithRouterAndRedux(<App />, "/");
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
  it('Verificar a existencia dos botões na página"', () => {
    renderWithRouterAndRedux(<App />);
    const play = screen.getByRole('button', {name: /play/i})
    const settings = screen.getByRole('button', {name: /settings/i})
    expect(play).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
  });
  it("Realize as seguintes verificações nos campos de nome, email:", () => {
    renderWithRouterAndRedux(<App />);

    const play = screen.getByRole('button', {name: /play/i})
    expect(play).toBeDisabled();

    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");

    //Testando se é possivel entrar com email invalido
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(play).toBeDisabled();

    //Testando se e possivel entrar com login invalido
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(play).toBeDisabled();


    //Testando se o botão fica habilitado
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(name, VALID_LOGIN);
    expect(play).toBeEnabled()
  });

  it("A rota deve ser mudada para '/game' após o clique no botão PLAY.", async () => {

    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId("input-gravatar-email");
    const senha = screen.getByTestId("input-player-name");
    const play = screen.getByRole('button', {name: /play/i})
    history.push('/game')

    expect(play.disabled).toBe(true);
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_LOGIN);
    /* expect(play.disabled).toBe(false); */

    userEvent.click(play);
  });

  it("A rota deve ser mudada para '/settings' após o clique no botão.", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId(BUTTON_SETTINGS_TEST_ID);
    userEvent.click(button);
    expect(history.location.pathname).toBe("/settings");
  });

  it("Verificar se a função fetch é chamada na página de login", async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, INITIAL_STATE);
    
    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const play = screen.getByTestId('btn-play')
    
    const responseapi = {results: ["teste"], response_code: 0}
    jest.spyOn(global,"fetch")

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseapi)
    })

    const test = {
      player: {
        name: 'test_test',
        gravatarEmail: 'test@test.com.br',
        score: 0,
        assertions: 0,
      }
    }
     
    userEvent.type(name, 'test_test');
    userEvent.type(email, 'test@test.com');
    expect(play).toBeEnabled();
    userEvent.click(play);

    localStorage.setItem('token', 'teste');
    

    expect(store.getState()).toMatchObject(test);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith("https://opentdb.com/api_token.php?command=request")
    history.push('/game')
    screen.debug()
  });

  it("A rota deve ser mudada para '/settings' após o clique no botão \"Configurações\".", () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    screen.debug()
  });



});
