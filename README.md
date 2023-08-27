# Bienvenido a React Tunes!  🚀

React Tunes es una aplicación web que permite a los usuarios buscar y reproducir podcasts utilizando la API de iTunes.

![Image Demo React Tunes 01](https://react-tunes.s3.eu-west-3.amazonaws.com/demoimages/demo-react-tunes-01.png)
![Image Demo React Tunes 02](https://react-tunes.s3.eu-west-3.amazonaws.com/demoimages/demo-react-tunes-02.png)

## Demo 🧐

Puedes ver una demo de la aplicación haciendo clic 👉🏻[**aquí**](http://react-tunes.s3-website.eu-west-3.amazonaws.com/).

## Features 🔝

🚀 **Rápido & Fluido:** Construido con React, ReactTunes ofrece una experiencia ágil y responsive. ¡Navega por los podcasts con facilidad!

🎨 **Diseño Elegante:** Una interfaz amigable diseñada para mejorar tu experiencia auditiva. Encuentra y reproduce tus podcasts favoritos sin complicaciones.

📱 **Adaptado para Móviles:** ¡Lleva tus podcasts contigo! ReactTunes está optimizado tanto para dispositivos de escritorio como móviles.

🔍 **Búsqueda Potente:** Encuentra rápidamente los podcasts que más te gusta con su eficiente función de búsqueda. ¡Descubrir nuevo contenido nunca ha sido tan fácil!

## APIs utilizadas 🔗

- [**iTunes Search API**](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1) Utilizada para buscar y obtener detalles de podcasts.
- [**Nominatim Open-source geocoding**](https://nominatim.org/) Utilizada para obtener localizaciones del mundo en base a la latitud y longitud del usuario.


## Tecnologías y Librerías 👩🏻‍💻

- [**React**](https://reactjs.org/): Librería de JavaScript para construir interfaces de usuario.
- [**TypeScript**](https://www.typescriptlang.org/): Superset de JavaScript que añade tipado estático.
- [**Webpack**](https://webpack.js.org/): Empaquetador de módulos para aplicaciones JavaScript modernas.
- [**Tailwind CSS**](https://tailwindcss.com/): Framework de CSS de utilidad para construir rápidamente diseños personalizados.
- [**Moment**](https://momentjs.com/): Librería para manipular fechas en JavaScript.
- [**Material Tailwind**](https://www.material-tailwind.com/): Componentes React para Material Tailwind.
- [**React Router DOM**](https://reactrouter.com/en/main): Enrutamiento y navegación para aplicaciones React.
- [**Jest**](https://jestjs.io/) y [**Cypress**](https://www.cypress.io/): Herramientas de testing para pruebas unitarias y end-to-end respectivamente.
- [**Husky**](https://www.npmjs.com/package/husky): Herramienta que nos permite ejecutar Git Hooks de forma más amigable y sencilla. 
- [**ESLint**](https://eslint.org/) y [**Prettier**](https://prettier.io/): Herramientas para asegurar la calidad y consistencia del código.

### ¿Por qué Material UI?

Esta biblioteca combina la filosofía y diseño de Material Design con la flexibilidad y simplicidad de Tailwind CSS. La elección de Material Tailwind para este proyecto se basó en varias consideraciones:

- **Incompatibilidad de Material-UI con React 18**: Una de las principales razones para optar por Material Tailwind fue que Material-UI, otra popular biblioteca de diseño basada en Material Design, no es compatible con React 18 en el momento de desarrollo. Esta incompatibilidad habría requerido hacer downgrades de varias librerías o utilizar el flag --legacy-peer-deps durante la instalación, una práctica que prefiero evitar ya que puede llevar a inestabilidades y problemas de dependencia en el proyecto.

- **Consistencia con Material Design**: Material Design, desarrollado por Google, es un lenguaje de diseño que combina principios de diseño clásicos con innovación tecnológica. Al seguir estas directrices, se garantiza una experiencia de usuario coherente y familiar para los usuarios en diferentes plataformas y aplicaciones.

- **Flexibilidad de Tailwind CSS**: Tailwind es un framework de CSS de utilidad que permite a los desarrolladores construir diseños personalizados rápidamente sin salir del HTML. Esto significa que se puede tener un control granular sobre el diseño sin tener que escribir CSS desde cero o luchar contra estilos predeterminados.

- **Componentes Preconstruidos**: Material Tailwind ofrece una serie de componentes preconstruidos que siguen las directrices de Material Design. Esto acelera el proceso de desarrollo, ya que no es necesario construir cada componente desde cero.

- **Personalización**: Aunque Material Tailwind proporciona estilos predeterminados basados en Material Design, la integración con Tailwind permite una personalización fácil y rápida. Esto es ideal para proyectos que quieren mantenerse fieles a las directrices de Material Design pero también quieren tener su propia identidad visual.

- **Experiencia Previa y Estabilidad**: La familiaridad previa con Material Tailwind y su estabilidad y compatibilidad con las tecnologías actuales fueron factores decisivos en la elección de esta biblioteca para el proyecto.

## Arquitectura 🏗️

Este proyecto ha sido diseñado y desarrollado siguiendo la arquitectura hexagonal (también conocida como "Ports and Adapters") combinada con principios de Diseño Guiado por el Dominio (DDD). A continuación, se detalla la estructura y organización del proyecto basándose en esta arquitectura.

### Arquitectura Hexagonal y DDD
La arquitectura hexagonal busca separar la lógica de negocio de las preocupaciones externas, permitiendo que una aplicación sea agnóstica respecto a los detalles de entrada/salida, bases de datos, frameworks web, etc. Por otro lado, DDD se centra en modelar la lógica de negocio basándose en el dominio del problema, promoviendo una estructura de código que refleje el dominio real.

#### Estructura del Proyecto
1. **Dominio (Core Business Logic):**

  - ./src/domain: Contiene la lógica de negocio principal del proyecto.
  - ./src/domain/models/interfaces: Interfaces para los modelos de dominio, definiendo contratos claros para la lógica de negocio.

2. **Infraestructura (Adapters):**

  - ./src/infrastructure: Alberga implementaciones concretas de interfaces definidas en el dominio, como repositorios o servicios de terceros.
  - ./src/infrastructure/services: Servicios específicos de infraestructura que interactúan con sistemas externos.

3. **UI (Adapters):**

  - ./src/ui: Se encarga de todo lo relacionado con la interfaz de usuario, actuando como un adaptador en la arquitectura hexagonal.
  - ./src/ui/contexts, ./src/ui/components, ./src/ui/hooks, ./src/ui/pages: Representan una organización basada en componentes y características de la UI. Los hooks, en particular, encapsulan comportamientos reutilizables específicos de la UI.

4. **Assets:**

  - ./src/assets: Contiene recursos estáticos como imágenes y estilos, esenciales para la presentación y estética de la aplicación.
Tests:

  - ./\_\_mocks\_\_, ./\_\_test\_\_, ./cypress: El proyecto tiene pruebas unitarias y de extremo a extremo (E2E), asegurando la calidad y funcionalidad del código.

## Cómo empezar 🚀

### Clonar el repositorio:

    $ git clone https://github.com/noeliaromeroroy/react-tunes.git
    $ cd react-tunes

### Instalar dependencias:

    $ npm install

### Ejecutar el proyecto

    $ npm run start

Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador predeterminado.


### Proceso de build del proyecto

    $ npm run build

Esto generará los ficheros necesarios para la puesta en producción del proyecto.


## Sistema de caché 📑

He implementado un sistema de caché en el proyecto para mejorar la eficiencia al obtener detalles de podcasts.

### ¿Cómo funciona?

1. **Primera vez que solicitas un podcast:** Cuando pides información sobre un podcast por primera vez, el sistema la busca en la API de iTunes y la muestra. Pero además, guarda una copia de esa información en una "memoria temporal" llamada caché.

2. **Solicitudes posteriores:** Si vuelves a pedir información sobre ese mismo podcast dentro de una hora (60 minutos) después de la primera solicitud, el sistema no vuelve a buscar en la API de iTunes. En lugar de eso, te muestra la copia que guardó en la caché. Esto hace que la respuesta sea más rápida y reduce la carga en la API.

Después de esos 60 minutos, la información en la caché se considera "antigua" y se descarta. Si vuelves a pedir detalles del podcast después de ese tiempo, el sistema buscará nuevamente en la API y actualizará la caché con la información más reciente.

**Nota Importante:** Para que puedas observar cómo funciona este sistema en tiempo real, he añadido un registro (log) en el sistema. Cada vez que se muestra la información de un podcast, este log te indicará si la información proviene directamente de la API de iTunes o si se ha recuperado de la caché.

## Paginación 📗
Para mejorar la experiencia de usuario y optimizar la carga de datos, he implementado un sistema de paginación en la búsqueda de podcasts.

¿Cómo funciona?

- **Primera Búsqueda:** Cuando realizas una búsqueda inicial de podcasts, el sistema te mostrará los primeros 10 resultados. Esto permite que la página cargue rápidamente y te ofrezca una vista preliminar de los podcasts disponibles.

- **Cargar Más:** Si deseas explorar más resultados, encontrarás un botón denominado "Cargar Más" al final de la lista. Al hacer clic en este botón, el sistema añadirá 10 podcasts adicionales a la lista. Puedes seguir haciendo clic en "Cargar Más" tantas veces como desees para seguir explorando más podcasts, y estos se irán añadiendo de 10 en 10.

Este enfoque de paginación garantiza que no se sobrecargue la página con demasiados resultados a la vez, proporcionando una navegación más fluida y rápida para el usuario.

## Control de Errores 🐛

La robustez y estabilidad de una aplicación no solo dependen de sus características y funcionalidades, sino también de cómo maneja y responde ante situaciones inesperadas o errores. En este proyecto, he puesto un énfasis especial en el control de errores para garantizar una experiencia de usuario sin contratiempos.

### Handler Especial y Personalizable

He desarrollado un "handler" especial para errores que es personalizable. Esto significa que, en lugar de depender de soluciones genéricas, mi sistema tiene una herramienta diseñada específicamente para detectar y responder a errores de manera adecuada. Este handler evita errores en tiempo de ejecución (runtime) que podrían causar interrupciones inesperadas o comportamientos no deseados en la aplicación.

### Extensión del Control de Errores
He extendido el control de errores a toda la lógica de negocio del proyecto. Esto asegura que, desde la recuperación de datos hasta la presentación de información al usuario, cada paso tiene mecanismos para manejar situaciones inesperadas y garantizar que la aplicación continúe funcionando de manera óptima.

Con este enfoque integral en el control de errores, busco ofrecer una aplicación más confiable y resistente, capaz de manejar cualquier eventualidad de manera elegante y eficiente.

## Pruebas (Tests) 🚦
En este proyecto, se ha dado prioridad a la calidad del código y a asegurar que las funcionalidades clave funcionen como se espera. Para ello, se han implementado tanto pruebas unitarias como pruebas E2E.

Para ejecutar las pruebas, puedes usar el siguiente comando, con él se ejecutarán los test unitarios en primer lugar y posteriormente las pruebas E2E:

    $ npm run test

### Pruebas Unitarias

Las pruebas unitarias se han realizado utilizando Jest. Estas pruebas se centran en las funcionalidades esenciales relacionadas con la búsqueda de podcasts y la obtención de detalles de un podcast específico.

### Pruebas E2E

Las pruebas E2E se han realizado utilizando Cypress. Estas pruebas simulan la interacción del usuario con la aplicación, asegurando que la navegación y las funcionalidades clave funcionen como se espera.

Estas pruebas garantizan que las funcionalidades clave de la aplicación, como la búsqueda, reproducción y navegación, funcionen correctamente en diferentes escenarios.


## Integración de Husky en el proyecto 🐶

Husky es una herramienta que facilita la adición hooks al proceso de control de versiones con Git. Estos hooks permiten ejecutar scripts o comandos específicos en ciertos momentos del flujo de trabajo de Git, como antes de hacer un commit o antes de hacer push.

### Beneficios de usar Husky 

- **Automatización:** Garantiza que ciertos procesos o verificaciones se realicen automáticamente antes de acciones críticas, como hacer commit o push.

- **Consistencia:** Asegura que todos los colaboradores del proyecto sigan las mismas reglas y estándares.

- **Calidad del Código:** Al ejecutar pruebas y linters automáticamente, se mantiene una alta calidad del código y se evitan errores comunes.

- **Prevención:** Puede prevenir que código defectuoso o no conforme a los estándares se añada al repositorio.

### Detalles de los hooks

#### commit-msg

Antes de finalizar un commit, este hook se asegura de que el mensaje del commit siga un formato específico utilizando commitlint. Esto garantiza que todos los mensajes de commit en el proyecto sean consistentes y sigan un estándar definido.

#### pre-commit

Antes de hacer un commit, este hook ejecuta lint-staged, que corre linters en los archivos que han sido modificados y están listos para ser incluidos en el commit. Esto asegura que cualquier código que se vaya a incluir en el repositorio cumpla con los estándares de codificación del proyecto.

#### pre-push

Antes de hacer push (enviar los cambios al repositorio remoto), este hook ejecuta las pruebas del proyecto con npm run test. Esto garantiza que no se envíen al repositorio remoto cambios que rompan las funcionalidades existentes.