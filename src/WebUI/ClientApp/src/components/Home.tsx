import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Witaj w FlatMate!</h1>
        <p>Internetowy system wirutalnych mieszkań, który ułatwia wspóle korzystanie z mieszkania!</p>
        <ul>
          <li>Twórz własne mieszkania zabezpieczone hasłem, aby nitk spoza nie dołączył do Was</li>
          <li>Dołączaj do mieszkań, które już zostały stworzone przez Twoich współlokatorów</li>
          <li>Zmieniaj przypisane do Ciebie mieszkania w szybki i wygodny sposób!</li>
        </ul>
        <p>W ramach mieszkania możesz wybrać, czy chcesz korzystać z ninijeszych modułów:</p>
        <ul>
          <li>
            <strong>Lista zadań</strong> - Twórz zadania, które trzeba zrobić, i przypisz je odpowiednim osobom!
          </li>
          <li>
            <strong>Paragony</strong> - Dodawaj paragony, które rozliczą się automatycznie po przypisaniu użyktowników!
          </li>
        </ul>
      </div>
    );
  }
}
