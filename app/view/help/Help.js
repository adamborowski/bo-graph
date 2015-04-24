Ext.define('bo.view.help.Help', {
  extend: 'Ext.Window',
  xtype: 'helpwindow',
  requires: [],
  statics: {},
  config: {
    width: 1000,
    height: 700,
    title: 'Pomoc programu'
  },
  cls: 'a-help-window',
  layout: 'fit',

  items: [
    {
      padding: 10,
      overflowY: 'auto',
      xtype: 'label',
      cls: 'a-label',
      html: "<h1>Podręcznik użytkownika</h1>\n<p>Niniejsza aplikacja została wykonana jako eksperyment w symulowaniu i wizualizowaniu prostego procesu kolejkowego.\n</p>\n<h2>Założenia aplikacji</h2>\n<ol>\n\n    <li>Definiowanie strumienia wejściowego - na poziomie rozkładu a i b jak i również na poziomie szczególnego zgłoszenia</li>\n    <li>Definiowanie procesorów - określanie ustawień każdego procesora z osobna</li>\n    <li>Definiowanie rozmiaru kolejki</li>\n    <li>Uruchomienie symulacji - dla 10000 zgłoszeń może to trwać od kilku do kilkunastu sekund</li>\n    <li>Prezentacja wyników symulacji na wykresach N(t), U(t), R(t)</li>\n</ol>\n<!--<h2>Menu</h2>-->\n<!--<figure class=\"on-right\">-->\n<!--<img src=\"resources/help/images/44693d42bbfc.png\"/>-->\n<!--<figcaption>Menu programu</figcaption>-->\n<!--</figure>-->\n<!--<p>Menu programu znajduje się po prawej stronie strony, u góry.-->\n<!--Po kliknięciu na przycisk <b>Menu</b> mamy do wyboru kilka opcji:-->\n<!--</p>-->\n<!--<ul>-->\n<!--<li>-->\n<!--Nowa sesja-->\n<!--<ul>-->\n<!--<li>pusta - tworzy nową zakładkę z symulacją</li>-->\n<!--<li>ze schowka - pozwala wprowadzić dane w formacie tekstowym i otwiera nową zakładkę z symulacją</li>-->\n<!--</ul>-->\n<!--</li>-->\n<!--<li>Generuj strumień zgłoszeń - otwiera okno generatora</li>-->\n<!--<li>Pomoc - otwiera to okno</li>-->\n<!--<li>O programie - otwiera okno prezentujące autora i wykorzystane narzędzia</li>-->\n<!--</ul>-->\n<!--<h2>Okno główne</h2>-->\n\n<!--<p>Jest to okno pozwalające modyfikować dane i ustawienia symulacji, uruchamiać ją i analizować.</p>-->\n<!--<h3>Zakładki</h3>-->\n<!--<figure class=\"on-right\">-->\n<!--<img src=\"resources/help/images/aebbd86be98c.png\"/>-->\n<!--<figcaption>Otwarte trzy niezależne symulacje</figcaption>-->\n<!--</figure>-->\n<!--<p>-->\n<!--Dzięki zakładkom można przełączać się pomiędzy różnymi symulacjami. W konsekwencji można mieć otwarte wiele przypadków jednocześnie.-->\n<!--Aby zamknąć zakładkę należy kliknąć na przycisku <b>x</b> na danej zakładce.-->\n<!--</p>-->\n<!--<h3>Panel zgłoszeń</h3>-->\n<!--<p>-->\n    <!--<figure class=\"on-left\">-->\n        <!--<img src=\"resources/help/images/1a56d3a11204.png\"/>-->\n        <!--<figcaption>Szczegóły zgłoszeń</figcaption>-->\n    <!--</figure>-->\n    <!--Jest to tabela pokazująca parametry każdego zgłoszenia.-->\n    <!--Umożliwia <b>edycję</b> parametrów a<sub>n</sub> oraz b<sub>n</sub> poprzez kliknięcie na wybranej komórce.-->\n    <!--Parametry oznaczone szarym kolorem są tylko do odczytu i przyjmą prawidłowe wartości dopiero po zakończeniu symulacji.-->\n    <!--Aby <b>dodać</b> lub <b>usunąć</b> zgłoszenie z listy należy kliknąć przycisk-->\n    <!--<img src=\"resources/help/images/4593aa305003.png\"/> znajdujący się w górnej części panelu.-->\n<!--</p>-->\n<!--<h3>Panel ustawień</h3>-->\n\n<!--<p>-->\n    <!--<figure class=\"on-left\">-->\n        <!--<img src=\"resources/help/images/2ec8a8aea03f.png\"/>-->\n        <!--<figcaption>Ustawienia</figcaption>-->\n    <!--</figure>-->\n    <!--Jest to panel pozwalający na:-->\n<!--</p>-->\n<!--<ul>-->\n    <!--<li>Ustawienie rozmiaru kolejki Q</li>-->\n    <!--<li>Ustawienie rozmiaru kwantu obsługi &Delta; - jeśli podamy, tryb pracy procesorów zostanie zmieniony z FIFO na Round-Robin</li>-->\n    <!--<li>Dodanie i usunięcie zaznaczonego procesora przyciskiem <img src=\"resources/help/images/4593aa305003.png\"/></li>-->\n    <!--<li>Edycję prędkości <b>v</b> zaznaczonego procesora poprzez kliknięcie na liście</li>-->\n    <!--<li><b>Ropoczęcie symulacji</b></li>-->\n<!--</ul>-->\n<h3>Panel wykresów</h3>\n<p>\n    <figure class=\"on-left\">\n        <img src=\"resources/help/images/387ef818f0d5.png\"/>\n        <figcaption>Wizualizacja symulacji</figcaption>\n    </figure>\n    Po zakończeniu symulacji zostanie wyświetlony wykres\n</p>\n<h2>Generator strumienia zgłoszeń</h2>"
    }
  ]
});