# Bienvenido a React Tunes!  🚀

React Tunes es una aplicación web que permite a los usuarios buscar y reproducir podcasts utilizando la API de iTunes.


## Features

🚀 **Rápido & Fluido:** Construido con React, ReactTunes ofrece una experiencia ágil y responsive. ¡Navega por los podcasts con facilidad!

🎨 **Diseño Elegante:** Una interfaz amigable diseñada para mejorar tu experiencia auditiva. Encuentra y reproduce tus podcasts favoritos sin complicaciones.

📱 **Adaptado para Móviles:** ¡Lleva tus podcasts contigo! ReactTunes está optimizado tanto para dispositivos de escritorio como móviles.

🔍 **Búsqueda Potente:** Encuentra rápidamente los podcasts que más te gusta con su eficiente función de búsqueda. ¡Descubrir nuevo contenido nunca ha sido tan fácil!

## Tecnologías y Librerías

- [**React**](https://reactjs.org/): Librería de JavaScript para construir interfaces de usuario.
- [**TypeScript**](https://www.typescriptlang.org/): Superset de JavaScript que añade tipado estático.
- [**Webpack**](https://webpack.js.org/): Empaquetador de módulos para aplicaciones JavaScript modernas.
- [**Tailwind CSS**](https://tailwindcss.com/): Framework de CSS de utilidad para construir rápidamente diseños personalizados.
- [**Moment**](https://momentjs.com/): Librería para manipular fechas en JavaScript.
- [**Material Tailwind**](https://www.material-tailwind.com/): Componentes React para Material Tailwind.
- [**React Router DOM**](https://reactrouter.com/en/main): Enrutamiento y navegación para aplicaciones React.
- [**Jest**](https://jestjs.io/) y [**Cypress**](https://www.cypress.io/): Herramientas de testing para pruebas unitarias y end-to-end respectivamente.
- [**ESLint**](https://eslint.org/) y [**Prettier**](https://prettier.io/): Herramientas para asegurar la calidad y consistencia del código.

### ¿Por qué Material UI?

Esta biblioteca combina la filosofía y diseño de Material Design con la flexibilidad y simplicidad de Tailwind CSS. La elección de Material Tailwind para este proyecto se basó en varias consideraciones:

- **Incompatibilidad de Material-UI con React 18**: Una de las principales razones para optar por Material Tailwind fue que Material-UI, otra popular biblioteca de diseño basada en Material Design, no es compatible con React 18 en el momento de desarrollo. Esta incompatibilidad habría requerido hacer downgrades de varias librerías o utilizar el flag --legacy-peer-deps durante la instalación, una práctica que prefiero evitar ya que puede llevar a inestabilidades y problemas de dependencia en el proyecto.

- **Consistencia con Material Design**: Material Design, desarrollado por Google, es un lenguaje de diseño que combina principios de diseño clásicos con innovación tecnológica. Al seguir estas directrices, se garantiza una experiencia de usuario coherente y familiar para los usuarios en diferentes plataformas y aplicaciones.

- **Flexibilidad de Tailwind CSS**: Tailwind es un framework de CSS de utilidad que permite a los desarrolladores construir diseños personalizados rápidamente sin salir del HTML. Esto significa que se puede tener un control granular sobre el diseño sin tener que escribir CSS desde cero o luchar contra estilos predeterminados.

- **Componentes Preconstruidos**: Material Tailwind ofrece una serie de componentes preconstruidos que siguen las directrices de Material Design. Esto acelera el proceso de desarrollo, ya que no es necesario construir cada componente desde cero.

- **Personalización**: Aunque Material Tailwind proporciona estilos predeterminados basados en Material Design, la integración con Tailwind permite una personalización fácil y rápida. Esto es ideal para proyectos que quieren mantenerse fieles a las directrices de Material Design pero también quieren tener su propia identidad visual.

- **Experiencia Previa y Estabilidad**: La familiaridad previa con Material Tailwind y su estabilidad y compatibilidad con las tecnologías actuales fueron factores decisivos en la elección de esta biblioteca para el proyecto.


## Cómo empezar

### Clonar el repositorio:

    $ git clone https://github.com/noeliaromeroroy/react-tunes.git
    $ cd react-tunes

### Instalar dependencias:

    $ npm install

## Ejecutar el proyecto:

    $ npm run start

Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador predeterminado.


## APIs utilizadas

- [**iTunes Search API**](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1) Utilizada para buscar y obtener detalles de podcasts.

## Pruebas (Tests)
En este proyecto, se ha dado prioridad a la calidad del código y a asegurar que las funcionalidades clave funcionen como se espera. Para ello, se han implementado tanto pruebas unitarias como pruebas E2E.

### Pruebas Unitarias

Las pruebas unitarias se han realizado utilizando Jest. Estas pruebas se centran en las funcionalidades esenciales relacionadas con la búsqueda de podcasts y la obtención de detalles de un podcast específico.

Para ejecutar las pruebas unitarias, puedes usar el siguiente comando:

    $ npm run test

### Pruebas E2E

Las pruebas E2E se han realizado utilizando Cypress. Estas pruebas simulan la interacción del usuario con la aplicación, asegurando que la navegación y las funcionalidades clave funcionen como se espera.

Estas pruebas garantizan que las funcionalidades clave de la aplicación, como la búsqueda, reproducción y navegación, funcionen correctamente en diferentes escenarios.

Para ejecutar las pruebas E2E, puedes usar el siguiente comando:

    $ npx cypress open

## TODOS - Pendientes

Aunque el proyecto ha alcanzado un nivel funcional y estético satisfactorio, siempre hay espacio para mejorar y optimizar. Algunas de las mejoras que se podrían implementar en futuras versiones incluyen:

- **Diseño Pixel Perfect**: Aunque se ha trabajado estrechamente con el prototipo de Figma proporcionado, se podría refinar aún más la interfaz para asegurar una correspondencia pixel perfect con el diseño original. Esto garantizaría una fidelidad absoluta al diseño previsto y mejoraría la experiencia visual del usuario.

- **Identificación de Episodios en Reproducción**: Actualmente, aunque el usuario puede reproducir episodios desde la tabla, no hay una indicación visual clara de qué episodio está sonando en un momento dado. Sería útil implementar un indicador (como un icono o cambio de color) que señale el episodio que está en reproducción. Esto proporcionaría una referencia visual rápida para el usuario y mejoraría la navegación y experiencia general.

- **Refactorización y Optimización de TailwindCSS:**

    - **Estructura de Tailwind**: Se busca mejorar la estructura actual de Tailwind en el proyecto, con el objetivo de tematizar más los componentes y asegurar una coherencia estilística en toda la aplicación.
    - **Refactorización**: Es necesario revisar y, si es necesario, refactorizar ciertas partes del código para asegurar una implementación más limpia y eficiente de Tailwind.
    - **Clases Inline**: Aunque se ha hecho un esfuerzo por mantener el código limpio, todavía hay algunas clases inline que se podrían trasladar a archivos de estilos o tematizar para mejorar la legibilidad y mantenibilidad del código.

- **Refactorización**: Aunque se ha tenido especial cuidado en mantener un código ordenado y escalable, siempre hay espacio para mejorar. Se podría considerar un refactor de algunos componentes para optimizar aún más la estructura del código y mejorar la mantenibilidad a largo plazo.

- **Implementación de sistema de caché**: Me hubiera gustado implementar un sistema de caché para almacenar información de las búsquedas y optimizar el rendimiento. Reduciría así la necesidad de hacer peticiones repetidas al servidor o API, lo que a su vez podría mejorar el rendimiento y la experiencia del usuario.