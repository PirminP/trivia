import React from "react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Login from "../components/Login";
import Feedback from "../pages/Feedback";
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
    test("Teste de existe a rota /feedback", () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')
        expect(history.location.pathname).toBe("/feedback");
    })
    test("Teste se existe os textos da Pagina de Feedback", () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')
        const texto = screen.getByText(/pagina de feedback/i)
        const feedback = screen.getByText(/could be better/i)
        expect(texto).toBeInTheDocument();
        expect(feedback).toBeInTheDocument();
    })
    test("teste se os buttons estão na tela", () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')
        const again = screen.getByRole('button', {name:/play again/i})
        userEvent.click(again);
        expect(history.location.pathname).toBe("/");
    })
    test("teste se os buttons estão na tela", () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        const player = [{name: 'teste', picture: 'teste'}];
        localStorage.setItem('ranking', JSON.stringify(player));
        history.push('/feedback')

        const ranking = screen.getByRole('button', {name:/ranking/i})
        userEvent.click(ranking);
    
        
        expect(history.location.pathname).toBe("/ranking");
    })
});